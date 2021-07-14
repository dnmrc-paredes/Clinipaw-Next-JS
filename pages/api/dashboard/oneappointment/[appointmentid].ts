import { NextApiHandler } from 'next'
// import {verify} from 'jsonwebtoken'

// Models
import { Appointment } from '../../../../db/models/appointment'

// Typescripts
import { Iappointment } from '../../../../ts/appointment'

const dashboard: NextApiHandler = async (req, res) => {

    const id = req.query.appointmentid as string
    // const verifiedToken = verify(token, process.env.JWT_KEY as string) as {id: string, iat: number}

    try {

        if (req.method === "GET") {

            const appointment = await Appointment.findOne({_id: id}) as Iappointment
            
            return res.status(200).json({
                status: 'ok',
                data: appointment,
            })
        }
        
    } catch (err) {
        throw Error ('Please try again.')
    }

}

export default dashboard