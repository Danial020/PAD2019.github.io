$(function () {


    var usercode = sessionmanager.get("wwveranderen");



    $("#btn_wachtwoord_instellen").on("click", function () {

        var password = $("#wachtwoord_instellen").val();
        var cpassword = $("#wachtwoord_bevestigen").val();


        if (password === cpassword) {
            databaseManager.query(
                "UPDATE account SET wachtwoord = sha1(?) WHERE usercode = ?",
                [password, usercode]
            ).done(function (data) {
                console.log(data);
                alert("Gelukt!");
                location.href = "Index.html";
            });
        } else {
            alert("Wachtwoord komt niet overeen")
        }

    });


});