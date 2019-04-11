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

router.get('/', (req, resp) => {
    resp.json(members);
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