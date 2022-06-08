const express = require("express")
const productApp = express.Router()


productApp.use(express.json())
// let users = [{
//     id: 300,
//     productname: "Toy",
//     price: 200

// }, {
//     id: 200,
//     productname: "CAn",
//     price: 500
// }]

//defining routes
productApp.get('/get-product/:id', async (req, res) => {
    let productId = (+req.params.id)
    //let product = users.find(userObj => userObj.id == productId)
    let productcollection = req.app.get("productcollection")
    let product = await productcollection.findOne({ id: productId })

    res.send({
        message: "this in a single product ", payload: product
    })
})

productApp.get('/get-products', async (req, res) => {
    let productcollection = req.app.get("productcollection")
    let product = await productcollection.find().toArray()
    res.send({
        message: "this in all products ", payload: product
    })
})

productApp.post('/create-product', async (req, res) => {
    let productcollection = req.app.get("productcollection")

    let productObj = req.body
    await productcollection.insertOne(productObj)
    // users.push(productObj)
    res.send({
        message: "created a new product "
    })
})

productApp.put('/update-product', async (req, res) => {
    let productcollection = req.app.get("productcollection")

    let newProduct = req.body
    await productcollection.updateOne({ productname: newProduct.productname }, { $set: { price: newProduct.price } })
    //let idxofproduct = users.findIndex(userObj => userObj.id === newProduct.id)
    //if user not existed
    // if (idxofproduct == -1) {
    //     res.send({ message: "No user existed top modify" })
    // }
    // //if user existed
    // else {
    //     users.splice(idxofproduct, 1, newProduct);
    // }
    res.send({
        message: "this in updated product "
    })
})

productApp.delete('/remove-product/:id', async (req, res) => {
    let productcollection = req.app.get("productcollection")
    let productId = (+req.params.id)
    await productcollection.deleteOne({ id: productId })
    // let deleteObj = req.body;
    // let deleteIndx = users.findIndex(userObj => userObj.id === deleteObj.id)
    // users.splice(deleteIndx, 1)
    res.send({
        message: "this in deleted product "
    })
})

module.exports = productApp