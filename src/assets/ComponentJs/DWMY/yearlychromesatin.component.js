function cvsInspectionYearly(Ilabels, Idata1, Idata2, Idata3, Idata4, Idata5){
            var dLabels = Ilabels;
            var dData1 = Idata1;
            var dData2 = Idata2;
            var dData3 = Idata3;
            var dData4 = Idata4;
            var dData5 = Idata5;

            var ChartDataArray = {
                labels: dLabels,
                datasets: [

                  {
                      label: "Total Inspection",
                      fillColor: "rgba(60,141,188,0.9)",
                      strokeColor: "rgba(60,141,188,0.8)",
                      pointColor: "#3b8bba",
                      pointStrokeColor: "rgba(60,141,188,1)",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(60,141,188,1)",
                      data: dData1
                  },
                  {
                      label: "Ok Value",
                      fillColor: "rgba(60,141,188,0.9)",
                      strokeColor: "rgba(60,141,188,0.8)",
                      pointColor: "#3b8bba",
                      pointStrokeColor: "rgba(60,141,188,1)",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(60,141,188,1)",
                      data: dData2
                  },
                  {
                      label: "Hold Value",
                      fillColor: "rgba(60,141,188,0.9)",
                      strokeColor: "rgba(60,141,188,0.8)",
                      pointColor: "#3b8bba",
                      pointStrokeColor: "rgba(60,141,188,1)",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(60,141,188,1)",
                      data: dData3
                  },
                  {
                      label: "Rejection Value",
                      fillColor: "rgba(60,141,188,0.9)",
                      strokeColor: "rgba(60,141,188,0.8)",
                      pointColor: "#3b8bba",
                      pointStrokeColor: "rgba(60,141,188,1)",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(60,141,188,1)",
                      data: dData4
                  },
                  {
                      label: "Rejection Value(%)",
                      fillColor: "rgba(60,141,188,0.9)",
                      strokeColor: "rgba(60,141,188,0.8)",
                      pointColor: "#3b8bba",
                      pointStrokeColor: "rgba(60,141,188,1)",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(60,141,188,1)",
                      data: dData5
                  }
                ]
            };


            //Create the line chart

            var barChartCanvas = $("#cvsInspection").get(0).getContext("2d");
            var barChart = new Chart(barChartCanvas);
            var barChartData = ChartDataArray;
            barChartData.datasets[0].fillColor = "#3c8dbc";
            barChartData.datasets[0].strokeColor = "#3c8dbc";
            barChartData.datasets[0].pointColor = "#3c8dbc";

            barChartData.datasets[1].fillColor = "#00a65a";
            barChartData.datasets[1].strokeColor = "#00a65a";
            barChartData.datasets[1].pointColor = "#00a65a";

            barChartData.datasets[2].fillColor = "#f39c12";
            barChartData.datasets[2].strokeColor = "#f39c12";
            barChartData.datasets[2].pointColor = "#f39c12";

            barChartData.datasets[3].fillColor = "#d2d6de";
            barChartData.datasets[3].strokeColor = "#d2d6de";
            barChartData.datasets[3].pointColor = "#d2d6de";

            barChartData.datasets[4].fillColor = "#f56954";
            barChartData.datasets[4].strokeColor = "#f56954";
            barChartData.datasets[4].pointColor = "#f56954";

            var barChartOptions = {
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
                maintainAspectRatio: true,
                scaleLabel: function (value) {
                    var val = value.value;
                    if (val >= 10000000) val = (val / 10000000).toFixed(2) + ' Cr';
                    else if (val >= 100000) val = (val / 100000).toFixed(2) + ' Lac';
                    else if (val >= 0) val = (val / 1).toFixed(2) + ' Lac';
                    return val;
                }
            };

            barChartOptions.datasetFill = false;
            barChart.Bar(barChartData, barChartOptions);
}

