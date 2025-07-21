import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailService {
    private transporter;

    constructor(private readonly configService: ConfigService){
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: configService.get<string>('EMAIL_USER'),
                pass: configService.get<string>('EMAIL_PASS'),
            },
        });
    }

    async sendVerificationEmail(email: string, token: string) {
        const baseUrl = this.configService.get<string>('SERVER_URL') || 'http://localhost:3000';
        const url = `${baseUrl}/auth/verify-email?token=${token}`;
        await this.transporter.sendMail({
            from: this.configService.get<string>('EMAIL_USER'),
            to: email,
            subject: 'Verify Your Email',
            html: `<p>Please verify your email by clicking <a href="${url}">this link</a></p>`
        });
    }
}