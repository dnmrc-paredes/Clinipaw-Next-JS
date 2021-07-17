import type { NextApiHandler } from 'next'
import nodemailer from 'nodemailer'
import { establishConnection } from '../../../db/connection'
import { Appointment } from '../../../db/models/appointment'

establishConnection()

const setAppointment: NextApiHandler = async (req, res) => {

    const {name, email, phone, date, kind, msg} = req.body as {name: string, email: string, phone: string, date: Date, kind: string, msg: string}

    try {

        if (req.method === "POST") {

            const html = `
                <p> You appointment is in <strong> ${new Date(date).toDateString()} </strong> </p>
                <h3> Your Concern: </h3>
                <p> ${msg} </p>
            `

            const newAppointment = new Appointment({
                name,
                email,
                phone,
                date,
                kind,
                msg,
                status: false,
                isCancelled: false
            })

            await newAppointment.save()

            const transporter = nodemailer.createTransport({
                name: 'CliniPaw',
                service: "gmail",
                auth: {
                    user: `${process.env.NODEMAILER_EMAIL}`,
                    pass: `${process.env.NODEMAILER_PASS}`
                }
            })

            const mailOptions = {
                from: ' "CliniPaw" <dummyonly123098@gmail.com> ',
                to: email,
                subject: "Appoinment Set",
                text: 'Hello',
                html
            }

            const mailResult = await transporter.sendMail(mailOptions)
        
            if (mailResult.messageId) {
                return res.status(200).json({
                    status: 'ok',
                    msg: 'Appointment Created.'
                })
            }

        }
        
    } catch (err) {
        throw Error ('Please try again.')
    }

}

export default setAppointment