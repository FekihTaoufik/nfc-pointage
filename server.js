const express  = require('express')

const bodyParser  = require('body-parser')
const cors  = require('cors')
const PORT = 4000

const {main} = require('./controller/main')
// import { errorHandler } from './src/middleware'

// require('./src/config/sequelize')

const app = express()
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

// app.use('/upload', express.static('storage'))

app.use(cors())
app.use(bodyParser.json())

// app.use('/', routes)

app.use('/', main)

// app.use(errorHandler)

// const swaggerUi = require('swagger-ui-express')
// const swaggerDocument = require('./swagger.json')

// app.use(
//     '/doc',
//     swaggerUi.serve,
//     swaggerUi.setup(swaggerDocument, {
//         explorer: true,

//     })
// )
// 
app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
  });
