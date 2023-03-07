import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common/decorators';
import { TB_EVENTO_EXTERNO } from '@prisma/client';
import { PrismaService } from './Database/prisma.service';

@Controller('api')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('/evento')
  async getAll() {
    const eventos = await this.prisma.tB_EVENTO_EXTERNO.findMany();

    return { total: eventos.length, data: eventos };
  }

  @Get('/evento/:id')
  async getById(@Param('id') id: string) {
    const evento = await this.prisma.tB_EVENTO_EXTERNO.findUnique({
      where: { CO_SEQ_EVENTO: parseInt(id) },
    });

    return evento;
  }

  @Post('/evento')
  async create(@Body() command: TB_EVENTO_EXTERNO) {
    const evento = await this.prisma.tB_EVENTO_EXTERNO.create({
      data: {
        CO_RA: command.CO_RA,
        DS_EMAIL: command.DS_EMAIL,
        NO_EVENTO: command.NO_EVENTO,
        NU_IDADE_MINIMA: command.NU_IDADE_MINIMA,
        NU_PUBLICO_MAXIMO: command.NU_PUBLICO_MAXIMO,
        DS_EVENTO: command.DS_EVENTO,
        DS_INFORMACOES_ADICIONAIS: command.DS_INFORMACOES_ADICIONAIS,
        JS_CARACTERISTICAS_LOCAL: JSON.stringify(
          command.JS_CARACTERISTICAS_LOCAL,
        ),
        JS_NATUREZA_EVENTO: command.JS_NATUREZA_EVENTO,
        NU_QUANTIDADE_INGRESSO: command.NU_QUANTIDADE_INGRESSO,
        DS_WEBSITE: command.DS_WEBSITE,
      },
    });

    return evento;
  }

  @Get('/test')
  async getByQuery(@Query('query') query: string) {
    const jsonQuery = `$.caracteristicasLocal.${query}`;

    const evento = await this.prisma
      .$queryRaw`SELECT * FROM EVENTO.evento_externo.TB_EVENTO_EXTERNO
                 WHERE JSON_VALUE(JS_CARACTERISTICAS_LOCAL, ${jsonQuery}) = 'true'`;

    return evento;
  }

  @Delete('/evento/:id')
  async delete(@Param('id') id: string) {
    const evento = await this.prisma.tB_EVENTO_EXTERNO.delete({
      where: { CO_SEQ_EVENTO: parseInt(id) },
    });

    return evento;
  }

  private isJsonString(jsonString: string) {
    try {
      JSON.parse(jsonString);
    } catch (e) {
      return false;
    }

    return true;
  }
}
