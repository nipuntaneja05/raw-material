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

        // 1. SAVE THE USER (This was missing!)
        // This adds them to your Resend "Audience" list automatically.
        await resend.contacts.create({
            email: email,
            firstName: name || '',
            unsubscribed: false,
        });

        // 2. SEND THE EMAIL (Updated to your real domain)
        await resend.emails.send({
            // Use your 'send' subdomain you just verified:
            from: 'Builders Grant <team@send.buildersgrant.com>',
            to: email,
            subject: 'Welcome to the Waitlist! 🚀',
            html: `<p>Hi ${name || 'there'},</p><p>Thanks for joining our waitlist! We will be in touch soon.</p>`,
        });

        return res.status(200).json({ success: true });

    } catch (error) {
        console.error('Waitlist error:', error);
        return res.status(500).json({ error: 'Failed to join waitlist' });
    }
}