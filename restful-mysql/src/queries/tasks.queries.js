
exports.CREATE_TASKS_TABLE = `CREATE TABLE IF NOT EXISTS tasks(
    id int NOT NULL AUTO_INCREMENT, 
    name varchar(255) NOT NULL, 
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP(), 
    status varchar(10) DEFAULT 'pending', 
    PRIMARY KEY (id) 
  )`;
  
exports.ALL_TASKS = `SELECT * FROM tasks`;
  

exports.SINGLE_TASKS = `SELECT * FROM tasks WHERE id = ?`; //? is valid syntax to fill in whatever you need in the moment
  
exports.INSERT_TASK = `INSERT INTO tasks (name) VALUES (?)`;
  
exports.UPDATE_TASK = `UPDATE tasks SET name = ?, status = ? WHERE id = ?`;
  
exports.DELETE_TASK = `DELETE FROM tasks WHERE id = ?`;