import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    public getValue(): string {
        return "api-sandbox";
    }
}
