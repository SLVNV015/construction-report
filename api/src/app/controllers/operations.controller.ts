import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { OperationsService } from '../services/operations.service';
import {
  type CreateOperationDto,
  createOperationSchema,
} from '../dto/create-operation.dto';
import {
  type UpdateOperationDto,
  updateOperationSchema,
} from '../dto/update-operation.dto';
import {
  type FilterOperationsDto,
  filterOperationsSchema,
} from '../dto/filter-operations.dto';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

@ApiTags('operations')
@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать операцию' })
  @ApiResponse({ status: 201, description: 'Операция успешно создана' })
  @ApiResponse({ status: 400, description: 'Ошибка валидации' })
  @UsePipes(new ZodValidationPipe(createOperationSchema))
  create(@Body() createOperationDto: CreateOperationDto) {
    return this.operationsService.create(createOperationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все операции' })
  @ApiQuery({
    name: 'dateFrom',
    required: false,
    description: 'Дата от (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'dateTo',
    required: false,
    description: 'Дата до (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'workerName',
    required: false,
    description: 'Поиск по ФИО работника',
  })
  @ApiQuery({
    name: 'workTypeId',
    required: false,
    description: 'UUID вида работ',
  })
  @ApiResponse({ status: 200, description: 'Список операций' })
  findAll(
    @Query(new ZodValidationPipe(filterOperationsSchema))
    filters: FilterOperationsDto,
  ) {
    return this.operationsService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить операцию по ID' })
  @ApiResponse({ status: 200, description: 'Операция найдена' })
  @ApiResponse({ status: 404, description: 'Операция не найдена' })
  findOne(@Param('id') id: string) {
    return this.operationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить операцию' })
  @ApiResponse({ status: 200, description: 'Операция обновлена' })
  @ApiResponse({ status: 404, description: 'Операция не найдена' })
  @UsePipes(new ZodValidationPipe(updateOperationSchema))
  update(
    @Param('id') id: string,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    return this.operationsService.update(id, updateOperationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить операцию' })
  @ApiResponse({ status: 200, description: 'Операция удалена' })
  @ApiResponse({ status: 404, description: 'Операция не найдена' })
  remove(@Param('id') id: string) {
    return this.operationsService.remove(id);
  }
}
