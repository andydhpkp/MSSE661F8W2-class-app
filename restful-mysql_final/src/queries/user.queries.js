exports.CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users(
    user_id int NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
)`;

exports.GET_ME_BY_ID = (userId) => `SELECT id, username, email FROM users WHERE user_id = ${userId}`;
exports.GET_ME_BY_USERNAME = (username) => `SELECT id, username, email FROM users WHERE username = ${username}`;
exports.GET_ME_BY_ID_WITH_PASSWORD = (userId) => `SELECT * FROM users WHERE id = ${userId}`;
exports.GET_ME_BY_USERNAME_WITH_PASSWORD = (username) => `SELECT * FROM users WHERE username = ${username}`;
exports.GET_ME_BY_ID_WITH_NAME = `SELECT * FROM users WHERE id = `;
exports.GET_ME_BY_USERNAME_WITH_NAME = `SELECT * FROM users WHERE username = ?`;
exports.INSERT_NEW_USER = (username, email, password) => `INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password})`;
exports.UPDATE_USER = (username, email, password, userId) => `UPDATE users SET username = ${username}, email = ${email}, password = ${password} WHERE user_id = ${userId}`;