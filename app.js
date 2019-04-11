const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./app.db');

db.serialize(function () {
    db.run('CREATE TABLE IF NOT EXISTS member (id TEXT, name TEXT)');
    var stmt = db.prepare('INSERT INTO member VALUES (?,?)');

    for (var i = 0; i < 10; i++) {
        stmt.run(''+i, 'Ipsum ' + i);
    }
    stmt.finalize();
});

db.close();

//Logging middleware
app.use(logger);
//Body parser middleware
app.use(express.json());


app.use('/api/members', require('./routes/api/members'));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running at : http://localhost:${port}`));