import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operation } from '../entities/operation.entity';
import { CreateOperationDto } from '../dto/create-operation.dto';
import { UpdateOperationDto } from '../dto/update-operation.dto';
import { FilterOperationsDto } from '../dto/filter-operations.dto';

@Injectable()
export class OperationsService {
  constructor(
    @InjectRepository(Operation)
    private operationsRepository: Repository<Operation>,
  ) {}

  async create(createOperationDto: CreateOperationDto): Promise<Operation> {
    const operation = this.operationsRepository.create({
      ...createOperationDto,
      workType: { id: createOperationDto.workTypeId },
    });
    return this.operationsRepository.save(operation);
  }

  async findAll(filters?: FilterOperationsDto): Promise<Operation[]> {
    const query = this.operationsRepository
      .createQueryBuilder('operation')
      .leftJoinAndSelect('operation.workType', 'workType')
      .orderBy('operation.start_time', 'DESC');

    if (filters?.dateFrom) {
      query.andWhere('DATE(operation.start_time) >= :dateFrom', {
        dateFrom: filters.dateFrom,
      });
    }

    if (filters?.dateTo) {
      query.andWhere('DATE(operation.start_time) <= :dateTo', {
        dateTo: filters.dateTo,
      });
    }

    if (filters?.workerName) {
      query.andWhere('operation.workerName ILIKE :workerName', {
        workerName: `%${filters.workerName}%`,
      });
    }

    if (filters?.workTypeId) {
      query.andWhere('operation.work_type_id = :workTypeId', {
        workTypeId: filters.workTypeId,
      });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Operation | null> {
    return this.operationsRepository.findOne({
      where: { id },
      relations: {
        workType: true,
      },
    });
  }

  async update(
    id: string,
    updateOperationDto: UpdateOperationDto,
  ): Promise<Operation> {
    const operation = await this.findOne(id);
    if (!operation) {
      throw new Error('Operation not found');
    }

    if (updateOperationDto.workTypeId) {
      operation.workType = { id: updateOperationDto.workTypeId } as any;
    }

    Object.assign(operation, updateOperationDto);
    return this.operationsRepository.save(operation);
  }

  async remove(id: string): Promise<void> {
    await this.operationsRepository.delete(id);
  }
}
