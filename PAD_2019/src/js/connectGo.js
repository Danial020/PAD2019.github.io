function gegevensOphalen() {

    var usercode = sessionmanager.get("usercode");


    //criteria inlezen en opslaan
    var leeftijd = $("#kiesleeftijd").val();
    var geslacht = $("#kiesGeslacht").val();
    var vertrekDatum = $("#vertrekDatum").val();
    var bestemming = $("#bestemming").val();

    if (geslacht === "man") {
        geslacht = 'm';
    }
    if (geslacht === "vrouw") {
        geslacht = 'v';
    }
    if (geslacht === "anders") {
        geslacht = 'a';
    }


    var aantalInteresses = 24;

    //Maak array aan voor interesses die zijn aangevinkt of niet
    var InteresseChecked = new Array(aantalInteresses);

    //Maak array aan voor De aangevinkte Interesses met hun waarde
    var Interesses = new Array();


    var Matches = new Array();


    for (var i = 0, j = 0; i < InteresseChecked.length; i++) {
        var id = "check" + (i + 1);

        InteresseChecked[i] = $('#' + id).is(":checked");

        if (InteresseChecked[i] === true) {
            Interesses[j] = i + 1;

            //Matchen(Interesses[j]);

            databaseManager.query(
                "SELECT interesseaccount.usercode FROM interesseaccount INNER JOIN accountbestemming ON interesseaccount.usercode = accountbestemming.usercode INNER JOIN account ON interesseaccount.usercode = account.usercode WHERE interesseaccount.idInteresse = ? and accountbestemming.idBestemming = ? and account.leeftijd >= ? and account.geslacht = ?",
                [Interesses[j], bestemming, leeftijd, geslacht]
            ).done(function (data) {

                for (var i = 0; i < data.length; i++) {

                    var usercodeMatch = data[i].usercode;

                    if (Matches.indexOf(usercodeMatch) === -1) {

                        if (usercodeMatch != usercode){

                            Matches.push(usercodeMatch);
                        }
                    }
                }
            });

            j++;
        }
    }


    setTimeout(function () {
        gegevensInladen(Matches);
    }, 150);
}


function gegevensInladen(matches) {


    if (matches.length > 0) {

        Matches(matches);

        window.scrollBy(0, 620);
    }
    else {
        alert("You have no matches");
    }

}


function Matches(matches) {


    var connectGo = document.getElementById("ConnectGo");

    var k = 0;
    var row;

    var matchesDiv = document.createElement('div');
    matchesDiv.className = "matchesDiv";
    matchesDiv.setAttribute("id", "row" + k);

    connectGo.appendChild(matchesDiv);

    for (var i = 0, j = 0; i < matches.length; i++) {

        row = "row" + j;

        if (i % 3 === 0 && i != 0) {


            setTimeout(function () {
                i = i - 1;

                BugFixer(i);
            }, 500);

            function BugFixer(i) {

                j++;

                var matchesDiv = document.createElement('div');
                matchesDiv.className = "matchesDiv";
                matchesDiv.setAttribute("id", "row" + j);

                connectGo.appendChild(matchesDiv);


                row = "row" + j;


                databaseManager.query("SELECT voornaam, achternaam, leeftijd, geslacht, usercode, foto FROM account WHERE usercode = ?",
                    [matches[i]])
                    .done(function (data) {



                        //div maken
                        var match = document.createElement('div');
                        match.className = "match";
                        match.setAttribute("onclick", "PersoonSpecifiek(" + data[0].usercode + ")");
                        match.setAttribute("id", "match");

                        document.getElementById(row).appendChild(match);


                        //foto weergeven
                        var foto = document.createElement('img');
                        foto.src = data[0].foto;
                        foto.className = "matchFoto";

                        match.appendChild(foto);


                        //div voor gegevens maken
                        var gegevens = document.createElement('div');
                        gegevens.className = "matchGegevens";

                        match.appendChild(gegevens);


                        //voornaam weergeven
                        var voornaam = document.createElement('p');
                        voornaam.innerHTML = data[0].voornaam;
                        voornaam.className = "matchVoornaam";

                        gegevens.appendChild(voornaam);


                        //leeftijd weergeven
                        var leeftijd = document.createElement('p');
                        leeftijd.innerHTML = data[0].leeftijd;
                        leeftijd.className = "matchLeeftijd";

                        gegevens.appendChild(leeftijd);


                        //geslacht weergeven
                        var geslacht = document.createElement('p');
                        if (data[0].geslacht === "m") {
                            geslacht.innerHTML = "Man";
                        }
                        else if (data[0].geslacht === "v") {
                            geslacht.innerHTML = "Vrouw";
                        }
                        else {
                            geslacht.innerHTML = "Anders";
                        }
                        geslacht.className = "matchGeslacht";

                        gegevens.appendChild(geslacht);

                    });

            }
        }
        else {

            databaseManager.query("SELECT voornaam, achternaam, leeftijd, geslacht, usercode, foto FROM account WHERE usercode = ?",
                [matches[i]])
                .done(function (data) {

                    //div maken
                    var match = document.createElement('div');
                    match.className = "match";
                    match.setAttribute("onclick", "PersoonSpecifiek(" + data[0].usercode + ")");
                    match.setAttribute("id", "match");

                    document.getElementById(row).appendChild(match);


                    //foto weergeven
                    var foto = document.createElement('img');
                    foto.src = data[0].foto;
                    foto.className = "matchFoto";

                    match.appendChild(foto);


                    //div voor gegevens maken
                    var gegevens = document.createElement('div');
                    gegevens.className = "matchGegevens";

                    match.appendChild(gegevens);


                    //voornaam weergeven
                    var voornaam = document.createElement('p');
                    voornaam.innerHTML = data[0].voornaam;
                    voornaam.className = "matchVoornaam";

                    gegevens.appendChild(voornaam);


                    //leeftijd weergeven
                    var leeftijd = document.createElement('p');
                    leeftijd.innerHTML = data[0].leeftijd;
                    leeftijd.className = "matchLeeftijd";

                    gegevens.appendChild(leeftijd);


                    //geslacht weergeven
                    var geslacht = document.createElement('p');
                    if (data[0].geslacht === "m") {
                        geslacht.innerHTML = "Man";
                    }
                    else if (data[0].geslacht === "v") {
                        geslacht.innerHTML = "Vrouw";
                    }
                    else {
                        geslacht.innerHTML = "Anders";
                    }
                    geslacht.className = "matchGeslacht";

                    gegevens.appendChild(geslacht);

                });
        }
    }

}


function PersoonSpecifiek(usercode) {

    sessionmanager.set("match", usercode);
    location.href = "PersoonSpecifiek.html";
}



