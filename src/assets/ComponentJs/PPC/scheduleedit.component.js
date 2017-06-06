$(function () {
    //Date picker
    $('#FromDate').datepicker({
      format: 'dd/mm/yyyy',
      autoclose: true
    });
    $('#ToDate').datepicker({
      format: 'dd/mm/yyyy',
      autoclose: true
    });
    //Initialize Select2 Elements
    $(".select2").select2();
});

function ETE(data){
  $("#dvjson").excelexportjs({
                    containerid: "dvjson"
                       , datatype: 'json'
                       , dataset: data
                       , columns: getColumns(data)  
                });
}
