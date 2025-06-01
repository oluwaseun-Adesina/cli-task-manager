#!/usr/bin/env node

const { program } = require("commander");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

const taskFile = path.resolve(__dirname, "tasks.json");

prompt = inquirer.createPromptModule();

const {
  addTask,
  updateTask,
  deleteTask,
  markTaskStatus,
  listTasks,
} = require("./taskManager");

// commands
// add a new task
program
  .command("add")
  .description("add a new task")
  .action(async () => {
    const answers = await prompt([
      { type: "input", name: "title", message: "Task title:" },
      { type: "input", name: "description", message: "Task descrtipion" },
    ]);
    const result = addTask(answers.title, answers.description);
    console.log(result);
  });

// update a task
program
  .command("update <id>")
  .description("Update a task title or description")
  .action(async (id) => {
    const answers = await prompt([
      { type: "input", name: "title", message: "New task title:" },
      { type: "input", name: "description", message: "New task description:" },
    ]);
    try {
      const result = updateTask(id, answers.title, answers.description);
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  });

// delete a task
program
  .command("delete <id>")
  .description("Delete a task")
  .action((id) => {
    try {
      const result = deleteTask(id);
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  });

// mark task status

program
  .command("status <id> <status>")
  .description("Mark a task as not done, in progress, or done")
  .action((id, status) => {
    try {
      const result = markTaskStatus(id, status);
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  });

// list all tasks or filter by status
program
  .command("list")
  .option("--status <status>", "Filter tasks by status")
  .description("List all tasks, optionally filtered by status")
  .action((options) => {
    const result = listTasks(options.status);
    console.log(result);
    return;
  });

program.parse(program.argv);
