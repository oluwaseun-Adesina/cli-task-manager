#!/usr/bin/env node

const { program } = require('commander');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const taskFile = path.resolve(__dirname, 'tasks.json');

prompt = inquirer.createPromptModule();

// helper functions
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

// commands
// add a new task
program
  .command('add')
  .description('add a new task')
  .action(async () => {
    const answers = await prompt([
      { type: 'input', name: 'title', message: 'Task title:' },
      { type: 'input', name: 'description', message: 'Task descrtipion' },
    ]);
    const tasks = loadTask();
    tasks.push({
      id: tasks.length + 1,
      ...answers,
      status: 'not done',
    });
    saveTask(tasks);
    console.log('Task added!');
  });

// update a task

program
  .command('update <id>')
  .description('Update a task title or description')
  .action(async (id) => {
    const tasks = loadTask();
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
    if (taskIndex === -1) {
      console.log('Task not found.');
      return;
    }
    const answers = await prompt([
      {
        type: 'input',
        name: 'title',
        message: 'New task Title (Leave blank to keep current ',
      },
      {
        type: 'input',
        name: 'description',
        message: 'New task description (Leave blank to keep current ',
      },
    ]);
    tasks[taskFile] = { ...tasks[taskIndex], ...answers };
    saveTask();
    console.log('Task updated');
  });

// delete a task
program
  .command('delete <id>')
  .description('Delete a task')
  .action((id) => {
    let tasks = loadTask();
    tasks = tasks.filter((task) => task.id !== parseInt(id));
    saveTask(tasks);
    console.log('Task deleted');
  });

// mark task status

program
  .command('status <id> <status>')
  .description('Mark a task as not done, in progress, or done')
  .action((id, status) => {
    const validStatuses = ['not done', 'in progress', 'done'];
    if (!validStatuses.includes(status)) {
      console.log(`Invalid status. Choose from: ${validStatuses.join(', ')}`);
      return;
    }
    const tasks = loadTask();
    const task = tasks.find((t) => t.id === parseInt(id));
    if (!task) {
      console.log('Task not found.');
      return;
    }
    task.status = status;
    saveTask(tasks);
    console.log(`Task marked as ${status}`);
  });

// list all tasks or filter by status
program
  .command('list')
  .option('--status <status>', 'Filter tasks by status')
  .description('List all tasks, optionally filtered by status')
  .action((options) => {
    const tasks = loadTask();
    const filteredTasks = options.status
      ? tasks.filter((task) => task.status === options.status)
      : tasks;

    if (filteredTasks.length === 0) {
      console.log('No tasks found');
      return;
    }

    filteredTasks.forEach((task) => {
      console.log(`[${task.id}] ${task.title} - ${task.status}`);
    });
  });

program.parse(program.argv);
