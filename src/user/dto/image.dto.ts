import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { IsNotEmpty } from 'class-validator';

export class ImageDto {
  @IsNotEmpty()
  image: MulterField;
}
