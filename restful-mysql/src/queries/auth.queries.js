exports.CREATE_TABLE = `CREATE TABLE IF NOT EXISTS users(
    id int(9) unsigned NOT NULL AUTO_INCREMENT,
    username varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    password varchar(255) NOT NULL,
    birthday date DEFAULT NULL,
    name varchar(100) NOT NULL,
    PRIMARY KEY (id),
    KEY username (username),
    KEY email (email)
)`;

exports.INSER_NEW_USER = `INSERT INTO users (username, email, password, birthday, name) VALUES (?, ?, ?, ?, ?, ?)`;

exports.UPDATE_USER = `UPDATE users SET username = ?, email = ?, password = ?, birthday = ?, name = ?, WHERE user_id = ?`;