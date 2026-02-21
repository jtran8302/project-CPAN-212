const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const workOrderRoutes = require('./routes/workOrder');

const app = express();
app.use(bodyParser.json());
app.use('/api/workorders', workOrderRoutes);

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
