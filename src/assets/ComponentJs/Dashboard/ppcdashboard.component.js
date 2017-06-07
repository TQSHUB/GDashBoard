function ppcMonthlyChrome(labels, tround, total, percentage, JiggTot){

    var tround = tround;
     var clabels = labels;
     var total = total;
     var percentage = percentage;
     var JiggTot = JiggTot;

     Chart.defaults.global.legend.display = false;
     var ChartDataArray = {
         labels: clabels,
         datasets: [

           {
               label: "Total Round Planned",
               backgroundColor: "#00a65a",
               data: total
           },
           {
               label: "Actual Round Jigged Agnst Plan",
               backgroundColor: "#3c8dbc",
               data: tround

           },
            {
                label: "Actual Round Jigged",
                backgroundColor: "#f39c12",
                data: JiggTot
            },
           {
               label: "Rejection Value(%)",
               type: 'line',
               data: percentage
           }
         ]
     };

    var ctx = document.getElementById("ppcMonthlyChrome").getContext("2d");

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
                        labelString: 'In Rounds'
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
                                if (data != "0") {
                                    ctx.fillStyle = '#000'
                                    ctx.font.fontsize = "10";
                                    ctx.fontStyle = "bold";
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
            data: ChartDataArray,
            options: opt
        });
}

function ppcMonthlySatin(slabels, stround, stotal, spercentage, sJiggTot){

        var stround = stround;
        var sclabels = slabels;
        var stotal = stotal;
        var spercentage = spercentage;
        var sJiggTot = sJiggTot;

        var sChartDataArray = {
            labels: sclabels,
            datasets: [

              {
                  label: "Total Round Planned",
                  backgroundColor: "#f39c12",
                  data: stotal
              },
              {
                  label: "Actual Round Jigged Agnst Plan",
                  backgroundColor: "#3c8dbc",
                  data: stround

              },
              {
                  label: "Actual Round Jigged",
                  backgroundColor: "#00a65a",
                  data: sJiggTot
              }, 
              {
                  label: "Rejection Value(%)",
                  type: 'line',
                  data: spercentage
              }
            ]
        };

    var sctx = document.getElementById("ppcMonthlySatin").getContext("2d");

        var sopt = {
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
                        labelString: 'In Rounds'
                    }
                }]
            },
            animation: {
                duration: 1,
                onComplete: function () {
                    var chartInstance = this.chart,
                        sctx = chartInstance.ctx;
                    sctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                    sctx.textAlign = 'center';
                    sctx.textBaseline = 'bottom';



                    this.data.datasets.forEach(function (dataset, i) {
                        if (dataset.type == "line") {

                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = dataset.data[index];
                                if (data != "0") {
                                    sctx.fillStyle = '#000'
                                    sctx.font.fontsize = "10";
                                    sctx.fillText(data + " %", bar._model.x, bar._model.y - 5);
                                }

                            });
                        }
                    });
                }
            }
        };

        window.myMixedChart1 = new Chart(sctx, {
            type: 'bar',
            data: sChartDataArray,
            options: sopt
        });
}