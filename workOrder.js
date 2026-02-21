const express = require('express');
const router = express.Router();

let workOrders = [
    {id: 1, title: "Fix AC", status: "pending"},
    {id: 2, title: "Repair Window", status: "Completed"},
];


router.get('/', (req, res) => {
    res.json(workOrders);
});

router.get('/:id', (req, res) => {
const id = parseInt(req.params.id);
const order = workOrders.find(o => o.id === id);
if (!order) return res.status(404).json({error: "Work order not found"});
res.json(order);
});

router.post('/', (req, res) => {
const { title, status } = req.body;
const newOrder = { id: workOrders.length + 1, title, status };
workOrders.push(newOrder);
res.status(201).json(newOrder);
});

router.put('/:id', (req, res) => {
const id = parseInt(req.params.id);
const order = workOrders.find(o => o.id === id);
if (!order) return res.status(404).json({error: "Work order not found"});

const { title, status } = req.body;
if (title) order.title = title;
if (status) order.status = status;
res.json(order);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    workOrders = workOrders.filter(o => o.id !== id);
    res.json({message: "Work order deleted"});
});

module.exports = router;
