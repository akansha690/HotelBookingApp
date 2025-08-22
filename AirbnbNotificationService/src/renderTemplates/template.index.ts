import Handlebars from "handlebars";
import fs from 'fs/promises';
import path from "path";

export const renderTemplate = async(templateId:string, params:Record<string, any>)=>{
    const templatePath = path.join(__dirname, 'mailer', `${templateId}.hbs`); 
    try {
        const content = await fs.readFile(templatePath, 'utf8');
        const finalTemplate  = Handlebars.compile(content);
        return finalTemplate(params);
    } catch (error) {
        throw new Error("Rendering of template is not done.")
    }
}