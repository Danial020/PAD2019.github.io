var sessionmanager = sessionManager();


$(function () {

    //uitloggen
    if (sessionmanager.get("usercode")) {
        $("#inlogButton").css('display', 'none');
        $("#uitlogButton").css('display', 'block');
    } else {
        $("#inlogButton").css('display', 'block');
        $("#uitlogButton").css('display', 'none');
    }

    $("#uitlogButton").on("click", function () {
        sessionmanager.clear();
        location.href = "Index.html" ;
    });
});


function inlogCheckFavoriet() {
    if (sessionmanager.get("usercode")) {
        location.href = "favorieten.html";
    } else {
        location.href = "#inlogbox";
    }
}

function inlogCheckProfiel() {
    if (sessionmanager.get("usercode")) {
        location.href = "profiel.html";
    } else {
        location.href = "#inlogbox";
    }
}

function inlogCheckConnectGo() {
    if (sessionmanager.get("usercode")) {
        gegevensOphalen();
    } else {
        location.href = "#inlogbox";
    }
}



