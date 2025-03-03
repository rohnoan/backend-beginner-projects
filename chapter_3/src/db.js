import Database from 'better-sqlite3';

const db = new Database(':memory:'); // Or 'database.db' for persistent storage

// execute sql statements

// tables 

//i will have 2 sheets one user and one todos and link both

db.exec(`
    CREATE TABLE users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT

)
`)

db.exec(`
    CREATE TABLE todos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id)
)
    `)

export default db;
