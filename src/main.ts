import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import {
  DocumentBuilder,
  SwaggerModule,
} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  const config = new DocumentBuilder()
    .setTitle("API DOCUMENTATION")
    .setDescription("API")
    .setVersion("1.0")
    .addTag("APIs")
    .build();
  const document = SwaggerModule.createDocument(
    app,
    config
  );

  SwaggerModule.setup("docs", app, document, {
    customSiteTitle: "Api Docs",
    customfavIcon:
      "https://avatars.githubusercontent.com/u/6936373?s=200&v=4",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js",
    ],
    customCssUrl: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css",
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  await app.listen(3333);
}
bootstrap();
