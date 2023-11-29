import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

  
}
