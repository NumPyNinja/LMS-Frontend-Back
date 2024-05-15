
// Install express server 
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');


const HOST = "localhost";
const API_SERVICE_URL = "https://lms-backend-service.herokuapp.com/lms/";

// Proxy endpoints
app.use('/api', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/api`]: '',
    },
 }));
app.use(cors());
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/lms-frontend-phase2'));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/lms-frontend-phase2/index.html'));
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
