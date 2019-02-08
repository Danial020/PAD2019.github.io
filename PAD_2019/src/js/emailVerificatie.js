

$(function () {

    var usercodeAccount = sessionmanager.get("usercodeAccount");

    databaseManager.query("SELECT * FROM account").done(function (data) {
        console.log(data);
    }).fail(function (reason) {
        console.log(reason);
    });


    $("#btn_email_verificatie").on("click", function () {

        databaseManager.query(
            "UPDATE account SET verificatie = 'Y' WHERE usercode = ?",[usercodeAccount]
        ).done(function (data) {
            console.log(data);
            alert("Gelukt!");
            location.href = "Index.html";
        });
    });

});