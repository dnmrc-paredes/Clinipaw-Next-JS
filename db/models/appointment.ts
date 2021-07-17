import { model, models, Schema } from "mongoose";

// Interface
import { Iappointment } from "../../ts/appointment";

const appointmentSchema = new Schema({
    name: String,
    email: String,
    phone: Number,
    date: Date,
    kind: String,
    msg: String,
    status: {
        type: Boolean,
        default: false
    },
    isCancelled: {
        type: Boolean,
        default: false
    }
})

export const Appointment = models['Appointment'] || model<Iappointment>('Appointment', appointmentSchema)