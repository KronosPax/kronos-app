import {NextApiRequest, NextApiResponse} from "next"
import {connect} from "../../utils/connection"
import {ResponseFuncs} from "../../utils/types"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

    const catcher = (error: Error) => res.status(400).json({error})

    const handleCase: ResponseFuncs = {
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            const {User} = await connect()
            const userT = await User.findOne({email: req.body.email})

            if (userT != null) {
                const classIndex = userT.classes.findIndex((classObj: { _id: string }) => classObj._id === req.body.classId);

                const taskIndex = userT.classes[classIndex].tasks.findIndex((taskObj: { _id: string }) => taskObj._id === req.body.taskId);

                if (taskIndex !== -1) {
                    userT.classes[classIndex].tasks.splice(taskIndex, 1);
                    await userT.save();
                    res.status(200).json({message: "Task Deleted"})
                } else {
                    res.status(404).json({message: "Task not found"})
                }
            } else {
                res.status(404).json({message: "User not found"})
            }
        }
    }

    const response = handleCase[method]
    if (response) response(req, res)
    else res.status(400).json({error: "No Response for This Request"})
}

export default handler
