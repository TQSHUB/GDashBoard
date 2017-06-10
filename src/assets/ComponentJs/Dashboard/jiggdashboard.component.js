function Canvasjigg(Mdesignlabels, Mnewdata, Mdesigndata, Mrepairdata, Mscrapedata){
          var jdLabels = Mdesignlabels;
          var jdData1 = Mnewdata;
          var jdData2 = Mdesigndata;
          var jdData3 = Mrepairdata;
          var jdData4 = Mscrapedata;
       
          Chart.defaults.global.legend.display = false;
          var chartJIggmfgData = {
              labels: jdLabels,
              datasets: [{
                  label: "New",
                  type: 'bar',
                  backgroundColor: "#3c8dbc",
                  data: jdData1
              }, {
                  label: "Design",
                  type: 'bar',

                  backgroundColor: "#00a65a",
                  data: jdData2,

              }, {
                  label: "Repair",
                  type: 'bar',
                  backgroundColor: "#f39c12",
                  data: jdData3
              },
                  {
                      label: "Scrape",
                      type: 'bar',
                      backgroundColor: "#f56954",
                      data: jdData4
                  }
                  
              ]

          };

          var ctx2 = document.getElementById("Canvasjigg").getContext("2d");
              var opt2 = {
                  responsive: true,
                  maintainAspectRatio: false
              }
              window.myBarChart = new Chart(ctx2, {
                  type: 'bar',
                  options: opt2,
                  data: chartJIggmfgData
              });
}

function cvsrvsr(Mdesignlabels, Mrepairdata, Mrectifydata){
        var jiggLabels = Mdesignlabels;
        var jiggrepair = Mrepairdata;
        var jiggrectify = Mrectifydata;

        var chartDatarectify = {
            labels: jiggLabels,
            datasets: [{
                label: "Total Repair.",
                type: 'bar',
                backgroundColor: "#3c8dbc",
                data: jiggrepair
            }, {

                label: "Total Rectify.",
                type: 'bar',
                backgroundColor: "#f39c12",
                data: jiggrectify
            }
            ]

        };

          var ctx4 = document.getElementById("cvsrvsr").getContext("2d");
              var opt4 = {
                  responsive: true,
                  maintainAspectRatio: false
              }
              window.myBarChart = new Chart(ctx4, {
                  type: 'bar',
                  options: opt4,
                  data: chartDatarectify
              });
}

function cvsRJigg(CPlabels, CPdata, CHRdata){
        var djLabels = CPlabels;
        var djData1 = CPdata;
        var djData2 = CHRdata;

        var chartRoundjigg = {
            labels: djLabels,
            datasets: [{
                label: "Total Jigg",
                type: 'bar',
                backgroundColor: "#00a65a",
                data: djData1
            }, {

                label: "Total Chrome Prod.",
                type: 'bar',
                backgroundColor: "#3c8dbc",
                data: djData2
            }
            ]

        };

          var ctx3 = document.getElementById("cvsRJigg").getContext("2d");
              var opt3 = {
                  responsive: true,
                  maintainAspectRatio: false
              }
              window.myBarChart = new Chart(ctx3, {
                  type: 'bar',
                  options: opt3,
                  data: chartRoundjigg
              });
}

function cvsRJigg2(CPlabelsSatin, CPdataSatin, SRdata){
        var djLabels = CPlabelsSatin;
        var djData1 = CPdataSatin;
        var djData2 = SRdata;

        var chartRoundjigg2 = {
            labels: djLabels,
            datasets: [{
                label: "Total Jigg",
                type: 'bar',
                backgroundColor: "#00a65a",
                data: djData1
            }, {

                label: "Total Satin Prod.",
                type: 'bar',
                backgroundColor: "#f39c12",
                data: djData2
            }
            ]

        };

          var ctx3 = document.getElementById("cvsRJigg2").getContext("2d");
              var opt3 = {
                  responsive: true,
                  maintainAspectRatio: false
              }
              window.myBarChart = new Chart(ctx3, {
                  type: 'bar',
                  options: opt3,
                  data: chartRoundjigg2
              });
}

function cvsjigguse(CRlabels, CRdata){
        var djLabels = CRlabels;
          var djData1 = CRdata;

          var chartDatajigg = {
              labels: djLabels,
              datasets: [{
                  type: 'bar',
                  backgroundColor: "#3c8dbc",
                  data: djData1
              } 
              ]

          };


          var ctx1 = document.getElementById("cvsjigguse").getContext("2d");
          var opt3 = {
                  responsive: true,
                  maintainAspectRatio: false
              }
              window.myBarChart = new Chart(ctx1, {
                  type: 'bar',  
                  options: opt3,
                  data: chartDatajigg
        });
}