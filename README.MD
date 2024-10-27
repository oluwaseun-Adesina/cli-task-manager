# CLI Task Manager

A simple command-line task manager built with Node.js. This tool helps you to manage your tasks directly from the command line, allowing you to add, update, delete, and track the status of your tasks.

## Features

- **Add tasks**: Add a new task with a title and description.
- **Update tasks**: Edit the title or description of an existing task.
- **Delete tasks**: Remove tasks by ID.
- **Mark tasks as in progress or done**: Set a task's status as "not done," "in progress," or "done."
- **List tasks**:
  - List all tasks.
  - List tasks by status (done, not done, or in progress).

## Installation

1. Clone the repository or download the source files:

   ```bash
   git clone https://github.com/oluwaseun-Adesina/roadmap.sh-backendprojects.git
   cd cli-task-manager

   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3: Link the CLI tool globally to use it as a command:

````bash
npm link

Usage
Here are the available commands:

Add a New Task
```bash
task add

This command will prompt you to enter a task title and description.

Update an Existing Task
```bash
task update <id>

Replace <id> with the task ID. This command will prompt you to update the task title and/or description.

Delete a Task
```bash
task delete <id>

Replace <id> with the task ID. This command deletes the task permanently.

Mark a Task’s Status
```bash
task status <id> <status>

<id>: Task ID.
<status>: Set the task’s status to one of the following values:
not done
in progress
done

eg
```bash
task status 2 in progress


List All Tasks
```bash
task list

Lists all tasks with their status.

List Tasks by Status
To filter tasks by their status, use the --status option:

```bash
task list --status <status>

Replace <status> with one of the following:

not done
in progress
done
Example:

```bash
task list --status done


Project Structure
index.js: Main script containing all commands and logic.
tasks.json: Stores task data in JSON format.
Dependencies
Commander: Used for handling CLI commands.
Inquirer: Used for interactive prompts.
Contributing
Feel free to fork this repository and make improvements. Pull requests are welcome.

License
This project is licensed under the MIT License.
````
