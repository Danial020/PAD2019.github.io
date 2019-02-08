var databaseManager = databaseManager();
//databaseManager.connect("http://localhost:8080"); //https//db.fys-hva.tk
//databaseManager.authenticate("yourtokenhere"); //Ttqgb3TREtM5QiEz
databaseManager.connect("https://db.fys-hva.tk/");
databaseManager.authenticate("Ttqgb3TREtM5QiEz");

var email, wachtwoord, gender, birthdate, voornaam, achternaam, usercode, leeftijd, verificatie;


$(function () {


    databaseManager.query("SELECT * FROM account").done(function (data) {
        console.log(data);
    }).fail(function (reason) {
        console.log(reason);
    });

    $("#loginButton").on("click", function () {
        email = $("#login_email").val();
        wachtwoord = $("#login_password").val();


        console.log(email);
        console.log(wachtwoord);

        databaseManager.query(
            "SELECT usercode FROM account WHERE email = ? AND wachtwoord = SHA1(?)",
            [email, wachtwoord]
        ).done(function (data) {
            if (data.length > 0) {

                databaseManager.query(
                    "SELECT verificatie FROM account WHERE usercode = ?",
                    [JSON.stringify(data[0].usercode)]
                ).done(function (verificatie) {


                    if(verificatie[0].verificatie === "Y"){
                        //session maken
                        usercode = JSON.stringify(data[0].usercode);
                        sessionmanager.set("usercode", usercode);
                        location.href = "Index.html";
                    }
                    else {
                        alert("Verifieer uw email alstublieft.");
                    }
                })



            }
            else {
                alert("Check je gegevens!");
            }
        });
        return false;
    });


    //Registeren

    $("#registerButton").on("click", function () {
        voornaam = $("#registreer_naam").val();
        achternaam = $("#registreer_achternaam").val();
        gender = $("#geslacht").val();
        birthdate = $("#Geboortedatum").val();
        email = $("#registreer_email").val();
        wachtwoord = $("#registreer_password").val();
        leeftijd = getAge(birthdate);


        console.log(voornaam);
        console.log(achternaam);
        console.log(gender);
        console.log(birthdate);
        console.log(email);
        console.log(wachtwoord);

        databaseManager.query(
            "SELECT email FROM account WHERE email = ?",
            [email]
        ).done(function (data) {

            if (data.length === 0) {
                Registreren();
            }
            else {
                if (data[0].email === email) {
                    alert("Email is al in gebruik");
                }
            }
        });


        function Registreren() {

            databaseManager.query(
                "INSERT INTO account  (leeftijd, voornaam, achternaam, geslacht, geboortedatum, email, wachtwoord) VALUES (?,?,?,?,?,?, SHA1(?))",
                [leeftijd, voornaam, achternaam, gender, birthdate, email, wachtwoord]
            ).done(function (data) {
                console.log(data);

                databaseManager.query(
                    "SELECT usercode FROM account WHERE email = ?",
                    [email]
                ).done(function (data) {

                    var usercodeAccount = JSON.stringify(data[0].usercode);
                    sessionmanager.set("usercodeAccount", usercodeAccount);

                    alert("Gelukt!");
                    location.href = "emailVerificatie.html";

                });
            });
            return false;
        }

    });

    //Wachtwoord opnieuw instellen

    // $("#btn_wachtwoord_instellen").on("click", function () {
    //
    //     var password = $("#wachtwoord_instellen").val();
    //     var cpassword = $("#wachtwoord_bevestigen").val();
    //
    //
    //
    //     if (password === cpassword) {
    //         databaseManager.query(
    //             "UPDATE account SET wachtwoord = sha1(?) WHERE usercode = ?",
    //             [password, usercode]
    //         ).done(function (data) {
    //             console.log(data);
    //             alert("Gelukt!");
    //             location.href = "Index.html";
    //         });
    //     } else {
    //         alert("Wachtwoord komt niet overeen")
    //     }
    //
    // });


    //Wachtwoord opnieuw instellen

    $("#btn_wachtwoord_instellen").on("click", function () {

        var password = $("#wachtwoord_instellen").val();
        var cpassword = $("#wachtwoord_bevestigen").val();



        if (password === cpassword) {
            databaseManager.query(
                "UPDATE account SET wachtwoord = sha1(?) WHERE usercode = 31",
                [password]
            ).done(function (data) {
                console.log(data);
                alert("Gelukt!");
                location.href = "Index.html";
            });
        } else {
            alert("Wachtwoord komt niet overeen")
        }

    });






// Review plaatsen

    $("#button_review_plaatsen").on("click", function () {

        var review = $("#plaats_bericht").val();

        console.log(sessionmanager.get("usercode"));
        console.log(review);

        usercode = sessionmanager.get("usercode");


        databaseManager.query(
            "INSERT INTO review (review, usercode) VALUES (?,?)",
            [review, usercode]
        ).done(function (data) {
            console.log(data);

            alert("Geplaatst!");
            window.location = "index.html";
        });
        return false;
    });

    // Review ophalen

    databaseManager.query("SELECT voornaam, achternaam, woonplaats, review FROM Account INNER JOIN Review ON Account.usercode = Review.usercode ORDER BY idReview DESC")
        .done(function (data) {
            console.log(data);


            //review 1
            var naamreview1 = data[0].voornaam + " " + data[0].achternaam;
            $("#naam_review_bericht_1").text(naamreview1);
            var woonplaatsreview1 = data[0].woonplaats;
            $("#woonplaats_review_bericht").text(woonplaatsreview1);
            var review1 = data[0].review;
            $("#bericht_review_1").text(review1);


            //review 2
            var naamreview2 = data[1].voornaam + " " + data[1].achternaam;
            $("#naam_review_bericht_2").text(naamreview2);
            var woonplaatsreview2 = data[1].woonplaats;
            $("#woonplaats_review_bericht_2").text(woonplaatsreview2);
            var review2 = data[1].review;
            $("#bericht_review_2").text(review2);

            //review 3
            var naamreview3 = data[2].voornaam + " " + data[2].achternaam;
            $("#naam_review_bericht_3").text(naamreview3);
            var woonplaatsreview3 = data[2].woonplaats;
            $("#woonplaats_review_bericht_3").text(woonplaatsreview3);
            var review3 = data[2].review;
            $("#bericht_review_3").text(review3);

            //review 4
            var naamreview4 = data[3].voornaam + " " + data[3].achternaam;
            $("#naam_review_bericht_4").text(naamreview4);
            var woonplaatsreview4 = data[3].woonplaats;
            $("#woonplaats_review_bericht_4").text(woonplaatsreview4);
            var review4 = data[3].review;
            $("#bericht_review_4").text(review4);

            //review 5
            var naamreview5 = data[4].voornaam + " " + data[4].achternaam;
            $("#naam_review_bericht_5").text(naamreview5);
            var woonplaatsreview5 = data[4].woonplaats;
            $("#woonplaats_review_bericht_5").text(woonplaatsreview5);
            var review5 = data[4].review;
            $("#bericht_review_5").text(review5);
        });


});


function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}