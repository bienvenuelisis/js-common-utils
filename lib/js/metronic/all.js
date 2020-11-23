function uiBlockDiv(elementId, state, message, time) {
    KTApp.block('#' + elementId, {
        overlayColor: '#000000',
        type: 'v2',
        state: state,
        message: message
    });

    setTimeout(function () {
        KTApp.unblock('#' + elementId);
    }, time);
}

function uiBlockDivSuccess(elementId, message, time) {
    uiBlockDiv(elementId, 'success', message, time);
}