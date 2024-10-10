async function getCoinDetails(coin){
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`);
    return await response.json();
}

module.exports = { getCoinDetails };