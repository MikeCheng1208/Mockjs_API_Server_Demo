let path    = require('path');
let express = require('express');
let mockjs  = require('express-mockjs');
let app     = express();

let ipAddress = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
let port      = process.env.OPENSHIFT_NODEJS_PORT || 3001;

app.use(mockjs(path.join(__dirname, 'api')))
app.use('/api', mockjs(path.join(__dirname, 'api')))

app.listen(port, ipAddress, () => {
    console.log('啟動 Mock Api Server => http://' + ipAddress + ':' + port);
});