function cvsRoundLineYearly(Rlabels, Rdata, Pdata, Edata){
            var cdata = Rdata;
            var clabels = Rlabels;
            var pdata = Pdata;
            var emdata = Edata;

            var ChartDataArray = {
                labels: clabels,
                datasets: [

                  {
                      label: "Total Round",
                      fillColor: "rgba(60,141,188,0.9)",
                      strokeColor: "rgba(60,141,188,0.8)",
                      pointColor: "#3b8bba",
                      pointStrokeColor: "rgba(60,141,188,1)",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(60,141,188,1)",
                      data: cdata
                  },
                  {
                      label: "Empty Round",
                      fillColor: "rgba(60,141,188,0.9)",
                      strokeColor: "rgba(60,141,188,0.8)",
                      pointColor: "#3b8bba",
                      pointStrokeColor: "rgba(60,141,188,1)",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(60,141,188,1)",
                      data: emdata

                  },
                  {
                      label: "Pending Loading",
                      fillColor: "rgba(60,141,188,0.9)",
                      strokeColor: "rgba(60,141,188,0.8)",
                      pointColor: "#3b8bba",
                      pointStrokeColor: "rgba(60,141,188,1)",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(60,141,188,1)",
                      data: pdata
                  }
                ]
            };



            //Create the line chart

            var barChartCanvas = $("#cvsRoundLine").get(0).getContext("2d");
            var barChart = new Chart(barChartCanvas);
            var barChartData = ChartDataArray;
            barChartData.datasets[0].fillColor = "#038686";
            barChartData.datasets[0].strokeColor = "#038686";
            barChartData.datasets[0].pointColor = "#038686";

            barChartData.datasets[1].fillColor = "#f39c12";
            barChartData.datasets[1].strokeColor = "#f39c12";
            barChartData.datasets[1].pointColor = "#f39c12";

            barChartData.datasets[2].fillColor = "#d2d6de";
            barChartData.datasets[2].strokeColor = "#d2d6de";
            barChartData.datasets[2].pointColor = "#d2d6de";
            var barChartOptions = {
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
                maintainAspectRatio: true
            };

            barChartOptions.datasetFill = false;
            barChart.Bar(barChartData, barChartOptions);
}

function cvsRDefectYearly(RDlabels, RDdata){
            var dData = RDdata;
            var dLabels = RDlabels;


            var ChartDataArray = {
                labels: dLabels,
                datasets: [

                  {
                      label: "Digital Goods",
                      fillColor: "rgba(60,141,188,0.9)",
                      strokeColor: "rgba(60,141,188,0.8)",
                      pointColor: "#3b8bba",
                      pointStrokeColor: "rgba(60,141,188,1)",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(60,141,188,1)",
                      data: dData
                  }
                ]
            };



            //Create the line chart

            var barChartCanvas = $("#cvsRDefect").get(0).getContext("2d");
            var barChart = new Chart(barChartCanvas);
            var barChartData = ChartDataArray;
            barChartData.datasets[0].fillColor = "#f56954";
            barChartData.datasets[0].strokeColor = "#f56954";
            barChartData.datasets[0].pointColor = "#f56954";
            var barChartOptions = {
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
                maintainAspectRatio: true,
                scaleLabel: function (value) {
                    var val = value.value;
                    if (val >= 10000000) val = (val / 10000000).toFixed(2) + '';
                    else if (val >= 100000) val = (val / 100000).toFixed(2) + ' ';
                    else if (val >= 0) val = (val / 1).toFixed(2) + ' ';
                    return val;
                }
            };

            barChartOptions.datasetFill = false;
            barChart.Bar(barChartData, barChartOptions);
}

