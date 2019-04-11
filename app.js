const express = require('express');
const app = express();
const logger = require('./middleware/logger');
app.use(logger);

const isuser = {
    id:1,
    name:"name"
};

app.get('/api/user', (req, resp) => {
    resp.json(isuser);
});



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running at : http://localhost:${port}`));