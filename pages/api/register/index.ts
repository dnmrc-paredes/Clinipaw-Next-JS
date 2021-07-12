import type { NextApiHandler } from 'next'
import { establishConnection } from '../../../db/connection'
import {hash} from 'bcryptjs'

// Models
import {User} from '../../../db/models/user'

establishConnection()

const Register: NextApiHandler = async (req, res) => {

    const {email, password, name} = req.body as {email: string, password: string, name: string}

    try {

        switch (req.method) {
            case 'POST':

                const hashedPass = await hash(password, 10)

                const newAdmin = new User({
                    name,
                    email,
                    password: hashedPass
                })

                await newAdmin.save()

                return res.status(201).json({
                    status: 'ok',
                    msg: 'User Created.'
                })

            default: 
                return
        }
        
    } catch (err) {
        
        if (err.code === 11000) {
            return res.json({
                status: 'fail',
                msg: 'Email already exists'
            })
        }

        throw Error ('Please try again.')
    }

}

export default Register