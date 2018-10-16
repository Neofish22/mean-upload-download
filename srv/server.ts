
import * as express from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose'
import * as methodOverride from 'method-override'
import * as cors from 'cors'

import { config } from './config'
import { api } from './api'

mongoose.connect(config.MONGO_URI,{useNewUrlParser:true})
  .catch((err: Error) => {
    console.error('MongoDB connection error.',err.message)
    console.error(err.stack)
  })
  .then(() => {
    const app: express.Application = express()

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.raw({limit:16000000000})) // 16MB, the limit of Mongo.
    app.use(methodOverride('X-HTTP-Method-Override'))
    app.use(cors())

    const port: number = Number(process.env.PORT || '8080')
    app.set('port',port)

    // Set the route path to Angular app.
    app.use('/',express.static(path.join(__dirname,'../front')))
    // Set the lib/auth0 path to node_modules for auth0.
    app.use('/lib/auth0-js/',express.static(path.join(__dirname,'../../node_modules/auth0-js')))

    // Setup routes.
    api(app)

    // Send anything not handled above to the index to be handled by Angular.
    app.get('*', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(__dirname,'../front/index.html'))
    })

    // Start the server.
    app.listen(port, () => {
      console.info('Server running on localhost:'+port)
    })
  })
