var databaseManager = databaseManager();
var sessionmanager = sessionManager();

databaseManager.connect("https://db.fys-hva.tk/");
databaseManager.authenticate("Ttqgb3TREtM5QiEz");

function login(){
    username = $("#username").val();
    wachtwoord = $("#password").val();

    databaseManager.query(
        "SELECT idAdmin FROM admin WHERE gebruikersnaam = ? AND wachtwoord = SHA1(?)",
        [username, wachtwoord]
    ).done(function (data) {
        if (data.length > 0) {

            //session maken
            username = JSON.stringify(data[0].idAdmin);
            sessionmanager.set("idAdmin", username);
            location.href = "home.html";

        }
        else {
            alert("Check je gegevens!");
        }
    });
    return false;
};

function uitloggen(){
     sessionmanager.clear();
     location.href = "index.html" ;
     console.log("test")
};





function inlogCheckHome() {
    if (sessionmanager.get("idAdmin")) {
        location.href = "index.html";
    } else {
        location.href = "#inlogbox";
    }
}

function inlogCheckAccount() {
    if (sessionmanager.get("idAdmin")) {
        location.href = "account.html";
    } else {
        location.href = "index.html";
    }
}

function inlogCheckBestemming() {
    if (sessionmanager.get("idAdmin")) {
        location.href = "bestemming.html";
    } else {
        location.href = "index.html";
    }
}

function inlogCheckCriteria() {
    if (sessionmanager.get("idAdmin")) {
        location.href = "criteria.html";
    } else {
        location.href = "index.html";
    }
}

function inlogCheckEditReview() {
    if (sessionmanager.get("idAdmin")) {
        location.href = "review.html";
    } else {
        location.href = "index.html";
    }
}


//----------------------------------------------------Begin_admin_functions--------------------------------------------\\
//Intresse_Functies
//Toevoegen intresse
function toevoegenIntresse() {
    $("#add").on("click", function () {
        var toevoegen = $("#toevoegenintresse").val();

        databaseManager.query("INSERT INTO interesse (naam) VALUES (?)", [toevoegen])
            .done(function (data) {
                console.log(data);
                alert("Gelukt!");
                window.location.reload(false);
            });
        return false;
    });
}

//Intresse verwijderen
function verwijderInteresse(verwijderen){
    var verwijder = verwijderen;

    databaseManager.query("DELETE FROM interesse WHERE idInteresse=?;",[verwijder])
        .done(function (data) {
            console.log(data);
            alert("Gelukt!");
            window.location.reload(false);

        });
    return false;
};
//End_Intresse_Functies


function toevoegenBestemming() {
    $("#addbestemming").on("click", function () {
        var toevoegen = $("#toevoegenbestemming").val();

        databaseManager.query("INSERT INTO bestemming (naamBestemming) VALUES (?)", [toevoegen])
            .done(function (data) {
                console.log(data);
                alert("Gelukt!");
                window.location.reload(false);
            });
        return false;
    });
}

function verwijderBestemming(verwijderen){
    var verwijder = verwijderen;

    databaseManager.query("DELETE FROM bestemming WHERE idBestemming=?;",[verwijder])
        .done(function (data) {
            console.log(data);
            alert("Gelukt!");
            window.location.reload(false);

        });
    return false;
};

//Account_Functies
//navigeer naar  edit-account
function editAccount(cookie){
    var edit = cookie;
    localStorage.setItem("storageName",edit);
    window.location.href = 'edit-account.html';

    databaseManager.query("SELECT * FROM Account WHERE usercode=?",[edit]).done(function (data) {
    });
    return false;
};

//opslaan van de gegevens
function saveAccount() {
        var test = localStorage.getItem("storageName");

        var voornaam = $("#voornaam").val();
        var achternaam = $("#achternaam").val();
        var geslacht = $("#geslacht").val();
        var geboortedatum = $("#geboortedatum").val();
        var mobiel = $("#mobiel").val();
        var woonplaats = $("#woonplaats").val();
        var nationaliteit = $("#nationaliteit").val();
        var email = $("#email").val();
        var introductie = $("#introductie").val();
        var usercode = test;

        console.log(test);

        console.log(voornaam);
        console.log(achternaam);
        console.log(geslacht);
        console.log(geboortedatum);
        console.log(mobiel);
        console.log(woonplaats);
        console.log(nationaliteit);
        console.log(email);
        console.log(introductie);

        databaseManager.query("UPDATE Account SET voornaam=?,achternaam=?,geslacht=?,geboortedatum=?,mobiel=?,woonplaats=?,nationaliteit=?,email=?,introductie=? WHERE usercode=?",
            [voornaam, achternaam, geslacht, geboortedatum, mobiel, woonplaats, nationaliteit, email, introductie, usercode])
            .done(function (data) {
                console.log(data);
                alert("Gelukt!");
                window.location.href = 'account.html';

            });
        return false;
};
//End_Account_Functies


//Review_Functies
//verwijderen review
function verwijderReview(verwijderen) {
        var verwijder = verwijderen

    databaseManager.query("DELETE FROM Review WHERE idreview=?;", [verwijder])
            .done(function (data) {
                console.log(data);
                alert("Gelukt!");
                window.location.reload(false);

            });
        return false;
};
//End_Review_Functies
//----------------------------------------------------End_admin_functions----------------------------------------------\\