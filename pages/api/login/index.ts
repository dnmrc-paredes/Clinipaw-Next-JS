import type { NextApiHandler } from 'next'
import { establishConnection } from '../../../db/connection'

establishConnection()

const Login: NextApiHandler = async (req, res) => {

    const {email, password} = req.body as {email: string, password: string}

    try {

        switch (req.method) {
            case 'POST': 
                console.log(email, password)
            default: 
                return
        }
        
    } catch (err) {
        throw Error ('Please try again.')
    }

}

export default Login