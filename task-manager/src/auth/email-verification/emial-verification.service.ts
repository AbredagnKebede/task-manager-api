import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EmailVerification } from "./email-verification.entity";
import * as crypto from 'crypto';

export class EmailVerificationService {
    constructor(
        @InjectRepository(EmailVerification)
        private readonly verificationRepo: Repository<EmailVerification>,
    ) {}

    async generateToken(userId: number): Promise<string> {
        const token = crypto.randomBytes(32).toString('hex');
        const entity = this.verificationRepo.create({userId, token});
        await this.verificationRepo.save(entity);
        return token;
    }

    async verifyToken(token: string): Promise<number | null> {
        const record = await this.verificationRepo.findOneBy({token});
        if(!record) return null;

        await this.verificationRepo.delete({token});
        return record.userId;
    }
}

