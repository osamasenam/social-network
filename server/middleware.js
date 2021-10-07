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

module.exports.postLogin = function (req, res, next) {
    console.log("req.body", req.body);
    const email = req.body.email;
    const password = req.body.password;

    db.getHashedPw(email)
        .then((hashedPw) => {
            bc.compare(password, hashedPw.rows[0].password)
                .then((match) => {
                    if(match) {
                        console.log("correct password");
                        db.getRegisterId(email)
                            .then((userId) => {
                                // set a cookie to remember the logged in user
                                req.session.userId = userId.rows[0].id;
                                // redirect the user to his profile
                                res.json({ success: true});
                            })
                            .catch((err) => {
                                console.log("db.getRegisterId: ", err);
                                res.json({ errMsg: "Error in Database"});
                            });

                    } else {
                        console.log("wrong password");
                        res.json({ errMsg: "Wrong Password!"});
                    }
            
                })
                .catch((err) => {
                    console.log("err in bc.compare: ", err);
                    res.json({ errMsg: "Error in Database"});
                });
        })
        .catch((err) => {
            console.log("err in db.getHashedPw: ", err);
            res.json({ errMsg: "Wrong Email!"});
        });
};
