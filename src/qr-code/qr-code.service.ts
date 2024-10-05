import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'nestjs-config';
import { config } from 'process';
import * as QRCode from 'qrcode';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QrCodeService {
  constructor(
    // private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async generateQRCode(data: any) {
    const payload = data;
    const token = this.jwtService.sign(payload, {
      secret: ConfigService.get('QR_TOKEN_SECRET'),
      expiresIn: '10m',
    });

    return new Promise((resolve, reject) => {
      QRCode.toDataURL(token, (err, url) => {
        if (err) {
          reject('Error generating QR Code');
        } else {
          resolve(url);
        }
      });
    });
  }
}

// const qrData = `${process.env.QR_MODULE_URL}?token=${token}`;
