import { model, models, Schema } from 'mongoose'

import { Iuser } from '../../ts/user'

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

export const User = models['User'] || model<Iuser>('User', userSchema)