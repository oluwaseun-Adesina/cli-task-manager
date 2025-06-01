const http = require('http');
const { addTask, listTasks } = require('./taskManager');

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // Welcome message
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the CLI Task Manager HTTP Server!');
  } else if (req.method === 'GET' && req.url === '/tasks') {
    // List all tasks
    const tasks = listTasks();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ tasks }));
  } else if (req.method === 'POST' && req.url === '/tasks') {
    // Add a new task
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { title, description } = JSON.parse(body);
        if (!title || !description) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Title and description are required' }));
          return;
        }
        const result = addTask(title, description);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: result }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      }
    });
  } else {
    // Not Found
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});