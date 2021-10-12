const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const exp = require("constants");
const { uploader } = require("./upload");
const s3 = require("./s3");


// CSRF security
const cookieSession = require('cookie-session');
app.use(cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true
}));

const { postRegister, postLogin, 
    postResetPassword, postSavePassword, 
    getUser, postProfileImage, 
    getBio, postBio,
    getSearch, getClickedUser } = require('./middleware');

app.use(compression());

//we use this middleware to parse json requests coming in 
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));


// client wants to know if the user is registered/ logged in
app.get('/user/id.json', function (req, res) {
    res.json({
        // return the user id stored in the server cookie once logged in/registered
        userId: req.session.userId
    });
});

app.post("/registration.json", postRegister);

app.post("/login", postLogin);

app.post("/ResetPassword", postResetPassword);

app.post("/SavePassword", postSavePassword);

app.get("/user.json", getUser);

app.post('/Uploader', uploader.single('file'), s3.upload, postProfileImage);

app.get("/getBio", getBio);

app.post("/postBio", postBio);

app.get("/find-people/:search", getSearch);

app.get("/user/:id.json", getClickedUser);

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
