import mongoose from 'mongoose'

const db = mongoose.connect(`${process.env.MONGO}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

export const establishConnection = async () => {
    return await db
}