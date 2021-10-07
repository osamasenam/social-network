const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const exp = require("constants");

// CSRF security
const cookieSession = require('cookie-session');
app.use(cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true
}));

const { postRegister } = require('./middleware');

app.use(compression());

//we use this middleware to parse json requests coming in 
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));


// client wants to know if the user is registered/ logged in
app.get('/user/id.json', function (req, res) {
    res.json({
        userId: req.session.userId
    });
    // res.json({
    //     userId: undefined,
    // });
});

app.post("/registration.json", postRegister);

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
