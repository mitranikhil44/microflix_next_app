// postContact.js
import connectToDatabase from './database/db';
import { Contact } from './database/contactSchema';

export default async function handler(req, res) {
    try {
        await connectToDatabase();

        if (req.method === 'POST') {
            const newContact = new Contact({
                name: req.body.name,
                email: req.body.email,
                message: req.body.message,
            });

            await newContact.save();
            res.status(200).json({ Success: 'Thank You' });
        } else {
            res.status(400).json({ Error: 'Invalid Request Method' });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ Error: 'Internal Server Error' });
    }
}
