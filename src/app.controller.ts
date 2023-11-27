import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //metodo para obtener los usuarios de la base de datos
  @Get('allUsers')
  getUsers() {
    return this.appService.getAllUsers();
  }
}
