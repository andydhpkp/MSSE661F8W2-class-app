const express = require('express');
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller');
const canAccess = require('../middleware/auth.middleware');

const tasksRoutes = express.Router();
tasksRoutes.get('/', canAccess, getAllTasks).post('/', canAccess, createTask);

tasksRoutes
  .get('/:taskId', canAccess, getTask) 
  .put('/:taskId', canAccess, updateTask)
  .delete('/:taskId', canAccess, deleteTask);

module.exports = tasksRoutes;