
// var databaseManager = databaseManager();
// databaseManager.connect("https://db.fys-hva.tk/");
// databaseManager.authenticate("Ttqgb3TREtM5QiEz");
// const Buffer = require("buffer");



$(function () {
    var usercode = sessionmanager.get("usercode");
    // console.log("usercode is: " + usercode);
    // data stoppen in velden
    databaseManager.query("SELECT * FROM Account WHERE usercode = ?",
        [usercode])
        .done(function (data) {
            // query ging goed.
            // data teruggekregen (wel natuurlijk als er wat in zit of anders gwn leeg)
            var introductie = data[0].introductie;
            var voornaam = data[0].voornaam;
            var achternaam = data[0].achternaam;
            var geslacht = data[0].geslacht;
            var geboortedatum = data[0].geboortedatum;
            geboortedatum = geboortedatum.split("T");
            var mobiel = data[0].mobiel;
            var woonplaats = data[0].woonplaats;
            var nationaliteit = data[0].nationaliteit;
            var foto = data[0].foto;

            //HACK: Remove comma's
            if(foto) {
                var indexComma = foto.indexOf(",");
                var newFoto1 = foto.substring(0, indexComma);
                var newFoto2 = foto.substring(indexComma).replace(new RegExp(",", "g"), "");
                foto = newFoto1 + "," + newFoto2;
            }

            $('#Introductie').val(introductie);
            $('#Voornaam').val(voornaam);
            $('#anaam').val(achternaam);
            $('#Geboortedatum').val(geboortedatum[0]);
            $("input[name=geslacht1][value='" + geslacht + "']").prop("checked", true);
            $('#Telnummer').val(mobiel);
            $('#Woonplaats').val(woonplaats);
            $('#Nationaliteit').val(nationaliteit);
            $('#profiel_foto').attr("src", foto);



            databaseManager.query("SELECT * FROM interesseaccount WHERE usercode = ?",
                [usercode])
                .done(function (data) {

                    for (var i = 0; i < data.length; i++) {
                        var opgehaaldeInteresses = JSON.stringify(data[i].idInteresse)

                        $('#check' + opgehaaldeInteresses).prop("checked", true);
                    }
                });


            databaseManager.query("SELECT * FROM accountbestemming WHERE usercode = ?",
                [usercode])
                .done(function (data) {
                    if (data.length == 0) {
                        return false;
                    }

                    var idBestemming = data[0].idBestemming;
                    var vertrekDatum = data[0].beginDatum;
                    vertrekDatum = vertrekDatum.split("T");

                    $('#bestemming').val(idBestemming);
                    $('#datumVertrekken').val(vertrekDatum[0]);
                });

            $("#saveButton").on("click", function () {
                console.log("click");

                var introductie = $("#Introductie").val();
                var voornaam = $("#Voornaam").val();
                var achternaam = $("#anaam").val();
                var geboortedatum = $("#Geboortedatum").val();
                var mobiel = $("#Telnummer").val();
                var woonplaats = $("#Woonplaats").val();
                var nationaliteit = $("#Nationaliteit").val();
                var geslacht = $("input[name='geslacht1']:checked").val();
                var leeftijd = getAge(geboortedatum);
                var idBestemming = $("#bestemming").val();
                var vertrekDatum = $("#datumVertrekken").val();
                var foto = $("#profiel_foto").attr('src');



                var aantalInteresses = 24;

                //Maak array aan voor interesses die zijn aangevinkt of niet
                var InteresseChecked = new Array(aantalInteresses);

                //Maak array aan voor De aangevinkte Interesses met hun waarde
                var Interesses = new Array(aantalInteresses);

                //Maak array aan voor de onaangevinkte Interesses met hun waarde
                var InteressesFalse = new Array(aantalInteresses);


                /*For loop die door alle checkboxes gaat om te kijken of ze
                  aangevinkt zijn of niet. Dan wordt "InteresseControleren" aangeroepen.
                 */
                for (var i = 0; i < InteresseChecked.length; i++) {
                    var id = "check" + (i + 1);

                    InteresseChecked[i] = $('#' + id).is(":checked");

                    if (InteresseChecked[i] === true) {
                        Interesses[i] = i + 1;
                        interessesControlerenTrue(Interesses[i], usercode);
                    }
                    if (InteresseChecked[i] === false) {
                        InteressesFalse[i] = i + 1;
                        interessesControlerenFalse(InteressesFalse[i], usercode);

                    }
                }


                databaseManager.query("SELECT * FROM accountbestemming WHERE usercode = ?",
                    [usercode])
                    .done(function (data) {

                        if (data.length === 0) {
                            bestemmingInvoeren(idBestemming, vertrekDatum, usercode);
                        }
                        else {
                            bestemmingUpdaten(idBestemming, vertrekDatum, usercode);
                        }
                    });

                databaseManager.query(
                    "UPDATE Account SET foto = ?, introductie = ?, voornaam = ? ,achternaam = ?, geslacht = ?, mobiel = ?, woonplaats = ? ,nationaliteit = ?, geboortedatum = ?, leeftijd = ?  WHERE usercode = ?",
                    [foto, introductie, voornaam, achternaam, geslacht, mobiel, woonplaats, nationaliteit, geboortedatum, leeftijd, usercode])
                    .done(function (data) {
                        console.log(data);
                        alert("Gelukt!");
                        window.location.reload(false);
                    });
            });
        });

// Functies voor Interesses
    function interessesControlerenTrue(idInteresse, usercode) {

        //Controleert of een bepaalde waarde interesseaccount al bestaat of niet.
        databaseManager.query("SELECT * FROM interesseaccount WHERE usercode = ? and idInteresse = ?",
            [usercode, idInteresse])
            .done(function (data) {

                if (data.length === 0) {

                    interessesInvoeren(idInteresse, usercode);
                }
            });
    }

    function interessesControlerenFalse(idInteresse, usercode) {


        //Controleert of een bepaalde waarde interesseaccount al bestaat of niet.
        databaseManager.query("SELECT * FROM interesseaccount WHERE usercode = ? and idInteresse = ?",
            [usercode, idInteresse])
            .done(function (data) {

                if (data.length !== 0) {
                    interessesVerwijderen(idInteresse, usercode);
                }
            });
    }


    function interessesInvoeren(idInteresse, usercode) {

        databaseManager.query(
            "INSERT INTO interesseaccount (idInteresse, usercode) VALUES (?,?)",
            [idInteresse, usercode]);
    }


    function interessesVerwijderen(idInteresse, usercode) {

        databaseManager.query(
            "DELETE FROM interesseaccount WHERE idInteresse = ? AND usercode = ?",
            [idInteresse, usercode]);
    }

// Einde functies voor Interesses


//Functies voor Bestemmingen
    function bestemmingInvoeren(idBestemming, vertrekDatum, usercode) {

        databaseManager.query(
            "INSERT INTO accountBestemming (idBestemming, beginDatum, usercode) VALUES (?,?,?)",
            [idBestemming, vertrekDatum, usercode]);
    }

    function bestemmingUpdaten(idBestemmming, vertrekDatum, usercode) {

        if (vertrekDatum.length === 0) {
            databaseManager.query("UPDATE accountBestemming SET idBestemming = ? WHERE usercode = ?",
                [idBestemmming, usercode])
        }
        else {
            databaseManager.query("UPDATE accountBestemming SET idBestemming = ?, beginDatum = ? WHERE usercode = ?",
                [idBestemmming, vertrekDatum, usercode])
        }
    }

//Eind Functies voor Bestemming


// Controleren of het knopje openbaar of prive is
    $(document).ready(function () {
        $('#myCheckbox1').click(function () {

            var isChecked = $('#myCheckbox1').prop('checked');

            // $(':checkbox').each(function () { this.checked = !this.checked; });

            if (isChecked) {
                alert("openbaar");
            } else {
                alert("prive");
            }
        });

        $('#myCheckbox2').click(function () {
            var isChecked = $('#myCheckbox2').prop('checked');

            if (isChecked) {
                alert("openbaar");
            } else {
                alert("prive");
            }
        });
        $('#myCheckbox3').click(function () {
            var isChecked = $('#myCheckbox3').prop('checked');

            if (isChecked) {
                alert("openbaar");
            } else {
                alert("prive");
            }
        });
        $('#myCheckbox4').click(function () {
            var isChecked = $('#myCheckbox4').prop('checked');

            if (isChecked) {
                alert("openbaar");
            } else {
                alert("prive");
            }
        });

    });
});










