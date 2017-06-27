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