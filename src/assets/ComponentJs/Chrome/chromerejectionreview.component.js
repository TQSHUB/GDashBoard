$(function () {

    //Date Picker
    $('#Date').datepicker({
        autoclose :true
    });

    $(".select2").select2();
});

function sum() {
            var txtPittingValue = document.getElementById('pitting').value;
            var txtPinHoleValue = document.getElementById('pinhole').value;
            var txtDentValue = document.getElementById('dent').value;
            var txtHandMouRejValue = document.getElementById('hndmngrej').value;
            var txtNicklShowValue = document.getElementById('ncklshwg').value;
            var txtPatchMarksValue = document.getElementById('ptchmrks').value;
            var txtScratchMarksValue = document.getElementById('scrtchmrks').value;
            var txtRoughnessValue = document.getElementById('rghns').value;
            var txtCrBurnValue = document.getElementById('crburn').value;
            var txtOtherValue = document.getElementById('othr').value;
            var txtSilverMarksValue = document.getElementById('slvrmrks').value;
            var txtMouldngRejValue = document.getElementById('mldngrej').value;
            var txtSkipPlatingValue = document.getElementById('skpltng').value;
            var txtCoprBrngValue = document.getElementById('cprbrng').value;
            var txtWarPageValue = document.getElementById('warpg').value;
            var txtWhtMarkValue = document.getElementById('whtmrk').value;
            var txtDotPlastcValue = document.getElementById('dotplstc').value;
            var txtWaterMarkValue = document.getElementById('wtrmrk').value;
            var txtBlisterValue = document.getElementById('blstr').value;
            var txtJigDmgValue = document.getElementById('jigdmg').value;
            var txtRemarkValue = document.getElementById('rmrk').value;

            var result = parseInt(txtPittingValue) + parseInt(txtPinHoleValue) + parseInt(txtDentValue)
                        + parseInt(txtHandMouRejValue) + parseInt(txtNicklShowValue) + parseInt(txtPatchMarksValue)
                        + parseInt(txtScratchMarksValue) + parseInt(txtRoughnessValue) + parseInt(txtCrBurnValue)
                        + parseInt(txtOtherValue) + parseInt(txtSilverMarksValue) + parseInt(txtMouldngRejValue)
                        + parseInt(txtSkipPlatingValue) + parseInt(txtCoprBrngValue) + parseInt(txtWarPageValue)
                        + parseInt(txtWhtMarkValue) + parseInt(txtDotPlastcValue) + parseInt(txtWaterMarkValue)
                        + parseInt(txtBlisterValue) + parseInt(txtJigDmgValue) + parseInt(txtRemarkValue);
            if (!isNaN(result)) {
                document.getElementById('rejqty').value = result;
            };
        }