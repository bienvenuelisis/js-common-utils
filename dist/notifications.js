let intervalID;

function stopNotificationsAutoUpdate() {
    clearInterval(intervalID);
}

const timeAutoUpdateNotifications = 30e3;

function getNotifications() {
    $.get('/User.Me/allNotificationsJson',
        function (response) {
            $('#notifications-count').html(response['count']);
            addNotifications(response['notifications']);
        })
}

function initNotificationsAutoUpdate() {
    intervalID = window.setInterval(getNotifications, timeAutoUpdateNotifications);
}

const seeAllNotificationLi = '<li> <div class="text-center"> <a href="/user.me/notifications">' +
    '<strong>Voir toutes les notifications </strong> <i class="fa fa-angle-right" aria-hidden="true">' +
    '</i></a> </div></li>';

function getOneNotification(notification) {
    return '<li><a target="_blank" href="' + notification['link'] + '">' +
        ((isEmptyValue(notification['imageLinkTo'])) ?

            ((isEmptyValue(notification['photo'])) ? '' :
                (   '<span class="image">' +
                    '<img class="user-profile-photo" src="' + notification['photo'] + '"' +
                    ' alt="' + notification['fullname'] + ' Profile Image"/></span>')) :

            ('<span class="image"><img class="user-profile-photo"' +
                ' src="' + notification['imageLinkTo'] + '"' +
                ' alt="' + notification['fullname'] + 'Profile Image"/></span>')) +

        ((isEmptyValue(notification['dateAt'])) ?
            '' : '<span><span class="time"> ' + notification['dateAtFr'] + ' </span></span><br>') +
        '<span class="message">' + notification['linkMessage'] +
        '<i class="fa fa-external-link-alt fa-2x"></i></span></a></li>';
}

function addNotifications(notifications) {
    let menu = $('#menu1');
    menu.html('');
    $.each(notifications, function (index, notification) {
        if (!isEmptyValue(notification['linkMessage'])) {
            menu.prepend(getOneNotification(notification));
        }
    })
    menu.append(seeAllNotificationLi);
}

setTimeout(function () {
    initNotificationsAutoUpdate()
}, timeAutoUpdateNotifications);