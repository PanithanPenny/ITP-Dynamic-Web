
document.addEventListener('DOMContentLoaded', function () {
    // Initially load comments when the page is loaded
    fetchComments();

    
    const savedScrollPos = sessionStorage.getItem('scrollPosition');
    if (savedScrollPos) {
        window.scrollTo(0, parseInt(savedScrollPos, 10));
        // Clear the saved position after scrolling to it
        sessionStorage.removeItem('scrollPosition');
    }
    const commentForm = document.getElementById('commentForm');

    commentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const userComment = document.getElementById('user-comment').value;
        const userEmail = document.getElementById('user-email').value;

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: userComment,
                email: userEmail
            })
        };

        fetch('/api', options)
            .then(response => response.json())
            .then(newComment => {
                // Function to create and prepend a new comment block with animation
                prependNewCommentBlock(newComment);
                fetchComments(); // Optionally refresh comments list if needed
            })
            .catch(error => {
                console.error('Error posting comment:', error);
            });
    });


    function prependNewCommentBlock(comment, animate) {
        const commentsContainer = document.getElementById('comments-container');
        const commentBlock = document.createElement('div');
        // Correctly apply the animation class only when 'animate' is true
        commentBlock.className = animate ? 'new-comment-block new-comment-block-animated' : 'new-comment-block';
        commentBlock.innerHTML = `
            <p id="comment-text-${comment._id}">${comment.comment}</p>
            <p id="email-text-${comment._id}">${comment.email}</p>
            <input type="text" id="edit-comment-${comment._id}" value="${comment.comment}" class="edit-input hidden">
            <input type="email" id="edit-email-${comment._id}" value="${comment.email}" class="edit-input hidden">
            <button onclick="editComment('${comment._id}')">Edit</button>
            <button onclick="saveEdit('${comment._id}')">Save</button>
            <button onclick="deleteComment('${comment._id}')">Delete</button>
        `;
        commentsContainer.prepend(commentBlock); // This will add the block to the top
    }
    
    
    
    
    
    // Function to fetch and display comments
    function fetchComments() {
        fetch('/api/comments')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(comments => {
                const commentsContainer = document.getElementById('comments-container');
                commentsContainer.innerHTML = ''; // Clear existing comments
                comments.forEach(comment => {
                    const commentBlock = document.createElement('div');
                    commentBlock.className = 'new-comment-block'; // Ensure no animation class here
                    commentBlock.innerHTML = `
                        <p id="comment-text-${comment._id}">${comment.comment}</p>
                        <p id="email-text-${comment._id}">${comment.email}</p>
                        <input type="text" id="edit-comment-${comment._id}" value="${comment.comment}" class="edit-input hidden">
                        <input type="email" id="edit-email-${comment._id}" value="${comment.email}" class="edit-input hidden">
                        <button onclick="editComment('${comment._id}')" id="edit-button-${comment._id}">Edit</button>
                        <button onclick="saveEdit('${comment._id}')" id="save-button-${comment._id}" class="hidden">Save</button>
                        <button onclick="deleteComment('${comment._id}')">Delete</button>
                    `;
                    commentsContainer.prepend(commentBlock); // Add each new comment at the top without animation
                });
            })
            .catch(error => {
                console.error('Error loading comments:', error);
                document.getElementById('comments-container').innerHTML = '<p class="no-data">No comments available.</p>';
            });
    }
    
    
    


    function createCommentBlock(comment, container) {
        const commentBlock = document.createElement('div');
        commentBlock.className = 'new-comment-block'; // No animation class added here
        commentBlock.innerHTML = `...`;
        container.prepend(commentBlock);
    }

    document.getElementById('comments-container').addEventListener('click', function(event) {
        const target = event.target;
        if (target.tagName === 'BUTTON') {
            const id = target.id.split('-')[2]; // Assuming IDs are like 'edit-button-xxx'
            if (target.id.startsWith('edit-button')) {
                editComment(id);
            } else if (target.id.startsWith('save-button')) {
                saveEdit(id);
            } else if (target.id.startsWith('delete-button')) {
                deleteComment(id);
            }
        }
    });
    
    
    
    

    
});

function saveEdit(id) {
    const updatedComment = document.getElementById(`edit-comment-${id}`).value;
    const updatedEmail = document.getElementById(`edit-email-${id}`).value;

    fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment: updatedComment, email: updatedEmail })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // Update text elements
        document.getElementById(`comment-text-${id}`).textContent = updatedComment;
        document.getElementById(`email-text-${id}`).textContent = updatedEmail;

        // Hide input fields
        document.getElementById(`edit-comment-${id}`).classList.add('hidden');
        document.getElementById(`edit-email-${id}`).classList.add('hidden');

        // Reset button visibility
        document.getElementById(`edit-button-${id}`).classList.remove('hidden');
        document.getElementById(`save-button-${id}`).classList.add('hidden');

        // Show text elements
        document.getElementById(`comment-text-${id}`).style.display = '';
        document.getElementById(`email-text-${id}`).style.display = '';
    })
    .catch(error => console.error('Error updating comment:', error));
}


function deleteComment(id) {
    // Save the current scroll position to sessionStorage
    sessionStorage.setItem('scrollPosition', window.scrollY);

    fetch(`/api/comments/${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            // Reload the page to reflect the deletion without navigating away
            window.location.reload();
        })
        .catch(error => console.error('Error deleting comment:', error));
}

function editComment(id) {
    // Hide text elements
    document.getElementById(`comment-text-${id}`).style.display = 'none';
    document.getElementById(`email-text-${id}`).style.display = 'none';

    // Show input fields
    document.getElementById(`edit-comment-${id}`).classList.remove('hidden');
    document.getElementById(`edit-email-${id}`).classList.remove('hidden');

    // Toggle buttons visibility
    document.getElementById(`edit-button-${id}`).classList.add('hidden');
    document.getElementById(`save-button-${id}`).classList.remove('hidden');
}
