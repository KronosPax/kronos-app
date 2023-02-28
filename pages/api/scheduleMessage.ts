import {NextApiRequest, NextApiResponse} from 'next';
import twilio from 'twilio';

export default function scheduleMessage(req: NextApiRequest, res: NextApiResponse) {
    const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
    const token = <string>process.env.TWILIO_AUTH_TOKEN;
    const messagingServiceSid = <string>process.env.TWILIO_MESSAGING_SID;
    const twilioPhone = <string>process.env.TWILIO_PHONE;
    const targetPhone = <string>process.env.TWILIO_TARGET_PHONE;
    const client = twilio(accountSid, token);
    const {message, dateDue} = req.body;


    client.messages
        .create({
            body: message,
            messagingServiceSid: messagingServiceSid,
            from: twilioPhone,
            to: targetPhone,
            scheduleType: 'fixed',
            sendAt: new Date(dateDue),
        })
        .then(() =>
            res.json({
                success: true,
            })
        )
        .catch((error) => {

            res.json({
                success: false,
            });
        });
}
