import { transporter } from "../config/mail.config"
import { serverConfig } from "../config/server.config"

export const sendEmail = async(to:string, subject:string, body:string)=>{
    try {
        return await transporter.sendMail({
            from: serverConfig.USER,
            to,
            subject,
            html:body
        })
    } catch (error) {
        throw new Error("Error while sending email")
    }
}


