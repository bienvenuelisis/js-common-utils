const currenciesValues = $('.currency-exchange-input');
const currenciesEl = $('.currency-exchange-select');

currenciesEl.on('change', function () {
    let input = $('#' + $(this).data('input'));
    //convertInput($(this));
    convertInput($('#' + input.data('exchange-input')));
})

currenciesValues.on('enter edit change keyup', function () {
    if (isEmptyInputElement($(this))) {
        $('#' + $(this).data('exchange-input')).val('0.000');
    }
    convertInput($(this));
})

function init() {
    currenciesValues.each(function () {
        if (!isEmptyInputElement($(this))) {
            convertInput($(this));
        }
    })
}

function convertInput(el) {
    let currencyEl = $('#' + el.data('currency'));
    let thisCurrencyValue = (typeof currencyEl.find(':selected').data('code-iso') === 'undefined') ?
        currencyEl.val() : currencyEl.find(':selected').data('code-iso');
    let exchangeInput = $('#' + el.data('exchange-input'));
    let exchangeCurrencyEl = $('#' + el.data('exchange-currency'));
    let exchangeCurrencyValue = (typeof exchangeCurrencyEl.find(':selected').data('code-iso') === 'undefined') ?
        exchangeCurrencyEl.val() : exchangeCurrencyEl.find(':selected').data('code-iso');
    let transactionType = el.data('transaction-type');

    if (equalsValues(thisCurrencyValue, exchangeCurrencyValue)) {
        exchangeInput.val(getFormatCurrencyValue(el, 1));
        $('#' + el.data('label-exchange')).html('1 ' + thisCurrencyValue + ' => 1 ' + exchangeCurrencyValue);
    } else {
        setSymbolPriceIntern(thisCurrencyValue, exchangeCurrencyValue, transactionType, function (exchangeValue) {
            exchangeInput.val(getFormatCurrencyValue(el, exchangeValue));
            $('#' + el.data('label-exchange')).html('1 ' + thisCurrencyValue + ' => '
                + normalizeCurrency(Number(exchangeValue)) + ' ' + exchangeCurrencyValue);
        });
    }
}

init();