const express = require('express');
const router = express.Router();
const members = [
    {
        id: 1,
        name: "name1"
    },
    {
        id: 2,
        name: "name2"
    }
];

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./app.db');


const getPlayerData = function (callback) {
    var result = [];
    db.serialize(function () {
        db.each('SELECT id, name from member', function (err, row) {
            console.log(row);
            result.push(row);
        }, ()=>{
            db.close(); //closing connection
            callback(result);
        });

    });
};

router.get('/', (req, resp) => {
    getPlayerData(function(data){
        return resp.json(data);
    });
});


router.get('/:id', (req, resp) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (!found) {
        return resp.status(404).json({msg: `Member not found with ID : ${req.params.id}`});
    }
    resp.json(members.filter(member => member.id === parseInt(req.params.id)));

});


router.post('/', (req, resp) => {
    resp.send(req.body);
});

module.exports = router;