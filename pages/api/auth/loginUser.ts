import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/types"
import { compare } from "bcrypt"

// Called by nextauth signIn() compared recieved data against DB entries looks for match
// Using mongoose to interface with MongoDB instance, schema and model are defined in connections.ts
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    //capture request method, we type it as a key of ResponseFunc to reduce typing later
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

    //function for catch errors
    const catcher = (error: Error) => res.status(400).json({ error })

    // Potential Responses
    const handleCase: ResponseFuncs = {
        // RESPONSE FOR GET REQUESTS
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const { User } = await connect() // connect to database

            const user = await User.findOne({
                email: req.body.email})

            console.log(user)
            // compare() is for comparing plaintxt to hashed passwords with bcypt
            if (user !== null){
                compare(req.body.pwd, user.pwd, function(err, result) {
                    if (result) {
                        console.log("they match")
                        res.status(200).json(user);
                    }else{
                        res.status(200).json(null)
                    }
                });
            }else{
                res.status(200).json(null)
            }
        },
    }

    // Check if there is a response for the particular method, if so invoke it, if not response with an error
    const response = handleCase[method]
    if (response) response(req, res)
    else res.status(400).json({ error: "No Response for This Request" })
}

export default handler
