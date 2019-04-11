const express = require('express');
const app = express();
const logger = require('./middleware/logger');

//Logging middleware
app.use(logger);
//Body parser middleware
app.use(express.json());


app.use('/api/members', require('./routes/api/members'));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running at : http://localhost:${port}`));