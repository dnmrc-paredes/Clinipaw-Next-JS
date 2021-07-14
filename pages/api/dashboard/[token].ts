import { NextApiHandler } from 'next'
import {verify} from 'jsonwebtoken'

// Models
import { Appointment } from '../../../db/models/appointment'

// Typescripts
import { Iappointment } from '../../../ts/appointment'

const dashboard: NextApiHandler = async (req, res) => {

    const token = req.query.token as string
    const verifiedToken = verify(token, process.env.JWT_KEY as string) as {id: string, iat: number}

    try {

        if (req.method === "GET") {

            if (!verifiedToken) {
                return res.json({
                    status: 'fail',
                    msg: 'Invalid Token.'
                })
            }

            const allAppointments = await Appointment.find() as Iappointment[]
            
            return res.status(200).json({
                status: 'ok',
                data: allAppointments,
            })
        }
        
    } catch (err) {
        throw Error ('Please try again.')
    }

}

export default dashboard