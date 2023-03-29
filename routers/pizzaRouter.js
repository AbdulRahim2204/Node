const express = require('express');
const pizzaController = require('../controller/pizzaController');

const router = express.Router();

router.get('/create-order', pizzaController.createPizzaGet)
router.post('/create-order', pizzaController.createPizzaPost);
router.get('/orders', pizzaController.pizzaIndex);
router.delete('/delete-orders/:id', pizzaController.deletePizza);
router.get('/orders/:id', pizzaController.showPizzaGet);


module.exports = router;