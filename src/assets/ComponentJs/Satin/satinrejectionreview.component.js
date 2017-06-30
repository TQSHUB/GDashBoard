$(function () {

    //Date Picker
    $('#Date').datepicker({
        autoclose :true
    });

    $(".select2").select2();
});

function sumsatin() {
            var txtPinHoleValue = document.getElementById('pinhole').value;
            var txtSkipPlatingValue = document.getElementById('skpltng').value;
            var txtPrcsMouRejValue = document.getElementById('prcsmourej').value;
            var txtHandMouRejValue = document.getElementById('hndmngrej').value;
            var txtWhtMarkValue = document.getElementById('whtmrk').value;
            var txtPinMarksValue = document.getElementById('pinmrks').value;
            var txtWarPageValue = document.getElementById('warpg').value;
            var txtSilverMarksValue = document.getElementById('slvrmrk').value;
            var txtDotPlastcValue = document.getElementById('dotplstc').value;
            var txtChromBurningValue = document.getElementById('chrmbrng').value;
            var txtDentMarksValue = document.getElementById('dntmrks').value;
            var txtScratchesValue = document.getElementById('scrtchs').value;
            var txtCopperBurningValue = document.getElementById('cprbrng').value;
            var txtJigDmgValue = document.getElementById('jigdmg').value;
            var txtHighGlossValue = document.getElementById('hghgls').value;
            var txtLowGlossValue = document.getElementById('lowgls').value;
            var txtShadeVariationValue = document.getElementById('shdvrtn').value;
            var txtPatchMarksValue = document.getElementById('ptchmrk').value;
            var txtNickelValue = document.getElementById('nickl').value;
            var txtRoughnessValue = document.getElementById('rghns').value;
            var txtBlisterValue = document.getElementById('blstr').value;
            var txtBlackSpotValue = document.getElementById('blckspot').value;
            var txtSatinMarkValue = document.getElementById('satnmrk').value;
            var txtChemicalMarkValue = document.getElementById('chmclmrk').value;
            var txtTouchBurningValue = document.getElementById('tchbrng').value;
            var txtOtherValue = document.getElementById('othr').value;
            var txtWaterMarkValue = document.getElementById('wtrmrk').value;
            var txtRemarkValue = document.getElementById('rmrk').value;

            var result = parseInt(txtPinHoleValue) + parseInt(txtSkipPlatingValue) + parseInt(txtPrcsMouRejValue)
                        + parseInt(txtHandMouRejValue) + parseInt(txtWhtMarkValue) + parseInt(txtPinMarksValue)
                        + parseInt(txtWarPageValue) + parseInt(txtSilverMarksValue) + parseInt(txtDotPlastcValue)
                        + parseInt(txtChromBurningValue) + parseInt(txtDentMarksValue) + parseInt(txtScratchesValue)
                        + parseInt(txtCopperBurningValue) + parseInt(txtJigDmgValue) + parseInt(txtHighGlossValue)
                        + parseInt(txtLowGlossValue) + parseInt(txtShadeVariationValue) + parseInt(txtPatchMarksValue)
                        + parseInt(txtNickelValue) + parseInt(txtRoughnessValue) + parseInt(txtBlisterValue)
                        + parseInt(txtBlackSpotValue) + parseInt(txtSatinMarkValue) + parseInt(txtChemicalMarkValue)
                        + parseInt(txtTouchBurningValue) + parseInt(txtOtherValue) + parseInt(txtWaterMarkValue)
                        + parseInt(txtRemarkValue);
            if (!isNaN(result)) {
                document.getElementById('rejqty').value = result;
            };
        }