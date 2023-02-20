import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../utils/connection"
import { ResponseFuncs } from "../../utils/types"
import {v4 as uuidv4} from "uuid"

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
            const userT = await User.findOne({email: req.body.email}) // find user by unique email

            if (userT != null){
                console.log("user exists")
                console.log(userT)

                console.log("creating new task")
                const newTask = {
                    _id: uuidv4(), // unique ID generation
                    taskName: req.body.taskName, // task name
                    desc: req.body.desc, // description
                    dateDue: req.body.dateDue,
                    isTextAlert: req.body.isTextAlert  // is true if customer wants alerts for their task
                }
                userT.task.push(newTask)

                await userT.save()
                console.log(userT)

                res.status(200).json({ message: "Task Created"})
            } else {
                res.status(404).json({ message: "User not found" })
            }

        }
    }

    // Check if there is a response for the particular method, if so invoke it, if not response with an error
    const response = handleCase[method]
    if (response) response(req, res)
    else res.status(400).json({ error: "No Response for This Request" })
}

export default handler