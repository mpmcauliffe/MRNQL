const bcrypt            = require('bcryptjs')
      jwt               = require('jsonwebtoken')
      User              = require('../../models/user')

      userKey           = require('../../config/userKey.json')


module.exports = {
    createUser: async args => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email })
            if (existingUser) { throw new Error('User exists already.') }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12) 
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword,
            }) 
            const result = await user.save() 
            return { ...result._doc, password: null, _id: result.id } 
        } catch (err) { throw err } 
    },
    login: async ({email, password}) => {
        const user = await User.findOne({ email: email })
        if(!user) { throw new Error('User DNE!') }

        const isEqual =  await bcrypt.compare(password, user.password)
        if(!isEqual) { throw new Error('Input invalid') }

        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email 
            }, 
            userKey['JWT_SECRET'],
            {
                expiresIn: '1h'
            }
        )

        return {
            userId: user.id,
            token: token,
            tokenExpiration: 1,
        }
    }
}
