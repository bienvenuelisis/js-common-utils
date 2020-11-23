function loader(id, time) {
    var loader = $('#' + id);
    var body = $('body');


    setTimeout(function (e) {

    }, time);
}

var loaderHTML = '<div id="main_loader" class="indicator">' +
    '    <svg width="16px" height="12px">' +
    '        <polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>' +
    '        <polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>' +
    '    </svg>' +
    '</div>';

function mainLoader() {
    $('body').append(loaderHTML);
    var loader = $('#main_loader');
    var body = $('.kt-grid--root');

    body.hide();
    setTimeout(function (e) {
        loader.toggleClass('animated fadeOut');
        body.show();
    }, 1500);
}


function loader_online_consulation() {
    var select = function (s) {
            return document.querySelector(s);
        },
        selectAll = function (s) {
            return document.querySelectorAll(s);
        },
        animationWindow = select('#animationWindow'),
        animData = {
            wrapper: animationWindow,
            animType: 'svg',
            loop: true,
            prerender: true,
            autoplay: true,
            path: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/play_fill_loader.json',
            rendererSettings: {
                //context: canvasContext, // the canvas context
                //scaleMode: 'noScale',
                //clearCanvas: false,
                //progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
                //hideOnTransparent: true //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
            }
        }, anim;

    anim = bodymovin.loadAnimation(animData);
    anim.addEventListener('DOMLoaded', onDOMLoaded);
    anim.setSpeed(1);

    function onDOMLoaded(e) {
        anim.addEventListener('complete', function () {
        });
    }

    ScrubBodymovinTimeline(anim);
}