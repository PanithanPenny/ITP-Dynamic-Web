function fetchCurrencyData() {
    const baseCurrency = document.getElementById('currencySelector').value;
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${baseCurrency}.json`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch the data');
            }
            return response.json();
        })
        .then(data => {
            // Pass baseCurrency as an argument to the displayRates function
            displayRates(data, baseCurrency);
        })
        .catch(error => {
            document.getElementById('ratesDisplay').innerText = 'Error: ' + error.message;
        });
}

// Modify the function to accept baseCurrency as a parameter
function displayRates(data, baseCurrency) {
    // Now rates will use the baseCurrency parameter to access the data
    const rates = data[baseCurrency];
    let content = `<h2>Rates for ${baseCurrency.toUpperCase()}</h2>`;
    for (let currency in rates) {
        content += `<p>1 ${baseCurrency.toUpperCase()} = ${rates[currency]} ${currency.toUpperCase()}</p>`;
    }
    document.getElementById('ratesDisplay').innerHTML = content;
}
