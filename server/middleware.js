const db = require("./db.js");
const bc = require("./bc");

module.exports.postRegister = function (req, res, next) {
    console.log("req.body", req.body);
    const firstName = req.body.first;
    const lastName = req.body.last;
    const email = req.body.email;
    const password = req.body.password;

    bc.hash(password)
        .then((hashedPw) => {
            db.register(firstName, lastName, email, hashedPw)
                .then((userId) => {
                    //get the user id given to this last added row >>>> save it inside cookie on the server side
                    req.session.userId = userId.rows[0].id;
                    console.log("one more user was added to users table in petition db");
                    // a new user who has just registered will be directed to sign the petition
                    res.json({ success: true});
                })
            // in case problem occured while writing to db >>>> show again the register page
                .catch((err) => {
                    console.log("err in db.register: ", err);
                    res.json({ success: false});
                });

        })
        .catch((err) => {
            console.log("err in bc.hash: ", err);
        
        });
};