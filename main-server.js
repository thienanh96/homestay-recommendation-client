const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

const proxy = require("http-proxy-middleware");

app.use(proxy("/api", { target: "http://0.0.0.0:8000" }));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(9000);