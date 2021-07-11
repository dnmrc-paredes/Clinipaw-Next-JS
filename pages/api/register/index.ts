import type { NextApiHandler } from 'next'
import { establishConnection } from '../../../db/connection'

establishConnection()

const Register: NextApiHandler = async (req, res) => {

    const {email, password, name} = req.body as {email: string, password: string, name: string}

    try {

        switch (req.method) {
            case 'POST': 
                console.log(email, password, name)
            default: 
                return
        }
        
    } catch (err) {
        throw Error ('Please try again.')
    }

}

export default Register