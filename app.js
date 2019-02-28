const express           = require('express')
      bodyParser        = require('body-parser')
      graphqlHttp       = require('express-graphql') 
      mongoose          = require('mongoose')

const { buildSchema }   = require('graphql')

const Event             = require('./models/event')
const User              = require('./models/user')

const app               = express()


app.use(bodyParser.json())
app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        type User {
            _id: ID!
            email: String!
            password: String
        }
        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        input UserInput {
            email: String!
            password: String!
        }
        type RootQuery {
            events: [Event!]!
        }
        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return Event
                .find()
                .then(events => {
                    return events.map(event => {
                        return { ...event._doc, _id: event.id }
                    })
                })
                .catch(err => {
                    throw err
                })
        },
        createEvent: args => {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date),
            })
            return event
            .save()
            .then(result => {
                console.log(result)
                return { ...result._doc, _id: event._doc._id.toString() }
            })
            .catch(err => {
                console.log(err)
                throw err;
            })
        },
        createUser: args => {
            const user = new User({
                email: args.userInput.email,
                password: args.userInput.password,
            })
        },
    },
    graphiql: true,
}))


mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-kng3h.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
).then(() => {
    app.listen(3000, () => { console.log('up on 3000') })
}).catch(err => {
    console.log(err)
})
