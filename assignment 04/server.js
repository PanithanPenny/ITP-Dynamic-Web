const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;
const db = new sqlite3.Database(':memory:');

// Set up database
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS Emails (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE)');
});

// Express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'hbs');

// Routes
// Get all emails and render the admin page
app.get('/', (req, res) => {
  db.all('SELECT * FROM Emails', [], (err, rows) => {
    if (err) {
      return res.render('admin', { layout: false, error: err.message });
    }
    res.render('admin', { layout: false, emails: rows });
  });
});

// Add a new email
app.post('/submit-email', (req, res) => {
  const email = req.body.email;
  db.run('INSERT INTO Emails (email) VALUES (?)', [email], function(err) {
    if (err) {
      // If there's an error, render the admin page with an error message
      return res.render('admin', { layout: false, error: err.message });
    }
    res.redirect('/');
  });
});

// Delete an email
app.post('/delete-email', (req, res) => {
  const id = req.body.id;
  db.run('DELETE FROM Emails WHERE id = ?', [id], function(err) {
    if (err) {
      // If there's an error, render the admin page with an error message
      return res.render('admin', { layout: false, error: err.message });
    }
    res.redirect('/');
  });
});

// Edit an existing email
app.post('/edit-email', (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  db.run('UPDATE Emails SET email = ? WHERE id = ?', [email, id], function(err) {
    if (err) {
      // If there's an error, render the admin page with an error message
      return res.render('admin', { layout: false, error: err.message });
    }
    res.redirect('/');
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
