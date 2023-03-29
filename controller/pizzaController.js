const { ObjectId } = require('mongodb');
const db = require('../model/db');

const createPizzaGet = (req, res) => {
    res.render('./pizza/createOrder');
}

const createPizzaPost = async (req, res) => {
    const order = req.body;
    if(order){
        const result = await db.save(order);

        console.log(result);
        res.status(200).render('index', {msg: 'Order Received'});
        if(result.acknowledged == true){
            
        }
    }
}

const pizzaIndex = async (req, res) => {
    const pizzaList = await db.find();
    if(pizzaList && pizzaList.length >= 1){
        res.render('./pizza/pizzaList', {pizzaList});
        
    } else {
        res.render('./pizza/pizzaList', {msg: 'There no orders'});

    }
}

const showPizzaGet = async (req, res) => {
    if(ObjectId.isValid(req.params.id)){

        const id = new ObjectId(req.params.id);
        const pizza = await db.find({_id: id});

        if(pizza){
            res.status(200).render('./pizza/order', {pizza});
        } else {
            res.status(200).render('404', {msg: 'No such order with this ID'})
        }

    } else {
        res.status(404).render('404', {msg: 'No such order :-('})
    }

}

const deletePizza = async (req, res) =>{
    const id = req.params.id;
    if(ObjectId.isValid(id)){
        
        const result = db._delete({_id: new ObjectId(id)});
        console.log(result);
        res.status(200).json({redirect: '/pizza/orders'});

    } else {
        res.status(404).json({redirect: './404'});
    }
}

module.exports = {
    createPizzaGet,
    createPizzaPost,
    pizzaIndex,
    showPizzaGet,
    deletePizza
}