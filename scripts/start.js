const { exec } = require('child_process');
const path = require('path');
const waitOn = require('wait-on');
const open = require('open');

const server = exec('npx ts-node src/server.ts', { cwd: path.resolve(__dirname, '..') });

server.stdout.on('data', (data) => {
  console.log(data.toString());
});

server.stderr.on('data', (data) => {
  console.error(data.toString());
});

waitOn({ resources: ['http://localhost:3000'], delay: 1000 }, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  open('http://localhost:3000');
});
