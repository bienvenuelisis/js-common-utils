const configsFrPlotLyDefault = {
    scrollZoom: true,
    editable: true,
    locale: 'fr',
    responsive: true,
    autosizable: true,
    doubleClick: 'reset',
    showSources: true,
    setBackground: 'transparent'
};


function splitEl(el, char) {
    return el.split(char);
}

function parseJson(s) {
    return JSON.parse(s);
}

function plotLyFr(id, data, layout) {
    return plotLy(id, data, layout, configsFrPlotLyDefault);
}
function plotLy(id, data, layout, config) {
    if (typeof layout === 'undefined') {
        return Plotly.newPlot(id, data);
    } else {
        if (typeof config === 'undefined') {
            return Plotly.newPlot(id, data, layout);
        } else
            return Plotly.newPlot(id, data, layout, config);
    }
}