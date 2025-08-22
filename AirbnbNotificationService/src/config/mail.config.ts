
import nodemailer from 'nodemailer';
import { serverConfig } from './server.config';

export const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: `${serverConfig.USER}`,
        pass: `${serverConfig.PASS}`,
    },
})


