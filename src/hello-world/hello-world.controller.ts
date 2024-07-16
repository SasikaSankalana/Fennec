import { Controller, Get } from '@nestjs/common';

@Controller('hello-world')
export class HelloWorldController {
  @Get()
  getHelloWorld() {
    return 'Hello World!';
  }
}
