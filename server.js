const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const path = require("path");
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.get('/hobby', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'hobby.html'));
});

app.get('/mobile', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'mobile.html'));
});

app.get('/sister', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'cat.html'));
});

app.get('/auth', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'auth.html'));
});

app.get('/script', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'script.html'));
});

app.get("/data", (req, res) => {
  let rawdata = fs.readFileSync(path.join(__dirname, 'src', 'info.json')); 
  let jsondata = JSON.parse(rawdata); 
  res.status(200).json(jsondata);
});


const isUserExist = (findUsername) => { 
  const data = fs.readFileSync(path.join(__dirname, 'secrets.txt'), 'utf-8');
  const lines = data.split(/\r?\n/);
  const usernames = lines.map(line => line.split(' ')[0]);
  return !!usernames.find(username => username === findUsername);
}

const getUserHashedPassword = (findUsername) => {
  try{
    const data = fs.readFileSync(path.join(__dirname, 'secrets.txt'), 'utf-8');
    const lines = data.split(/\r?\n/);
    const users = lines.map(line => line.split(' '));
    return users.find(([username]) => username === findUsername)[1];
  } catch {
    return false;
  }
   
}

const updateUserList = (username, password) => {
  fs.readFile(path.join(__dirname, 'secrets.txt'), 'utf-8', (err, data) => {
    if (err) throw err;
    const newValue = `${data.toString()}\n${username} ${password}`;
    fs.writeFile(path.join(__dirname, 'secrets.txt'), newValue, 'utf-8', (err) => {
      if (err) throw err;
    });
  });
}

app.post('/register', async (req, res) => {
  try {
    const foundUser = isUserExist(req.body.login);
    if (!foundUser) {
      let hashPassword = await bcrypt.hash(req.body.password, 10);
      updateUserList(req.body.login, hashPassword);
      res.status(200).json({});
      return;
    }
    res.status(400).json({textError: 'User with this login already exist'});
  } catch{
    res.send("Internal server error");
  }
});

app.post('/login', async (req, res) => {
  try{
    const storedPass = getUserHashedPassword(req.body.login);
    if (storedPass) {
      const submittedPass = req.body.password;
      const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
      if (passwordMatch) {
        res.status(200).json({});
        return;
      }
    }
    res.status(400).json({textError: 'Username or password isn\'t correct'});
  } catch {
    throw new Error("Internal server error");
  }
});


server.listen(3000, function(){
  console.log("server is listening on port: 3000");
});