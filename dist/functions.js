const baseUrl = 'https://min-api.cryptocompare.com/';
const baseUrlInternData = '/CryptoCompare/';
const API_KEY = '7d5b016ade35db43098a971bac619a17331e7f78b2eea9e3b8991b4d60fbf064';
const apiKeyParam = 'api_key';
const paramInit = '?';
const equalsParam = '=';
const andParam = '&';
const currencyPriceClass = 'currency-price';


function getURL(baseURL, ...paramsAndValues) {
    if (paramsAndValues.length % 2 !== 0)
        return baseURL + paramInit + apiKeyParam + equalsParam + API_KEY;

    let args = Array.from(paramsAndValues);
    let url = baseURL + paramInit;
    for (let i = 0; i < args.length; i += 2, url += andParam) {
        url += (args[i] + equalsParam + args[i + 1]);
    }
    return (url + apiKeyParam + equalsParam + API_KEY);
}

/**
 * Get the current price of any cryptocurrency in any other currency that you need.

 If the crypto does not trade directly into the toSymbol requested,
 BTC will be used for conversion.


 * @param fsym The cryptocurrency symbol of interest.
 * @param tsyms Comma separated cryptocurrency symbols list to convert into.
 * @param f Function to executed after the request.
 */
function setSymbolPrice(fsym, tsyms, f) {
    const baseURL = 'https://min-api.cryptocompare.com/data/price';
    let url = getURL(baseURL, 'fsym', fsym, 'tsyms', tsyms);
    $.get(url, function (response) {
        f(response[tsyms]);
    })
}

function setSymbolPriceIntern(fsym, tsyms, transactionType, f) {
    const baseURL = baseUrlInternData + 'price';
    let url = getURL(baseURL, 'fsym', fsym, 'tsyms', tsyms, 'type', transactionType);
    $.get(url, function (response) {
        f(response[tsyms]);
    })
}


const decimal = ',';
const thousands = ' ';

function getFormatCurrencyValue(el, exchangeValue) {
    const elVal = el.val().replace(/ /g, '').replace(/,/g, '.');
    return normalizeCurrency(Number(Number(elVal) * exchangeValue));
}

function normalizeCurrency(currency) {

    if (currency % 1 === 0)
        return currency;

    if (currency >= 1) {
        return formatCurrency(currency, 3, decimal, thousands);
    } else {
        if (currency > 1e-3) {
            return formatCurrency(currency, 6, decimal, thousands);
        } else if (currency > 1e-6) {
            return formatCurrency(currency, 9, decimal, thousands);
        } else if (currency > 1e-6) {
            return formatCurrency(currency, 12, decimal, thousands);
        }
    }

    return currency;
}


function normalize() {
    let currencies = $("." + currencyPriceClass);
    currencies.each(function () {
        if ($(this).is('input')) {
            $(this).val(normalizeCurrency(Number($(this).val())));
        } else {
            $(this).html(normalizeCurrency(Number($(this).html())));
        }
    })
}

normalize();