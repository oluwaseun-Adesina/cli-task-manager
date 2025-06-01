fs = require('fs');
const path = require('path');
const taskFile = path.resolve(__dirname, 'tasks.json');

function loadTask() {
  if (!fs.existsSync(taskFile)) {
    fs.writeFileSync(taskFile, JSON.stringify([]));
  }
  const data = fs.readFileSync(taskFile);
  return JSON.parse(data);
}

function saveTask(tasks) {
  fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 2));
}

function addTask(title, description) {
  const tasks = loadTask();
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTask(tasks);
  return `Task "${title}" added with ID ${newTask.id}`;
}

const updateTask = (id, title, description) => {
  const tasks = loadTask();
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }
  tasks[taskIndex].title = title;
  tasks[taskIndex].description = description;
  saveTask(tasks);
  return `Task ${tasks[taskIndex].title} updated`;
}

const deleteTask = (id) => {
  const tasks = loadTask();
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }
  const deletedTask = tasks.splice(taskIndex, 1);
  saveTask(tasks);
  return `Task ${deletedTask[0].title} deleted`;
}

const markTaskStatus = (id, status) => {
  const validStatuses = ['pending', 'in-progress', 'done'];
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status. Valid statuses are: ${validStatuses.join(', ')}`);
  }
  const tasks = loadTask();
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }
  tasks[taskIndex].status = status;
  saveTask(tasks);
  return `Task ${tasks[taskIndex].title} marked as ${status}`;
}

const listTasks = (status) => {
  const tasks = loadTask();
  if (tasks.length === 0) {
    return 'No tasks found';
  }
    if (status) {
        const filteredTasks = tasks.filter(task => task.status === status);
        if (filteredTasks.length === 0) {
        return `No tasks found with status: ${status}`;
        }
        return filteredTasks.map(task => `${task.id}: ${task.title} - ${task.status}`).join('\n');
    }
  return tasks.map(task => `${task.id}: ${task.title} - ${task.status}`).join('\n');
}

module.exports = {
  loadTask,
  saveTask,
  addTask,
  updateTask,
  deleteTask,
  markTaskStatus,
  listTasks
};