var LINE_WIDTH_CONSTANT = 1;
Highcharts.theme = {
    namedColors : {
        lightBlue: '#00bcf2',
        blue: '#0267eb',
        red: '#cb4b4b',
        green: '#4da74d',
        yellow: '#dfcc25',
        orange: '#edc240',
        purple: '#9440ed',
        gray: '#959595',
        salmon: '#fa8072',
        plum: '#dda0dd',
        lightSteelBlue: "#b0c4de",
        tan: "#d2b48c",
        black: "#000000",
        olive: "#808000",
        darkGray: '#A5AAD9',

        pass: '#4da74d', //green
        fail: '#cb4b4b', //red
        skip: '#959595', //gray
        flag: '#dfcc25', //yellow

        edge: '#00bcf2', //lightBlue
        ie: '#0267eb', //blue
        chrome: '#cb4b4b', //red
        firefox: '#edc240', //orange
        safari: '#9440ed', //purple
        opera: '#959595', //gray
        secure360: '#dda0dd', //plum
        chromium: '#b0c4de', //lightSteelBlue
        sogou: '#d2b48c', //tan
        liebao: '#000000', //black

        // Traffic to Bing colors
        aboutStartSearch: '#40CDF5', // light blue
        aboutTabsSearch: '#DE3C3C', // red
        otherBingSearch: '#DFD103', // yellow
        oneBoxSearch: '#FF70DE', // pink
        cortanaAssistSearch: '#0080FF', // blue
        askCortanaSearch: '#7C00FF', // purple
        cortanaRequerySearch: '#ff8800', // orange
        uniqueDeviceCount: '#EEEEF8', // super light gray
        uniqueDeviceCountTooltip: '#A5AAD9' // darker gray

    },
    colors: ['#00bcf2', '#edc240', '#4da74d', '#9440ed', '#7cb5ec', '#f7a35c', '#90ee7e', '#7798bf', '#aaeeee', '#ff0066', '#eeaaee', '#55bf3b', '#ebe54d', '#f8dcdc', '#99cccc', '#00FFFF', '#ccff00', '#c1ab87'],
    chart: {
        backgroundColor: null,
        style: {
            fontFamily: 'Segoe UI Light',
        }
    },
    title: {
        text: null,
        style: {
            fontSize: '25px',
        }
    },
    tooltip: {
        shared: true,
        borderWidth: 0,
        shadow: false,
        crosshairs: [true, false],
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>'
    },
    legend: {
        align: 'right',
        verticalAlign: 'top',
        layout: 'vertical',
        itemStyle: {
            fontSize: '13px'
        }
    },
    xAxis: {
        tickmarkPlacement: 'on',
        gridLineWidth: 0,
        title: {
            style: {
                textTransform: 'uppercase'
            }
        },
        labels: {
            style: {
                fontSize: '12px'
            }
        }
    },
    yAxis: {
        gridLineWidth: 0,
        title: {
            style: {
                textTransform: 'uppercase'
            }
        },
        labels: {
            style: {
                fontSize: '12px'
            }
        }
    },
    credits: {
        enabled: false,
    },
    plotOptions: {
        area: {
            lineWidth: LINE_WIDTH_CONSTANT,
            marker: {
                enabled: false,
                radius: 2,
                symbol: 'circle',
                states: {
                    hover: {
                        enabled: true,
                    }
                }
            },
            states: {
                hover: {
                    lineWidth: 2,
                }
            },
        },
        line: {
            lineWidth: LINE_WIDTH_CONSTANT,
            marker: {
                enabled: false,
                radius: 2,
                symbol: 'circle',
                states: {
                    hover: {
                        enabled: true,
                    }
                }
            },
            states: {
                hover: {
                    lineWidth: 2,
                }
            },
        },
        spline:{
            lineWidth: LINE_WIDTH_CONSTANT
        },
        pie: {
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            }
        },
        solidgauge: {
            dataLabels: {
                borderWidth: 0,
                useHTML: true
            },
        }
    },
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);
