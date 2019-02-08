function berichtOpenen(){
    location.href = "MessageSturen.html";
}


$(function () {

    var usercode = sessionmanager.get("usercode");
    var usercodeMatch = sessionmanager.get("match");


    databaseManager.query("SELECT * FROM Account WHERE usercode = ?",
        [usercodeMatch])
        .done(function (data) {

            var introductie = data[0].introductie;
            document.getElementById("introductieTekstSpecifiek").innerHTML = introductie;
            var voornaam = data[0].voornaam;
            document.getElementById("voornaamSpecifiek").innerHTML = voornaam;
            var achternaam = data[0].achternaam;
            document.getElementById("achternaamSpecifiek").innerHTML = achternaam;
            var geslacht = data[0].geslacht;
            document.getElementById("geslachtSpecifiek").innerHTML = geslacht;
            var geboortedatum = data[0].geboortedatum;
            document.getElementById("geboortedatumSpecifiek").innerHTML = geboortedatum;
            var mobiel = data[0].mobiel;
            document.getElementById("mobielSpecifiek").innerHTML = mobiel;
            var woonplaats = data[0].woonplaats;
            document.getElementById("woonplaatsSpecifiek").innerHTML = woonplaats;
            var nationaliteit = data[0].nationaliteit;
            document.getElementById("nationaliteitSpecifiek").innerHTML = nationaliteit;
            var foto = data[0].foto;
            document.getElementById("profielFotoSpecifiek").src = foto;


        });


    $("#favorietenButtonSpecifiek").on("click", function () {

        databaseManager.query("SELECT * FROM favoriet WHERE usercode = ? and idFavoriet = ?",
            [usercode, usercodeMatch])
            .done(function (data) {

                if (data.length === 0) {
                    databaseManager.query("INSERT INTO favoriet (idFavoriet, usercode) VALUES(?,?)",
                        [usercodeMatch, usercode])
                        .done(function () {
                            alert("Gelukt!");
                        });
                }
                else {
                    alert("U heeft deze persoon al in uw favorieten");
                }
            });
    });

});
