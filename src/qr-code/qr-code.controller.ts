import { Controller, Get, Query } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';

@Controller('qr-code')
export class QrCodeController {
  constructor(private readonly qrCodeService: QrCodeService) {}

  @Get('generate')
  async generateQRCode(@Query('data') data: string) {
    const qrCode = await this.qrCodeService.generateQRCode(data);
    return { qrCode };
  }
}
