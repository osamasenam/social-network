const spicedPg = require("spiced-pg");
// const { dbUserName, dbPassword} = require("./secrets.json");
const database = "socialnetwork";

// const db = spicedPg(
//     process.env.DATABASE_URL ||
//     `postgres:${dbUserName}:${dbPassword}@localhost:5432/${database}`
// );

let db;
if(process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    // we are running our app locally
    const { dbUserName, dbPassword} = require("./secrets.json");
    // console.log("dbUserName, dbPassword",dbUserName, dbPassword);
    db = spicedPg(
        `postgres:${dbUserName}:${dbPassword}@localhost:5432/${database}`
    );
}

console.log(`db connecting to: ${database}`);

module.exports.register = (firstName, lastName, email, password) => {
    const q = `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) 
                RETURNING id`;
    const params = [firstName, lastName,  email, password];
    return db.query(q, params);  
};

module.exports.getRegisterId = (email) => {
    const q = `SELECT id FROM users WHERE email=$1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.getHashedPw = (email) => {
    const q = `SELECT password FROM users WHERE email=$1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.getSecretCode = (email, code) => {
    const q = `INSERT INTO secretcodes (email, code) VALUES ($1, $2) 
    RETURNING code`;
    const params = [email, code];
    return db.query(q, params);
};

module.exports.checkSecretCode = (email) => {
    const q = `SELECT code FROM secretcodes 
            WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' 
            AND  email=$1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.changePassword = (email, password) => {
    const q = `UPDATE users SET password=$2 WHERE email=$1`;
    const params = [email, password];
    return db.query(q, params);  
};

module.exports.getUserData = (id) => {
    const q = `SELECT id,first,last,image,bio  FROM users WHERE id=$1`;
    const params = [id];
    return db.query(q, params);  
};

module.exports.postProfileImage = (req) => {  
    const q = `UPDATE users SET image=$1 WHERE id=$2 RETURNING image`;
    const params = [`https://s3.amazonaws.com/spicedling/${req.file.filename}`, req.session.userId];
    return db.query(q, params);  
};

module.exports.getBio = (id) => {
    const q = `SELECT bio  FROM users WHERE id=$1`;
    const params = [id];
    return db.query(q, params);  
};

module.exports.postBio = (req) => {  
    const q = `UPDATE users SET bio=$1 WHERE id=$2 RETURNING bio`;
    const params = [req.body.draftBio, req.session.userId];
    return db.query(q, params);  
};