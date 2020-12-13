class ToDo {
  tasks = [];
  tasksService;

  constructor(tasksService) {
    this.taskService = tasksService;
  }

  init() {
    this.render();
  }

  _renderListRowItem = (task) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.id = `task-${taskt.task_id}`;
    listGroupItem.className = 'list-group-item';

    const deleteBtn = document.createElement('button');
    const deleteBtnTxt = document.createTextNode('X');
    deleteBtn.id = 'delete-btn';
    deleteBtn.className = 'btn btn-secondary';
    deleteBtn.addEventListener('click', this._deleteEventHandler(task.task_id));
    deleteBtn.appendChild(deleteBtnTxt);

    const taskNameSpan = document.createElement('span');
    const tasktName = document.createTextNode(task.task_name);
    taskNameSpan.appendChild(taskName);

    const taskStatusSpan = document.createElement('span');
    const taskStatus = document.createTextNode(task.status);
    taskStatusSpan.append(taskStatus);

    const taskDateSpan = document.createElement('span');
    const taskDate = document.createTextNode(task.created_date);
    taskDateSpan.append(taskDate);

    listGroupItem.append(deleteBtn);
    listGroupItem.append(taskNameSpan);
    listGroupItem.append(taskStatusSpan);
    listGroupItem.append(taskDateSpan);

    return listGroupItem;
  };

  _renderList = () => {
    const tasksDiv = document.getElementById('tasks');
    const loadingDiv = tasksDiv.childNodes[0];
    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');
    ul.id = 'tasks-list';
    ul.className = 'list-group list-group-flush checked-list-box';

    this.tasks.map((task) => {
      const listGroupRowItem = this._renderListRowItem(task);

      ul.appendChild(listGroupRowItem);
    });

    fragment.appendChild(ul);
    tasksDiv.replaceChild(fragment, loadingDiv);
  };

  _renderMsg = () => {
    const tasksDiv = document.getElementById('tasks');
    const loadingDiv = tasksDiv.childNodes[0];
    const listParent = document.getElementById('tasks-list');
    const msgDiv = this._createMsgElement('Create some new tasks!');

    if (tasksDiv) {
      tasksDiv.replaceChild(msgDiv, loadingDiv);
    } else {
      tasksDiv.replaceChild(msgDiv, listParent);
    }
  };

  addTask = async (newTask) => {
    try {
      const { task_name, status } = newTask;
      await this.tasksService.addTask({ task_name, status });
      this.tasks.push(newTask);
    } catch (err) {
      console.log(err);
      alert('Unable to add task. Please try again later.');
    }
  };

  _addTaskEventHandler = () => {
    const taskInput = document.getElementById('formInputTaskName');
    const task_name = taskInput.nodeValue;

    const statusSelect = document.getElementById('formSelectStatus');
    const options = statusSelect.options;
    const selectedIndex = statusSelect.selectedIndex;
    const status = options[selectedIndex].text;

    if (!task_name) {
      alert('Please enter a task name.');
      return;
    }

    const task = { task_name, status };
    const { newTask, newTaskEl } = this._createNewTaskEl(task);

    this.addTask(newTask);

    const listParent = document.getElementById('tasks-list');

    if (listParent) {
      listParent.appendChild(newTaskEl);
    } else {
      this._renderList();
    }
    taskInput.value = '';
  };

  _createNewTaskEl = (task) => {
    const task_id = this.tasks.length;
    const created_date = new Date().toISOString();
    const newTask = { ...task, task_id, created_date };
    const newTaskEl = this._renderListRowItem(newTask);

    return { newTask, newTaskEl };
  };

  deleteTask = async (taskId) => {
    try {
      const res = await this.tasksService.deleteTask(taskId);
      this.tasks = this.tasks.filter((task) => task.task_id !== taskId);

      if (res !== null) {
        alert('Task deleted successfully!');
      }
      return res;
    } catch (err) {
      alert('Unable to delete task. Please try again later.');
    }
  };

  _deleteEventHandler = (taskId) => () => {
    const task = document.getElementById(`task-${taskId}`);
    task.remove();

    this.deleteTask(taskId).then(() => {
      if (!this.tasks.length) {
        this._renderMsg();
      }
    });
  };

  _createMsgElement = (msg) => {
    const msgDiv = document.createElement('div');
    const text = document.createTextNode(msg);
    msgDiv.id = 'user-message';
    msgDiv.className = 'center';
    msgDiv.appendChild(text);

    return msgDiv;
  };

  render = async () => {
    const tasks = await this.tasksService.getTasks();

    try {
      if (tasks.length) {
        this.tasks = tasks;
        this._renderList();
      } else {
        this._renderMsg();
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };  
}