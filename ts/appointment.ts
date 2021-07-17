import { Document } from "mongoose";

export interface Iappointment extends Document {
    name: string
    email: string
    phone: number
    date: Date
    kind: string
    msg: string
    status: boolean
    isCancelled: boolean
}