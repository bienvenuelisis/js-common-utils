const changeLocalizationAsync = $('.change-localization-async');
const localizationItems = $('.localization-item');

changeLocalizationAsync.click(function () {
    getAjax(getURL('/API/changeLanguageAsync',
        'locale', $(this).data("locale")),
        function (response) {
            pNotifyResultWarn(response);
            changeContents();
        },
        function (response) {
            pNotifyUnknownException();
        }
    )
})

function changeContents() {
    localizationItems.each(function () {
        getAjax(getURL('/API/getLocalizationMessage',
            'identifier', $(this).data('identifier')),
            function (response) {
                if (ajaxResultIsOkay(response)) {
                    $(this).html(getAjaxMessage(response));
                }
            }
        )
    });
}

