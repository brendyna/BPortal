import $ = require("jquery");
import ko = require("knockout");
import Chart = require("Areas/Shared/Controls/Chart");

export = Main;

module Main {
    $((): void => {
        // SAMPLE: Default
        let data: Chart.IViewModelData = {
            options: {
                chart: {
                    type: 'areaspline',
                    height: 300
                },
                title: { text: "Test Chart" },
                xAxis: {
                    type: 'datetime',
                    labels: {
                        formatter: function () {
                            return Highcharts.dateFormat('%b %e', this.value);
                        }
                    }
                },
                yAxis: {
                    title: { text: '' },
                    min: 0,
                    gridLineWidth: 0
                },
                tooltip: {
                    pointFormat: '<b>{point.y}</b>'
                },
                plotOptions: {
                    areaspline: {
                        fillOpacity: 0.2,
                        marker: { enabled: false }
                    }
                },
                series: [
                    {
                        name: "Series name",
                        data: formatChartPoints(getSampleSeries())
                    }
                ],
                legend: { enabled: false }
            }
        };
        let widget = new Chart.Widget($("#sample"), data);
    });

    function getSampleSeries() {
        return [
            { "date": "2016-04-25T00:00:00", "count": 18177.0 }, { "date": "2016-04-26T00:00:00", "count": 17974.0 }, { "date": "2016-04-27T00:00:00", "count": 18054.0 }, { "date": "2016-04-28T00:00:00", "count": 17874.0 }, { "date": "2016-04-29T00:00:00", "count": 16558.0 }, { "date": "2016-04-30T00:00:00", "count": 14894.0 }, { "date": "2016-05-01T00:00:00", "count": 14461.0 }, { "date": "2016-05-02T00:00:00", "count": 16681.0 }, { "date": "2016-05-03T00:00:00", "count": 17275.0 }, { "date": "2016-05-04T00:00:00", "count": 17605.0 }, { "date": "2016-05-05T00:00:00", "count": 16956.0 }, { "date": "2016-05-06T00:00:00", "count": 20023.0 }, { "date": "2016-05-07T00:00:00", "count": 13070.0 }, { "date": "2016-05-08T00:00:00", "count": 14164.0 }, { "date": "2016-05-09T00:00:00", "count": 17091.0 }, { "date": "2016-05-10T00:00:00", "count": 17240.0 }, { "date": "2016-05-11T00:00:00", "count": 18375.0 }, { "date": "2016-05-12T00:00:00", "count": 18862.0 }, { "date": "2016-05-13T00:00:00", "count": 17907.0 }, { "date": "2016-05-14T00:00:00", "count": 15413.0 }, { "date": "2016-05-15T00:00:00", "count": 15047.0 }, { "date": "2016-05-16T00:00:00", "count": 16851.0 }, { "date": "2016-05-17T00:00:00", "count": 18414.0 }, { "date": "2016-05-18T00:00:00", "count": 17483.0 }, { "date": "2016-05-19T00:00:00", "count": 16895.0 }, { "date": "2016-05-20T00:00:00", "count": 16026.0 }, { "date": "2016-05-21T00:00:00", "count": 14283.0 }, { "date": "2016-05-22T00:00:00", "count": 14093.0 }, { "date": "2016-05-23T00:00:00", "count": 16228.0 }, { "date": "2016-05-24T00:00:00", "count": 17226.0 }, { "date": "2016-05-25T00:00:00", "count": 16215.0 }, { "date": "2016-05-26T00:00:00", "count": 16447.0 }, { "date": "2016-05-27T00:00:00", "count": 16601.0 }, { "date": "2016-05-28T00:00:00", "count": 14774.0 }, { "date": "2016-05-29T00:00:00", "count": 14229.0 }, { "date": "2016-05-30T00:00:00", "count": 16004.0 }, { "date": "2016-05-31T00:00:00", "count": 18053.0 }, { "date": "2016-06-01T00:00:00", "count": 18949.0 }, { "date": "2016-06-02T00:00:00", "count": 17752.0 }, { "date": "2016-06-03T00:00:00", "count": 17454.0 }, { "date": "2016-06-04T00:00:00", "count": 14813.0 }, { "date": "2016-06-05T00:00:00", "count": 15024.0 }, { "date": "2016-06-06T00:00:00", "count": 17559.0 }, { "date": "2016-06-07T00:00:00", "count": 17102.0 }, { "date": "2016-06-08T00:00:00", "count": 16823.0 }, { "date": "2016-06-09T00:00:00", "count": 17818.0 }, { "date": "2016-06-10T00:00:00", "count": 18400.0 }, { "date": "2016-06-11T00:00:00", "count": 14796.0 }, { "date": "2016-06-12T00:00:00", "count": 15543.0 }, { "date": "2016-06-13T00:00:00", "count": 19071.0 }, { "date": "2016-06-14T00:00:00", "count": 18359.0 }, { "date": "2016-06-15T00:00:00", "count": 19322.0 }, { "date": "2016-06-16T00:00:00", "count": 18466.0 }, { "date": "2016-06-17T00:00:00", "count": 18205.0 }, { "date": "2016-06-18T00:00:00", "count": 15833.0 }, { "date": "2016-06-19T00:00:00", "count": 15400.0 }, { "date": "2016-06-20T00:00:00", "count": 19662.0 }, { "date": "2016-06-21T00:00:00", "count": 20866.0 }, { "date": "2016-06-22T00:00:00", "count": 20622.0 }, { "date": "2016-06-23T00:00:00", "count": 20134.0 }, { "date": "2016-06-24T00:00:00", "count": 19826.0 }, { "date": "2016-06-25T00:00:00", "count": 16644.0 }, { "date": "2016-06-26T00:00:00", "count": 17040.0 }, { "date": "2016-06-27T00:00:00", "count": 20241.0 }, { "date": "2016-06-28T00:00:00", "count": 19958.0 }, { "date": "2016-06-29T00:00:00", "count": 21609.0 }, { "date": "2016-06-30T00:00:00", "count": 19643.0 }, { "date": "2016-07-01T00:00:00", "count": 19529.0 }, { "date": "2016-07-02T00:00:00", "count": 16671.0 }, { "date": "2016-07-03T00:00:00", "count": 15817.0 }, { "date": "2016-07-04T00:00:00", "count": 17814.0 }, { "date": "2016-07-05T00:00:00", "count": 19834.0 }, { "date": "2016-07-06T00:00:00", "count": 20117.0 }, { "date": "2016-07-07T00:00:00", "count": 19327.0 }, { "date": "2016-07-08T00:00:00", "count": 20042.0 }, { "date": "2016-07-09T00:00:00", "count": 16675.0 }, { "date": "2016-07-10T00:00:00", "count": 17293.0 }, { "date": "2016-07-11T00:00:00", "count": 21267.0 }, { "date": "2016-07-12T00:00:00", "count": 22601.0 }, { "date": "2016-07-13T00:00:00", "count": 22011.0 }, { "date": "2016-07-14T00:00:00", "count": 20154.0 }, { "date": "2016-07-15T00:00:00", "count": 19869.0 }, { "date": "2016-07-16T00:00:00", "count": 17179.0 }, { "date": "2016-07-17T00:00:00", "count": 17351.0 }, { "date": "2016-07-18T00:00:00", "count": 20690.0 }, { "date": "2016-07-19T00:00:00", "count": 22016.0 }, { "date": "2016-07-20T00:00:00", "count": 20935.0 }, { "date": "2016-07-21T00:00:00", "count": 21454.0 }, { "date": "2016-07-22T00:00:00", "count": 20685.0 }
        ]
    }

    function formatChartPoints(series) {
        'use strict';

        var newSeries = series;
        $.each(newSeries, function (point, value) {
            var d = new Date(value.date.substr(0, 10));
            newSeries[point] = [
                Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()),
                value.count
            ];
        });
        return newSeries.sort();
    }
}