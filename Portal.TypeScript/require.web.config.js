﻿require.config({
    baseUrl: "/",
    paths: {
        jquery: "/bower_components/jquery/dist/jquery.min",
        knockout: "/bower_components/knockout/dist/knockout",
        "jquery.mockjax": "/bower_components/jquery-mockjax/dist/jquery.mockjax.min",
        "datatables": "/bower_components/datatables/media/js/jquery.dataTables.min",
        "highcharts": "/bower_components/highcharts/highcharts",
        "highcharts.more": "/bower_components/highcharts/highcharts-more",
        "highcharts.legend.highlighter": "/bower_components/highcharts-legend-highlighter/highcharts-legend-highlighter.src",
        "humanize": "/bower_components/humanize-plus/dist/humanize.min",
        "moment": "/bower_components/moment/min/moment.min",
        "jquery.extensions": "/Lib/jQuery.Extensions", // How to share w/Web?
        "highcharts.ieportal": "/Lib/highcharts/themes/ieportal", // How to share w/Web?
        "qunit": "/bower_components/qunit/qunit/qunit",
        "wps.portal": "/Lib/wps.portal.min" // How to share w/Web?
    },
    shim: {
        "jquery.extensions": ["jquery"],
        "jquery.mockjax": ["jquery"],
        "datatables": ["jquery"],
        "highcharts": ["jquery"],
        "wps.portal": ["jquery"],
        "highcharts.more": ["highcharts"],
        "highcharts.ieportal": ["highcharts"],
        "highcharts.legend.highlighter": ["highcharts"]
    }
});

// TODO: Remove these and ensure each file includes what it needs (this defeats
// the points of AMD a bit)
require([
    "jquery.extensions", "jquery.mockjax", "humanize", "moment", "wps.portal"
]);