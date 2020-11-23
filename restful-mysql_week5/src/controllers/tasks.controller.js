const connection = require('../db-config');
const {
  ALL_TASKS,
  SINGLE_TASK,
  INSERT_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} = require('../queries/tasks.queries');
const query = require('../utils/query');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

exports.getAllTasks = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const tasks = await query(con, ALL_TASKS).catch((err) => {
    res.send(err);
  });

  if (tasks.length) {
    res.json(tasks);
  }
};

exports.getTask = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const task = await query(con, SINGLE_TASK, [req.params.taskId]).catch(
    (err) => {
      res.send(err);
    }
  );

  if (task.length) {
    res.json(task);
  }
};

exports.createTask = async (req, res) => {
  const decoded = req.user; 

  if (decoded.id) {
    const con = await connection().catch((err) => {
      throw err;
    });

    const result = await query(con, INSERT_TASK, [req.body.name]).catch(
      (err) => {
        res.send(err);
      }
    );
    console.log(result);

    if (result.affectedRows === 1) {
      res.json({ message: 'Added task successfully!' });
    }
  }
};

exports.updateTask = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const result = await query(con, UPDATE_TASK, [
    req.body.name,
    req.body.status,
    req.params.taskId,
  ]).catch((err) => {
    res.send(err);
  });

  if (result.affectedRows === 1) {
    res.json(result);
  }
};

exports.deleteTask = async (req, res) => {
  const con = await connection().catch((err) => {
    throw err;
  });

  const result = await query(con, DELETE_TASK, [req.params.taskId]).catch(
    (err) => {
      res.send(err);
    }
  );

  if (result.affectedRows === 1) {
    res.json({ message: 'Deleted successfully.' });
  }
};