$(function () {
    //Date picker
    $('#FromDate').datepicker({
      autoclose: true
    });
    $('#ToDate').datepicker({
      autoclose: true
    });
    //Initialize Select2 Elements
    $(".select2").select2();
});
