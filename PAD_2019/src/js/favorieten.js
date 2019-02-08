$(function () {

    var Article = document.getElementById("article1");
    var usercode = sessionmanager.get("usercode");




    databaseManager.query("SELECT * FROM favoriet WHERE usercode = ?",
        [usercode])
        .done(function (favorieten) {


            if (favorieten.length === 0) {
                alert("You have no favourites");

            }
            else {

                var k = 0;
                var row;

                var matchesDiv = document.createElement('div');
                matchesDiv.className = "matchesDiv";
                matchesDiv.setAttribute("id", "row" + k);

                Article.appendChild(matchesDiv);


                for (var i = 0, j = 0; i < favorieten.length; i++) {


                    row = "row" + j;

                    if (i % 3 === 0 && i != 0) {

                        setTimeout(function() {
                            i = i - 1;

                            BugFixer(i);
                        }, 1000);

                        function BugFixer(i){

                            j++;

                            var matchesDiv = document.createElement('div');
                            matchesDiv.className = "row";
                            matchesDiv.setAttribute("id", "row" + j);

                            Article.appendChild(matchesDiv);

                            row = "row" + j;

                            databaseManager.query("SELECT * FROM account WHERE usercode = ?",
                                [favorieten[i].idFavoriet])
                                .done(function (data) {


                                    //div maken
                                    var match = document.createElement('div');
                                    match.className = "column";

                                    document.getElementById(row).appendChild(match);


                                    //foto weergeven
                                    var foto = document.createElement('img');
                                    foto.src = data[0].foto;
                                    foto.className = "resize";

                                    match.appendChild(foto);


                                    //voornaam + achternaam weergeven
                                    var voornaam = document.createElement('h5');
                                    voornaam.innerHTML = data[0].voornaam + " " + data[0].achternaam;
                                    voornaam.className = "center-text-in-div";

                                    match.appendChild(voornaam);

                                    //Woonplaats weergeven
                                    var woonplaats = document.createElement('h5');
                                    woonplaats.innerHTML = data[0].woonplaats;
                                    woonplaats.className = "center-text-in-div";

                                    match.appendChild(woonplaats);

                                    //View profile button
                                    var button1 = document.createElement('button');
                                    button1. innerHTML = "Ga naar profiel";
                                    button1.setAttribute("onclick", "PersoonSpecifiek(" + data[0].usercode + "," + usercode + ")");
                                    button1.className = "button";

                                    match.appendChild(button1);


                                    //verwijder button maken
                                    var button2 = document.createElement('button');
                                    button2.innerHTML = "Verwijderen uit favorieten";
                                    button2.setAttribute("onclick", "favorietVerwijderen(" + data[0].usercode + "," + usercode + ")");
                                    button2.className = "button";

                                    match.appendChild(button2);

                                });


                        }

                    }
                    else {

                        databaseManager.query("SELECT * FROM account WHERE usercode = ?",
                            [favorieten[i].idFavoriet])
                            .done(function (data) {


                                //div maken
                                var match = document.createElement('div');
                                match.className = "column";

                                document.getElementById(row).appendChild(match);


                                //foto weergeven
                                var foto = document.createElement('img');
                                foto.src = data[0].foto;
                                foto.className = "resize";

                                match.appendChild(foto);


                                //voornaam + achternaam weergeven
                                var voornaam = document.createElement('h5');
                                voornaam.innerHTML = data[0].voornaam + " " + data[0].achternaam;
                                voornaam.className = "center-text-in-div";

                                match.appendChild(voornaam);

                                //Woonplaats weergeven
                                var woonplaats = document.createElement('h5');
                                woonplaats.innerHTML = data[0].woonplaats;
                                woonplaats.className = "center-text-in-div";

                                match.appendChild(woonplaats);

                                //View profile button
                                var button1 = document.createElement('button');
                                button1. innerHTML = "Ga naar profiel";
                                button1.setAttribute("onclick", "PersoonSpecifiek(" + data[0].usercode + "," + usercode + ")");
                                button1.className = "button";

                                match.appendChild(button1);


                                //verwijder button maken
                                var button2 = document.createElement('button');
                                button2.innerHTML = "Verwijderen uit favorieten";
                                button2.setAttribute("onclick", "favorietVerwijderen(" + data[0].usercode + "," +  usercode + ")");
                                button2.className = "button";

                                match.appendChild(button2);

                            });

                    }

                }

            }

        });


});


function PersoonSpecifiek(persoon) {

    sessionmanager.set("match", persoon);
    location.href = "PersoonSpecifiek.html";
}


function favorietVerwijderen(idFavoriet , usercode) {



    databaseManager.query(
        "DELETE FROM favoriet WHERE idFavoriet = ? AND usercode = ?",
        [idFavoriet, usercode])
        .done(function(){

            alert("Gelukt");
            location.href = "favorieten.html";
    });


}