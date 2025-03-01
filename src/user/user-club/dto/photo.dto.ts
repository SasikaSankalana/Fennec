import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export class photoDto {
  file: MulterField;
}
