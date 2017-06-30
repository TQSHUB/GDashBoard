function ETEJson(data){
  $("#dvjson").excelexportjs({
                    containerid: "dvjson"
                       , datatype: 'json'
                       , dataset: data
                       , columns: getColumns(data)     
                });
}


/*function ETE(){
  $("#myTableHidden").excelexportjs({
            containerid: "myTableHidden"
            , datatype: 'table'
        });
}*/


function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (20 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

deleteCcookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

function checkCookie(cname) {
    var user = getCookie(cname);
    if (user != "") {
        //alert("Welcome again " + user);
        return true;
    } 
    else
    {
        return false;
    }
    /*else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user);
        }
    }*/
}

/*function fnExcelReport() {
  var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
  tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
  tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';
  tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
  tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
  tab_text = tab_text + "<table border='1px'>";
  var exportTable = $('#myTableHidden').clone();
  exportTable.find('input').each(function (index, elem) { $(elem).remove(); });
  tab_text = tab_text + exportTable.html();
  tab_text = tab_text + '</table></body></html>';
  var fileName = 'abcTest_' + parseInt(Math.random() * 10000000000) + '.xls';

  //Save the file
  var blob = new Blob([tab_text], { type: "application/vnd.ms-excel;charset=utf-8" })
  window.saveAs(blob, fileName);
}*/

function ETE(fileName){
     //sa = true;
     var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
     tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
     tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';
     tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
     tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
     tab_text = tab_text + "<table>";
     var table = $('#myTableHidden').clone();
     tab_text = tab_text + table.html();
     tab_text = tab_text + '</table></body></html>';
     var myBlob =  new Blob( [tab_text] , {type:'text/html'});
     var url = window.URL.createObjectURL(myBlob);
     var a = document.createElement("a");
     document.body.appendChild(a);
     a.href = url;
     a.download = fileName;
     a.click();
     setTimeout(function() {window.URL.revokeObjectURL(url);},0);
    
    //return (sa);
}


/*function EtoE(){
    $(document).ready(function() {
    //getting data from our table
    var data_type = 'data:application/vnd.ms-excel';
    var table_div = document.getElementById('table_wrapper');
    var table_html = table_div.outerHTML.replace(/ /g, '%20');

    var a = document.createElement('a');
    a.href = data_type + ', ' + table_html;
    a.download = 'exported_table_' + Math.floor((Math.random() * 9999999) + 1000000) + '.xls';
    a.click();
});
}*/

