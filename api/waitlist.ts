import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email, name } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        // 1. ADD CONTACT
        await resend.contacts.create({
            email: email,
            firstName: name || '',
            unsubscribed: false,
        });

        // 2. SEND EMAIL (With Error Checking!)
        const { data, error } = await resend.emails.send({
            from: 'Builders Grant <team@send.buildersgrant.com>',
            to: [email],
            subject: 'Welcome to the Waitlist! 🚀',
            html: `<p>Hi ${name || 'there'},</p><p>Thanks for joining our waitlist! We will be in touch soon.</p>`,
        });

        // 🛑 STOP HERE if Resend gave an error
        if (error) {
            console.error("Resend Error:", error);
            return res.status(400).json({ error: error.message });
        }

        // Only return success if both steps worked
        return res.status(200).json({ success: true, id: data?.id });

    } catch (err: any) {
        console.error('Server Error:', err);
        return res.status(500).json({ error: err.message });
    }
}