import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

export default function sendMessage(req: NextApiRequest, res: NextApiResponse) {
    const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
    const token = <string>process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, token);
    const { phone, message, dueDate } = req.body;
    // console.log(phone, message);

    // proper ISO 8601 formatted datetime string: new Date("2023-02-25T16:31:00")

    client.messages
        .create({
            body: message,
            messagingServiceSid: 'MG47d922c75d147d3df96f7a8c299ae03d',
            from: '+18146798026',
            to: phone,
            scheduleType: 'fixed',
            sendAt: dueDate,
        })
        .then((message) =>
            res.json({
                success: true,
            })
        )
        .catch((error) => {
            console.log(error);
            res.json({
                success: false,
            });
        });
}
