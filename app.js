const express           = require('express')
      bodyParser        = require('body-parser')
      graphqlHttp       = require('express-graphql') 
      mongoose          = require('mongoose')

      graphqlSchema     = require('./graphql/schema/index')
      graphqlResolvers  = require('./graphql/resolvers/index')  

      isAuth            = require('./middleware/is-auth')


const app = express()
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if(req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    next()
})
app.use(isAuth)
app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
})) 


mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-kng3h.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`)
    .then(() => { app.listen(3001, () => console.log('up on 3001. . .')) })
    .catch(err => { console.log(err) }) 
