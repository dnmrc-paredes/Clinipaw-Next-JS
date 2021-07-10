import type { NextApiHandler } from 'next'
import { establishConnection } from '../../../db/connection'
import { Appointment } from '../../../db/models/appointment'

establishConnection()

const setAppointment: NextApiHandler = async (req, res) => {

    const {name, email, phone, date, kind, msg} = req.body as {name: string, email: string, phone: string, date: string, kind: string, msg: string}

    try {

        const newAppointment = new Appointment({
            name,
            email,
            phone,
            date,
            kind,
            msg
        })

        await newAppointment.save()

        return res.status(200).json({
            status: 'ok',
            msg: 'Appointment Created.'
        })
        
    } catch (err) {
        throw Error ('Please try again.')
    }

}

export default setAppointment