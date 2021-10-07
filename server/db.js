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
}
