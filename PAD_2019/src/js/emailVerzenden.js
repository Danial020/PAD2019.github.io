
function wwVeranderen() {


    var email = $("#wachtwoord_vergeten_email").val();

    databaseManager.query(
        "SELECT usercode FROM account WHERE email = ?",
        [email]
    ).done(function (data) {
        if (data.length > 0) {


            var usercode = JSON.stringify(data[0].usercode);
            sessionmanager.set("wwveranderen", usercode);
            location.href = "WachtwoordInstellen.html";
        }
        else {
            alert("Email bestaat niet");
        }
    });
    return false;


}


// var nodemailer = require[('nodemailer')];
//
//
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     secure: false,
//     port: 25,
//     auth: {
//         user: 'fys.4.corendon@gmail.com',
//         pass: 'corendon-fys-4'
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });
//
//
// let mailOptions = {
//     from: '"Corendon Connect & Go "<fys.4.corendon@gmail.com',
//     to: 'onur_o@live.nl',
//     subject: 'Email verificatie',
//     text: 'Help us secure your Connect & Go account by verifying your email address. Please click on the link to continue: https://is110-4.fys-hva.tk/vragenEnContact.html'
// };
//
//
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });

