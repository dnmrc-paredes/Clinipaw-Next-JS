import type { NextApiHandler } from 'next'
import { establishConnection } from '../../../db/connection'
import {compare} from 'bcryptjs'
import {sign} from 'jsonwebtoken'

// Models
import {User} from '../../../db/models/user'

establishConnection()

const Login: NextApiHandler = async (req, res) => {

    const {email, password} = req.body as {email: string, password: string}

    try {

        switch (req.method) {
            case 'POST': 
    
            const foundUser = await User.findOne({email})
            
            if (!foundUser) {
                return res.json({
                    status: 'fail',
                    msg: "User doesn't exist."
                })
            }
            
            const result = await compare(password, foundUser.password)
            
            if (!result) {
                return res.json({
                    status: 'fail',
                    msg: 'Invalid Email / Password'
                })
            }

            const token = sign({id: foundUser._id}, process.env.JWT_KEY as string)

            return res.json({
                status: 'ok',
                msg: 'Successfully Logged In.',
                token,
                data: foundUser
            })

            default: 
                return
        }
        
    } catch (err) {
        throw Error ('Please try again.')
    }

}

export default Login