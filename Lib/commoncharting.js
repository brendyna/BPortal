function buildTrendsChart(bugData, container, inputBoxes) {
    "use strict";
    Highcharts.dateFormats = {
        X: function (timestamp) {
            return moment(timestamp).format("M/D");
        }
    };

    var render = function () {
        var type = $(inputBoxes + ":checked").val();
        var symbol = (type === "count") ? "" : "%";
        var seriesData = [
                {
                    name: "Unknown",
                    id: "unknown",
                    data: bugData.unknown.map(function (point) { return point.active["count"]; }),
                    color: Highcharts.theme.namedColors.gray
                }, {
                    name: "NotInterop",
                    id: "notInterop",
                    data: bugData.notInterop.map(function (point) { return point.active["count"]; }),
                    color: Highcharts.theme.namedColors.purple
                }, {
                    name: "Interop3",
                    id: "interop3",
                    data: bugData.interop3.map(function (point) { return point.active["count"]; }),
                    color: Highcharts.theme.namedColors.green
                }, {
                    name: "Interop2",
                    id: "interop2",
                    data: bugData.interop2.map(function (point) { return point.active["count"]; }),
                    color: Highcharts.theme.namedColors.lightBlue
                }, {
                    name: "Interop1",
                    id: "interop1",
                    data: bugData.interop1.map(function (point) { return point.active["count"]; }),
                    color: Highcharts.theme.namedColors.orange
                }, {
                    name: "Interop0",
                    id: "interop0",
                    data: bugData.interop0.map(function (point) { return point.active["count"]; }),
                    color: Highcharts.theme.namedColors.red
                }
        ];
        if (symbol !== "%") {
            seriesData.push({
                name: "Committed",
                id: "committed",
                data: bugData.committed.map(function (point) { return point.active["count"]; }),
                color: Highcharts.theme.namedColors.blue,
                visible: symbol === "%" ? false : true,
                type: "line"
            });
        }

        $(container).highcharts({
            tooltip: {
                useHTML: true,
                formatter: function () {
                    var context = this;
                    var time = moment(context.x);
                    var label = "<div class=\"tooltip-bug-trend\"><div class=\"smaller\">" + time.format("dddd M/D/YYYY") + "</div>";
                    label += "<table>";
                    var totalBugsCount = 0;
                    var committedLabel = "";
                    $.each(bugData, function (seriesName) {
                        try {
                            var index = context.points[0].point.index;
                            var color = context.points.filter(function (point) { return point.series.userOptions.id === seriesName; })[0].series.color;
                            var active, added, resolved;
                            if (seriesName !== "committed") {
                                active = Math.round(this[index].active[type][1]) + symbol;
                                added = Math.round(this[index].added[type][1]) + symbol;
                                resolved = Math.round(this[index].resolved[type][1]) + symbol;
                                label += "<tr>";
                                label += "<td style=\"color: " + color + ";\">\u25CF</td>";
                                label += "<td>" + seriesName + "</td>";
                                label += "<td class=\"badge\">" + active + "</td>";
                                label += " <td class=\"smaller\">(<span class=\"added\">+" + added + "</span> <span class=\"resolved\">-" + resolved + "</span>)</td>";
                                label += "</tr>";
                                totalBugsCount = (+totalBugsCount) + (+active);
                            } else {
                                active = Math.round(this[index].active[type][1]) + symbol;
                                committedLabel += "<tr class='committed-tr'>";
                                committedLabel += "<td style=\"color: " + color + ";\">\u25CF</td>";
                                committedLabel += "<td>" + seriesName + "</td>";
                                committedLabel += "<td class=\"badge\">" + active + "</td>";
                                label += "<td></td></tr>";
                            }
                            
                        } catch (e) {
                            // Series is missing; skip it -- This happens when someone hovers over a point with the series turned off
                        }
                    });
                    
                    label += "</table>";
                    label += "</div>";
                    if (committedLabel) {
                        label += "<div class='tool-foot'><table>" + committedLabel + "<tr></tr><tr><td></td><td>total</td><td class=\"badge\">" + totalBugsCount + "</td></tr></table></div>";
                    } else {
                        label += "<div class='tool-foot'><table><tr><td></td></tr><tr><td></td><td>Total: </td><td class=\"badge\">" + totalBugsCount + "</td></tr></table></div>";
                    }
                    return label;
                }
            },
            chart: {
                type: "area"
            },
            yAxis: {
                min: 0,
                title: null
            },
            xAxis: {
                type: "datetime",
                dateTimeLabelFormats: {
                    week: "%X",
                    month: "%X"
                }
            },
            legend: {
                reversed: true,
                useHTML: true,
                labelFormatter: function () {
                    var series = bugData[this.userOptions.id];
                    if (this.name !== "Committed") {
                        var index = series.length - 1;
                        return this.name + " (" + Math.round(series[index].active[type][1]) + symbol + ")";
                    } else {
                        var index = series.length - 1;
                        return this.name;
                    }
                }
            },
            plotOptions: {
                area: {
                    stacking: (type === "count") ? "normal" : "percent"
                }
            },
            series: seriesData
        });
    };

    $(inputBoxes).change(function () {
        render();
    });

    render();
}