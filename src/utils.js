import { adjectives, nouns } from './words';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);

    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = (email) => {
    const options = {
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    };

    const client = nodemailer.createTransport(options);

    try {
        return client.sendMail(email);
    } catch (e) {
        console.log(e);
    }
};

export const sendSecretMail = (address, secret) => {
    const email = {
        from: 'jhs851@prismgram.com',
        to: address,
        subject: '🔒 Login Secret for Prismgram 🔒',
        html: `Hello! Your login secret is <strong>${secret}</strong>.<br>Copy paste on the app/website to login.`
    };

    return sendMail(email);
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);