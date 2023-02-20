import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../utils/connection"
import { ResponseFuncs } from "../../utils/types"

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
            const {User} = await connect() // connect to database

            const user = await User.findOne({
                email: req.body.email
            }) // find user by unique email

            console.log("creating new task")

            if (await User.findOneAndUpdate({className: req.body.className}) !== null) {
                // isTextAlert // is true when user wants text notification
                taskName: req.body.taskName // task name
                desc: req.body.desc // description
                dateDue: req.body.dateDue // due date
                await User.updateOne(req.body).catch(catcher)
                console.log("creating new task")
                res.status(200).json({message: "Task Created"})
                // edit task
                // delete task

                // if class doesn't exist throw 200 error
            }
            else
            {
                res.status(200).json(null) // if no user exists error 200 is given back
            }
        }
    }

    // Check if there is a response for the particular method, if so invoke it, if not response with an error
    const response = handleCase[method]
    if (response) response(req, res)
    else res.status(400).json({ error: "No Response for This Request" })
}

export default handler