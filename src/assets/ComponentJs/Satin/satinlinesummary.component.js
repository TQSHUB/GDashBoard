$(function () {
    //Date picker
    $('#FromDate').datepicker({
      format: 'dd/mm/yyyy',
      autoclose: true
    }).datepicker("setDate", new Date());
    $('#ToDate').datepicker({
      format: 'dd/mm/yyyy',
      autoclose: true
    }).datepicker("setDate", new Date());
    //Initialize Select2 Elements
    $(".select2").select2();
    
    
});
   

  
