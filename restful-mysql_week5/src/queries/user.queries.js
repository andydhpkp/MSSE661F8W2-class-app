exports.GET_ME_BY_ID = `SELECT id, username, email FROM users WHERE user_id = ?`;
exports.GET_ME_BY_USERNAME = `SELECT id, username, email FROM users WHERE username = ?`;
exports.GET_ME_BY_ID_WITH_PASSWORD = `SELECT * FROM users WHERE id = ?`;
exports.GET_ME_BY_USERNAME_WITH_PASSWORD = `SELECT * FROM users WHERE username = ?`;
exports.GET_ME_BY_ID_WITH_NAME = `SELECT * FROM users WHERE id = ?`;
exports.GET_ME_BY_USERNAME_WITH_NAME = `SELECT * FROM users WHERE username = ?`;