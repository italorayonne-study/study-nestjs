import { Controller, Get } from '@nestjs/common/decorators';
import { PrismaService } from './Database/prisma.service';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get('/evento')
  async getAll() {
    // const eventos = await this.prisma.tB_EVENTO.findMany();

    // return eventos;

    return { message: 'Hello World' };
  }

  // @Post('/evento')
  // async create(@Body() command: TB_EVENTO) {
  //   const evento = await this.prisma.tB_EVENTO.create({
  //     data: {
  //       Name: command.Name,
  //       CreatedAt: new Date(),
  //       DsEvento: command.DsEvento,
  //     },
  //   });

  //   return evento;
  // }
}
