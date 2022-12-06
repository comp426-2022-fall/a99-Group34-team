// Load database
import Database from 'better-sqlite3';
// Creates a new database connection. If the database file does not exist,
const db = new Database('user.db', {verbose: console.log});

const seed = () => {
    const userInit = `
    CREATE TABLE IF NOT EXISTS user (
        username VARCHAR PRIMARY KEY, 
        email VARCHAR, 
        password VARCHAR
    );

    CREATE TABLE IF NOT EXISTS interaction (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        accessedby VARCHAR, 
        cookie_key VARCHAR,
        cookie_value VARCHAR,
        date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (accessedby)
        REFERENCES user (username)
            ON DELETE CASCADE
            ON UPDATE CASCADE
    );

    CREATE TABLE IF NOT EXISTS cookie(
        cookie_key VARCHAR PRIMARY KEY,
        cookie_value VARCHAR,
        createdby VARCHAR,
        date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(createdby) REFERENCES user(username)
            ON DELETE CASCADE
            ON UPDATE CASCADE
    );
    `;
    db.exec(userInit);
}

const query = (sql, params) => {
    return db.prepare(sql).all(params);
}

const queryOne = (sql, params) => {
    return db.prepare(sql).get(params);l
}

const run = (sql, params) => {
    return db.prepare(sql).run(params);
}

export {
    seed,
    query,
    queryOne,
    run
}