//Chrome Data
function cvsChromeInspection(CIlabels, CIdata1, CIdata2, CIdata3, CIdata4, CIdata5){
    var dLabels = CIlabels;
    var dData1 = CIdata1;
    var dData2 = CIdata2;
    var dData3 = CIdata3;
    var dData4 = CIdata4;
    var dData5 = CIdata5;

    Chart.defaults.global.legend.display = false;
    var chartData = {
        labels: dLabels,
        datasets: [{
            label: "Total Inspection",
            type: 'bar',
            backgroundColor: "#3c8dbc",
            data: dData1
        }, {
            label: "Ok Value",
            type: 'bar',
            backgroundColor: "#00a65a",
            data: dData2,

        }, {
            label: "Hold Value",
            type: 'bar',
            backgroundColor: "#f39c12",
            data: dData3
        },
            {
                label: "Rejection Value",
                type: 'bar',
                backgroundColor: "#f56954",
                data: dData4
            },
             {
                 label: "Rejection Value(%)",
                 type: 'line',
                 //  backgroundColor: window.chartColors.white,
                 data: dData5
             },
             {
                 label: "",
                 type: 'line',
                 options: {
                     legend: {
                         display: false
                     },
                     tooltips: {
                         callbacks: {
                             label: function (tooltipItem) {
                                 console.log(tooltipItem)
                                 return tooltipItem.yLabel;
                             }
                         }
                     }
                 },
                 //  backgroundColor: window.chartColors.white,
                 data: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
             }
        ]

    }

    var ctx = document.getElementById("cvsChromeInspection").getContext("2d");

            var opt = {
                //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value

                scaleBeginAtZero: true,
                //Boolean - Whether grid lines are shown across the chart
                scaleShowGridLines: true,
                //String - Colour of the grid lines
                scaleGridLineColor: "rgba(0,0,0,.05)",
                //Number - Width of the grid lines
                scaleGridLineWidth: 1,
                //Boolean - Whether to show horizontal lines (except X axis)
                scaleShowHorizontalLines: true,
                //Boolean - Whether to show vertical lines (except Y axis)
                scaleShowVerticalLines: true,
                //Boolean - If there is a stroke on each bar
                barShowStroke: true,
                //Number - Pixel width of the bar stroke
                barStrokeWidth: 2,
                //Number - Spacing between each of the X value sets
                barValueSpacing: 5,
                //Number - Spacing between data sets within X values
                barDatasetSpacing: 1,
                //String - A legend template
                //Boolean - whether to make the chart responsive
                responsive: true,
                maintainAspectRatio: false,

                hover: {
                    mode: 'label'
                },

                //events: false,
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'In Lakhs'
                        }
                    }]
                },
                animation: {
                    duration: 1,
                    onComplete: function () {
                        var chartInstance = this.chart,
                            ctx = chartInstance.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';



                        this.data.datasets.forEach(function (dataset, i) {
                            if (dataset.type == "line") {

                                var meta = chartInstance.controller.getDatasetMeta(i);
                                meta.data.forEach(function (bar, index) {
                                    var data = dataset.data[index];
                                    if (data != "0.00") {
                                        ctx.fillStyle = '#f56954'
                                        ctx.font.fontsize = "10";
                                        ctx.fillText(data + " %", bar._model.x, bar._model.y - 5);
                                    }

                                });
                            }
                        });
                    }
                }
            };

            window.myMixedChart = new Chart(ctx, {
                type: 'bar',

                data: chartData,
                options: opt
            });
}

function cvsChromeMonthly(CRlabels, CRdata, CPdata, CEdata){

        var cdata = CRdata;
        var clabels = CRlabels;
        var pdata = CPdata;
        var emdata = CEdata;
            var ChartDataArray = {
                labels: clabels,
                datasets: [

                  {
                      label: "Total Round",
                      backgroundColor: "#3c8dbc",
                      data: cdata
                  },
                  {
                      label: "Empty Round",
                      backgroundColor: "#f39c12",
                      data: emdata

                  },
                  {
                      label: "Pending Loading",
                      backgroundColor: "#00a65a",
                      data: pdata
                  }
                ]
            };


    var ctx1 = document.getElementById("cvsChromeMonthly").getContext("2d");
            var opt1 = {
                responsive: true,
                maintainAspectRatio: false
            }
            window.myBarChart = new Chart(ctx1, {
                type: 'bar',
                options: opt1,
                data: ChartDataArray
            });
}



