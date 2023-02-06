import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/types"
import { hash } from "bcrypt"

// Registers user to mongoDB instance
// Using mongoose to interface with MongoDB instance, schema and model are defined in connections.ts
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    //capture request method, we type it as a key of ResponseFunc to reduce typing later
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

    //function for catch errors
    const catcher = (error: Error) => res.status(400).json({ error })

    // Potential Responses
    const handleCase: ResponseFuncs = {
        // RESPONSE POST REQUESTS
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const { User } = await connect() // connect to database
            if (await User.findOne({
                email: req.body.email}) !== null){
                    console.log("user exist")
                    res.status(400).json({ error: "Email in Use" })
            }else{
                // hash() is used to create password hash to store in mongoDB instance
                console.log("creating new user")
                const saltRounds = 10;
                hash(req.body.pwd, saltRounds, async function (err, hash) {
                    req.body.pwd = hash
                    await User.create(req.body).catch(catcher)
                    res.status(200).json({ message: "User Created" })});
            }
        },
    }

    // Check if there is a response for the particular method, if so invoke it, if not response with an error
    const response = handleCase[method]
    if (response) response(req, res)
    else res.status(400).json({ error: "No Response for This Request" })
}

export default handler
