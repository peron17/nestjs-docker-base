import { HttpException } from "@nestjs/common";
import { HttpStatusCode } from "axios";

export const JtwParser = (authorization: string) => {
    const base64Payload = authorization.split('.');
    if (base64Payload.length < 1) {
        throw new HttpException('Format Bearer Invalid!', HttpStatusCode.Unauthorized);
    }

    const payloadBuffer = Buffer.from(base64Payload[1], 'base64');
    const user = JSON.parse(payloadBuffer.toString());
    return user;
}