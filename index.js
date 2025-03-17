// http://127.0.0.1:3000
import 'dotenv/config'
import express from 'express'

const app = express()

const port = process.env.PORT || 3000
app.use(express.json())

let teaData = []
let nextId = 1

//post
app.post('/teas', (req, res) => {
    // const {name, price} = req.body//
    const name = req.body.name;
    const price = req.body.price;
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})
//simple get request
app.get("/get-tea", (req, res) => {
    res.send(teaData);
})


// get with id
app.get("/get-tea/:id", (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("Tea not found")
    } else {
        return res.status(200).send(tea)
    }

})
//update with id 
app.put('/get-tea/:id', (req, res) => {
    const tea = teaData.find(tea => tea.id === parseFloat(req.params.id))
    if (!tea) {
        return res.status(404).send("Tea not found")
    } else {
        const {name, price} = req.body
        tea.name = name
        tea.price = price
        res.status(200).send(tea)
    }
})
// delete with id
app.delete('/get-tea/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send("Tea not found")
    } else {
        teaData.splice(index, 1)
        return res.status(204).send('deleted')
    }
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`);
    
})
