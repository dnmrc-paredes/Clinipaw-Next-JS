import { NextApiHandler } from 'next'
// import {verify} from 'jsonwebtoken'

// Models
import { Appointment } from '../../../../db/models/appointment'

// Typescripts
import { Iappointment } from '../../../../ts/appointment'

const dashboard: NextApiHandler = async (req, res) => {

    const id = req.query.appointmentid as string
    
    try {

        if (req.method === "GET") {

            const appointment = await Appointment.findOne({_id: id}) as Iappointment | null | undefined

            return res.status(200).json({
                status: 'ok',
                data: appointment,
            })
        }
        
    } catch (err) {
        if (err.reason) {
            return res.status(400).json({
                status: 'fail',
                msg: 'Something went wrong.'
            })
        }

        throw Error ('Please try again.')
    }

}

export default dashboard