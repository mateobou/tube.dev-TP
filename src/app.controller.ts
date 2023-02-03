import { Controller, Get, UseGuards, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  @UseGuards(AuthGuard('local'))
  async login(@Request() req: Request, @Response() res: Response) {
    return req.user;
  }
}
