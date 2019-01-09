const express           = require('express')
      bodyParser        = require('body-parser')
      graphqlHttp       = require('express-graphql') 

const { buildSchema }   = require('graphql')

const app               = express()


app.use(bodyParser.json())
app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!,
        }
        type RootMutation {
            createEvent(name: String): String,
        }
        schema {
            query: RootQuery,
            mutation: RootMutation,
        }
    `),
    rootValue: {
        events: () => {
            return ['Comb the bear', 'All-Night Coding', 'Feed the Gods to Kronos',]
        },
        createEvent: (args) => {
            const eventName = args.name
            return eventName
        },
    },
    graphiql: true,
}))


app.listen(3000, () => { console.log('up on 3000') })
