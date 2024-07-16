document.addEventListener('DOMContentLoaded', async function () {
    const usdInput = document.getElementById('usd');
    const brlInput = document.getElementById('brl');
    
    let exchangeRate;

    async function fetchExchangeRate() {
        try {
            const response = await fetch('https://v6.exchangerate-api.com/v6/58f597e0491525cf0404ac12/latest/USD');
            const data = await response.json();
            exchangeRate = data.conversion_rates.BRL;
        } catch (error) {
            console.error('Erro ao buscar taxa de câmbio:', error);
            exchangeRate = 5.25; // Valor padrão em caso de erro
        }
    }

    await fetchExchangeRate();

    function isValidNumber(value) {
        return !isNaN(value) && value.trim() !== '';
    }

    // Converter USD para BRL
    usdInput.addEventListener('input', function () {
        const usdValue = usdInput.value;
        if (isValidNumber(usdValue)) {
            const brlValue = (parseFloat(usdValue) * exchangeRate).toFixed(2).replace('.', ',');
            brlInput.value = brlValue;
        } else {
            brlInput.value = '';
            if (usdValue.trim() !== '') {
                alert('Por favor, insira um valor numérico válido.');
            }
        }
    });

    // Converter BRL para USD
    brlInput.addEventListener('input', function () {
        const brlValue = brlInput.value.replace(',', '.');
        if (isValidNumber(brlValue)) {
            const usdValue = (parseFloat(brlValue) / exchangeRate).toFixed(2);
            usdInput.value = usdValue;
        } else {
            usdInput.value = '';
            if (brlValue.trim() !== '') {
                alert('Por favor, insira um valor numérico válido.');
            }
        }
    });
});
