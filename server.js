const express = require('express')
const cors = require('cors');
const bodyParser = require(`body-parser`)
const logger = require(`morgan`)

const app = express()
app.use(cors());
app.use(bodyParser.json())
app.use(logger(`dev`))

const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

//FILEPATHS
const BrandController = require('./controllers/BrandController')
const BicycleController = require('./controllers/BicycleController')
const BellController = require('./controllers/BellController')

//LANDING PAGE
app.get('/', (req, res) => res.send('This is our landing page!'))

//READ GET 
app.get('/brands', BrandController.getAllBrands)
app.get('/bicycles', BicycleController.getAllBicycles)
app.get('/bells', BellController.getAllBells)

app.get('/brands/:id', BrandController.getBrandById)
app.get('/bicycles/:id', BicycleController.getBicycleById)
app.get('/bells/:id', BellController.getBellById)

app.get('/dogsName/:id', dogController.getDogName)
app.get('/dogsColor/:color', dogController.getDogColor)

//CREATE POST
app.post('/brands', BrandController.createBrand)
app.post('/bicycles', BicycleController.createBicycle)
app.post('/bells', BellController.createBell)

//UPDATE PUT
app.put('/brands/:id', BrandController.updateBrand)
app.put('/bicycles/:id', BicycleController.updateBicycle)
app.put('/bells/:id', BellController.updateBell)

//DELETE
app.delete('/brands/:id', BrandController.deleteBrand)
app.delete('/bicycles/:id', BicycleController.deleteBicycle)
app.delete('/bells/:id', BellController.deleteBell)


//DEFAULT
app.get('*', (req, res) => res.send('404 page not found'))