function cvsTopDefectYearly(Tlabels, Tdata1, Tdata2, Tdata3, Tdata4, Tdata5, Legents1, Legents2, Legents3, Legents4, Legents5){
            var dLabels = Tlabels;
            var dData1 = Tdata1;
            var dData2 = Tdata2;
            var dData3 = Tdata3;
            var dData4 = Tdata4;
            var dData5 = Tdata5;

            var l1 = Legents1;
            var l2 = Legents2;
            var l3 = Legents3;
            var l4 = Legents4;
            var l5 = Legents5;

            var ChartDataArray = {
                labels: dLabels,
                datasets: [

                  {
                      label: l1,
                      fillColor: "rgba(60,141,188,0.9)",
                      strokeColor: "rgba(60,141,188,0.8)",
                      pointColor: "#3b8bba",
                      pointStrokeColor: "rgba(60,141,188,1)",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(60,141,188,1)",
                      data: dData1
                  },
                  {
                      label: l2,
                      fillColor: "rgba(60,141,188,0.9)",
                      strokeColor: "rgba(60,141,188,0.8)",
                      pointColor: "#3b8bba",
                      pointStrokeColor: "rgba(60,141,188,1)",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(60,141,188,1)",
                      data: dData2
                  },
                  {
                      label: l3,
                      fillColor: "rgba(60,141,188,0.9)",
                      strokeColor: "rgba(60,141,188,0.8)",
                      pointColor: "#3b8bba",
                      pointStrokeColor: "rgba(60,141,188,1)",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(60,141,188,1)",
                      data: dData3
                  },
                  {
                      label: l4,
                      fillColor: "rgba(60,141,188,0.9)",
                      strokeColor: "rgba(60,141,188,0.8)",
                      pointColor: "#3b8bba",
                      pointStrokeColor: "rgba(60,141,188,1)",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(60,141,188,1)",
                      data: dData4
                  },
                  {
                      label: l5,
                      fillColor: "rgba(60,141,188,0.9)",
                      strokeColor: "rgba(60,141,188,0.8)",
                      pointColor: "#3b8bba",
                      pointStrokeColor: "rgba(60,141,188,1)",
                      pointHighlightFill: "#fff",
                      pointHighlightStroke: "rgba(60,141,188,1)",
                      data: dData5
                  }
                ]
            };



            //Create the line chart

            var barChartCanvas = $("#cvsTopDefect").get(0).getContext("2d");
            var barChart = new Chart(barChartCanvas);
            var barChartData = ChartDataArray;
            barChartData.datasets[0].fillColor = "#f56954";
            barChartData.datasets[0].strokeColor = "#f56954";
            barChartData.datasets[0].pointColor = "#f56954";

            barChartData.datasets[1].fillColor = "#00a65a";
            barChartData.datasets[1].strokeColor = "#00a65a";
            barChartData.datasets[1].pointColor = "#00a65a";

            barChartData.datasets[2].fillColor = "#f39c12";
            barChartData.datasets[2].strokeColor = "#f39c12";
            barChartData.datasets[2].pointColor = "#f39c12";

            barChartData.datasets[3].fillColor = "#d2d6de";
            barChartData.datasets[3].strokeColor = "#d2d6de";
            barChartData.datasets[3].pointColor = "#d2d6de";

            barChartData.datasets[4].fillColor = "#3c8dbc";
            barChartData.datasets[4].strokeColor = "#3c8dbc";
            barChartData.datasets[4].pointColor = "#3c8dbc";


            var barChartOptions = {
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
                maintainAspectRatio: true,
                scaleLabel: function (value) {
                    var val = value.value;
                    if (val >= 10000000) val = (val / 10000000).toFixed(2) + ' Cr';
                    else if (val >= 100000) val = (val / 100000).toFixed(2) + ' Lac';
                    else if (val >= 0) val = (val / 1).toFixed(2) + ' %';
                    return val;
                }
            };

            barChartOptions.datasetFill = false;
            barChart.Bar(barChartData, barChartOptions);
}

function pieChartYearly(Dlabels, Ddata){
            var cdata = Ddata;
            var clabels = Dlabels;

            var PieData = [
              {
                  value: cdata[0],
                  color: "#f56954",
                  highlight: "#f56954",
                  label: clabels[0],

              },
              {
                  value: cdata[1],
                  color: "#00a65a",
                  highlight: "#00a65a",
                  label: clabels[1],

              },
              {
                  value: cdata[2],
                  color: "#f39c12",
                  highlight: "#f39c12",
                  label: clabels[2]
              },
              {
                  value: cdata[3],
                  color: "#00c0ef",
                  highlight: "#00c0ef",
                  label: clabels[3]
              },
              {
                  value: cdata[4],
                  color: "#3c8dbc",
                  highlight: "#3c8dbc",
                  label: clabels[4]
              }

            ];

            var pieOptions = {
                //Boolean - Whether we should show a stroke on each segment
                segmentShowStroke: true,
                //String - The colour of each segment stroke
                segmentStrokeColor: "#fff",
                //Number - The width of each segment stroke
                segmentStrokeWidth: 2,
                //Number - The percentage of the chart that we cut out of the middle
                percentageInnerCutout: 50, // This is 0 for Pie charts
                //Number - Amount of animation steps
                animationSteps: 100,
                //String - Animation easing effect
                animationEasing: "easeOutBounce",
                //Boolean - Whether we animate the rotation of the Doughnut
                animateRotate: true,
                //Boolean - Whether we animate scaling the Doughnut from the centre
                animateScale: false,
                //Boolean - whether to make the chart responsive to window resizing
                responsive: true,
                // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
                maintainAspectRatio: true,
                //String - A legend template
                percentageInnerCutout: 50


            };
            //var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
            var pieChartCanvas = document.getElementById("pieChart").getContext("2d");
            //var pieChart = new Chart(pieChartCanvas);
            var pieChartCanvas = new Chart(pieChartCanvas).Doughnut(PieData, pieOptions);
            //pieChart.Doughnut(PieData, pieOptions);
            document.getElementById('js-legend').innerHTML = pieChartCanvas.generateLegend();
}