function ETEJson(data){
  $("#dvjson").excelexportjs({
                    containerid: "dvjson"
                       , datatype: 'json'
                       , dataset: data
                       , columns: getColumns(data)     
                });
}


function ETE(){
  $("#myTableHidden").excelexportjs({
            containerid: "myTableHidden"
            , datatype: 'table'
        });
}