//Satin Data
function cvsSatinInspection(CIlabels, CIdata1, CIdata2, CIdata3, CIdata4, CIdata5){
    var dLabels = CIlabels;
    var dData1 = CIdata1;
    var dData2 = CIdata2;
    var dData3 = CIdata3;
    var dData4 = CIdata4;
    var dData5 = CIdata5;

    Chart.defaults.global.legend.display = false;
    var chartData = {
        labels: dLabels,
        datasets: [{
            label: "Total Inspection",
            type: 'bar',
            backgroundColor: "#3c8dbc",
            data: dData1
        }, {
            label: "Ok Value",
            type: 'bar',
            backgroundColor: "#00a65a",
            data: dData2,

        }, {
            label: "Hold Value",
            type: 'bar',
            backgroundColor: "#f39c12",
            data: dData3
        },
            {
                label: "Rejection Value",
                type: 'bar',
                backgroundColor: "#f56954",
                data: dData4
            },
             {
                 label: "Rejection Value(%)",
                 type: 'line',
                 //  backgroundColor: window.chartColors.white,
                 data: dData5
             },
             {
                 label: "",
                 type: 'line',
                 options: {
                     legend: {
                         display: false
                     },
                     tooltips: {
                         callbacks: {
                             label: function (tooltipItem) {
                                 console.log(tooltipItem)
                                 return tooltipItem.yLabel;
                             }
                         }
                     }
                 },
                 //  backgroundColor: window.chartColors.white,
                 data: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
             }
        ]

    }

    var ctx = document.getElementById("cvsSatinInspection").getContext("2d");

            var opt = {
                //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value

                scaleBeginAtZero: true,
                //Boolean - Whether grid lines are shown across the chart
                scaleShowGridLines: true,
                //String - Colour of the grid lines
                scaleGridLineColor: "rgba(0,0,0,.05)",
                //Number - Width of the grid lines
                scaleGridLineWidth: 1,
                //Boolean - Whether to show horizontal lines (except X axis)
                scaleShowHorizontalLines: true,
                //Boolean - Whether to show vertical lines (except Y axis)
                scaleShowVerticalLines: true,
                //Boolean - If there is a stroke on each bar
                barShowStroke: true,
                //Number - Pixel width of the bar stroke
                barStrokeWidth: 2,
                //Number - Spacing between each of the X value sets
                barValueSpacing: 5,
                //Number - Spacing between data sets within X values
                barDatasetSpacing: 1,
                //String - A legend template
                //Boolean - whether to make the chart responsive
                responsive: true,
                maintainAspectRatio: false,

                hover: {
                    mode: 'label'
                },

                //events: false,
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'In Lakhs'
                        }
                    }]
                },
                animation: {
                    duration: 1,
                    onComplete: function () {
                        var chartInstance = this.chart,
                            ctx = chartInstance.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';



                        this.data.datasets.forEach(function (dataset, i) {
                            if (dataset.type == "line") {

                                var meta = chartInstance.controller.getDatasetMeta(i);
                                meta.data.forEach(function (bar, index) {
                                    var data = dataset.data[index];
                                    if (data != "0.00") {
                                        ctx.fillStyle = '#f56954'
                                        ctx.font.fontsize = "10";
                                        ctx.fillText(data + " %", bar._model.x, bar._model.y - 5);
                                    }

                                });
                            }
                        });
                    }
                }
            };

            window.myMixedChart = new Chart(ctx, {
                type: 'bar',

                data: chartData,
                options: opt
            });
}

function cvsMonthlySatin(CRlabels, CRdata, CPdata, CEdata){

        var cdata = CRdata;
        var clabels = CRlabels;
        var pdata = CPdata;
        var emdata = CEdata;
            var ChartDataArray = {
                labels: clabels,
                datasets: [

                  {
                      label: "Total Round",
                      backgroundColor: "#3c8dbc",
                      data: cdata
                  },
                  {
                      label: "Empty Round",
                      backgroundColor: "#f39c12",
                      data: emdata

                  },
                  {
                      label: "Pending Loading",
                      backgroundColor: "#d2d6de",
                      data: pdata
                  }
                ]
            };


    var ctx1 = document.getElementById("cvsMonthlySatin").getContext("2d");
            var opt1 = {
                responsive: true,
                maintainAspectRatio: false
            }
            window.myBarChart = new Chart(ctx1, {
                type: 'bar',
                options: opt1,
                data: ChartDataArray
            });
}
