import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WorkTypesService } from '../services/work-types.service';
import {
  type CreateWorkTypeDto,
  createWorkTypeSchema,
} from '../dto/create-work-type.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

@ApiTags('work-types')
@Controller('work-types')
export class WorkTypesController {
  constructor(private readonly workTypesService: WorkTypesService) {}

  @Post()
  @ApiOperation({ summary: 'Создать вид работ' })
  @ApiResponse({ status: 201, description: 'Вид работ создан' })
  @UsePipes(new ZodValidationPipe(createWorkTypeSchema))
  create(@Body() createWorkTypeDto: CreateWorkTypeDto) {
    return this.workTypesService.create(createWorkTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все виды работ' })
  @ApiResponse({ status: 200, description: 'Список видов работ' })
  findAll() {
    return this.workTypesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить вид работ по ID' })
  @ApiResponse({ status: 200, description: 'Вид работ найден' })
  findOne(@Param('id') id: string) {
    return this.workTypesService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить вид работ' })
  @ApiResponse({ status: 200, description: 'Вид работ удален' })
  remove(@Param('id') id: string) {
    return this.workTypesService.remove(id);
  }
}
