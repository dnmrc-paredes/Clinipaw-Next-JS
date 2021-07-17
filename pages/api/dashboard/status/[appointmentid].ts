import { NextApiHandler } from 'next'

// Models
import { Appointment } from '../../../../db/models/appointment'

// Typescripts
import { Iappointment } from '../../../../ts/appointment'

const toggleStatus: NextApiHandler = async (req, res) => {

    const appointmentId = req.query.appointmentid

    try {

        switch(req.method) {
            case 'PATCH':

            const theAppointment = await Appointment.findById(appointmentId) as Iappointment

            await Appointment.findOneAndUpdate({_id: appointmentId}, {
                status: !theAppointment.status
            })

            return res.status(202).json({
                status: 'ok',
                msg: 'Updated Successfully!'
            })
                
            default: 
                ""
        }
        
    } catch (err) {
        throw Error ('Please try again.')
    }

}

export default toggleStatus