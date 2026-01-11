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

        // 2. SEND EMAIL (Updated with Social Links)
        const { data, error } = await resend.emails.send({
            from: 'Builders Grant <team@buildersgrant.com>',
            to: [email],
            subject: 'You’re in. Let’s build.',
            html: `
            <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
                <p>Hey ${name || 'there'},</p>
                
                <p>You’re now on the <strong>BuilderGrant</strong> waitlist.</p>

                <p>That might sound small — but it’s not.</p>
                <p>It means you’re someone who’s already thinking about building instead of just waiting for permission.</p>

                <p>Over the next few weeks, we’ll be:</p>
                <ul>
                    <li>Sharing what other student builders are working on</li>
                    <li>Sharing frameworks & tips on how to be consistent</li>
                    <li>Getting ready to open <strong>Cohort Zero</strong> for a small group of people who actually ship!</li>
                </ul>

                <p>When applications open, you’ll get early access.</p>

                <p>In the meantime, do one simple thing:<br>
                <strong>Keep building.</strong><br>
                Even if it’s messy. Even if no one’s watching yet.</p>

                <p>We’re watching now.</p>

                <p>Team BuilderGrant</p>

                <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
                
                <p style="font-size: 14px; color: #666;">
                    P.S. If you’re comfortable sharing, reply and tell us what you’re building. We read every one.
                </p>

                <p style="font-size: 14px;">
                    <a href="https://x.com/buildersgrant" style="color: #000; text-decoration: none; margin-right: 15px;">Follow on X</a>
                    <a href="https://www.linkedin.com/company/builders-grant/?viewAsMember=true" style="color: #0077b5; text-decoration: none;">Connect on LinkedIn</a>
                </p>
            </div>`,
        });

        if (error) {
            console.error("Resend Error:", error);
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ success: true, id: data?.id });

    } catch (err: any) {
        console.error('Server Error:', err);
        return res.status(500).json({ error: err.message });
    }
}