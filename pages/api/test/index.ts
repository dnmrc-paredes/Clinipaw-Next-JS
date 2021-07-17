import { NextApiHandler } from 'next'

const testRoute: NextApiHandler = (req, res) => {

    return res.status(200).json({
        msg: 'Hello from CliniPaw.'
    })

}

export default testRoute