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

            const appointment = await Appointment.findOne({_id: id}) as Iappointment | null | undefined

            console.log(!appointment)

            return res.status(200).json({
                status: 'ok',
                data: appointment,
            })
        }
        
    } catch (err) {
        if (err.reason) {
            // console.log('yawa')
            return res.status(400).json({
                status: 'fail',
                msg: 'Something went wrong.'
            })
        }

        throw Error ('Please try again.')
    }

}

export default dashboard