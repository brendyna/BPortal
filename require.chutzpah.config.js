require.config({
    baseUrl: "./Areas.chutzpah/",
    paths: {
        jquery: "./Lib/jquery/jquery-2.1.1",
        knockout: "./Lib/knockout-3.2.0",
        "jquery.extensions": "./Lib/jQuery.Extensions",
        "jquery.mockjax": "./Lib/jquery.mockjax",
        "datatables": "./Lib/DataTables/jquery.dataTables",
        "highcharts": "./Lib/Highcharts-4.0.4/highcharts",
        "highcharts.more": "./Lib/Highcharts-4.0.4/highcharts-more",
        "highcharts.ieportal": "./Lib/Highcharts-4.0.4/themes/ieportal",
        "highcharts.legend.highlighter": "./Lib/highcharts-legend-highlighter.src",
        "commoncharting": "./Lib/commoncharting",
        "humanize": "./Lib/humanize/humanize.min",
        "moment": "./Lib/moment/moment",
        "wps.portal": "./Lib/wps.portal.min"
    },
    shim: {
        "jquery.extensions": ["jquery"],
        "jquery.mockjax": ["jquery"],
        "datatables": ["jquery"],
        "highcharts": ["jquery"],
        "wps.portal": ["jquery"],
        "highcharts.more": ["highcharts"],
        "highcharts.ieportal": ["highcharts"],
        "highcharts.legend.highlighter": ["highcharts"],
        "commoncharting": ["highcharts"]
    }
});

require([
    "jquery.extensions", "jquery.mockjax", "humanize", "moment", "wps.portal"
]);