#!/usr/bin/env node

const { execSync } = require('child_process');
const PORT = process.env.PORT || 5000;

try {
  if (process.platform === 'win32') {
    // Windows
    const output = execSync(`netstat -ano | findstr :${PORT}`, { encoding: 'utf8' });
    if (output) {
      const lines = output.split('\n').filter(line => line.includes('LISTENING'));
      lines.forEach(line => {
        const pid = line.trim().split(/\s+/).pop();
        if (pid && !isNaN(pid)) {
          console.log(`🔪 Killing process on port ${PORT} (PID: ${pid})...`);
          try {
            execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
            console.log(`✅ Process ${pid} terminated`);
          } catch (e) {
            // ignore
          }
        }
      });
    } else {
      console.log(`✅ Port ${PORT} is free`);
    }
  } else {
    // macOS / Linux
    try {
      const output = execSync(`lsof -ti :${PORT}`, { encoding: 'utf8' });
      if (output) {
        const pids = output.trim().split('\n');
        pids.forEach(pid => {
          console.log(`🔪 Killing process on port ${PORT} (PID: ${pid})...`);
          execSync(`kill -9 ${pid}`, { stdio: 'ignore' });
          console.log(`✅ Process ${pid} terminated`);
        });
      }
    } catch (e) {
      console.log(`✅ Port ${PORT} is free`);
    }
  }
} catch (err) {
  console.log(`✅ Port ${PORT} is free`);
}
