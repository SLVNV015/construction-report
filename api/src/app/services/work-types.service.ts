import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkType } from '../entities/work-type.entity';
import { CreateWorkTypeDto } from '../dto/create-work-type.dto';

@Injectable()
export class WorkTypesService {
  constructor(
    @InjectRepository(WorkType)
    private workTypesRepository: Repository<WorkType>,
  ) {}

  async create(createWorkTypeDto: CreateWorkTypeDto): Promise<WorkType> {
    const workType = this.workTypesRepository.create(createWorkTypeDto);
    return this.workTypesRepository.save(workType);
  }

  async findAll(): Promise<WorkType[]> {
    return this.workTypesRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<WorkType | null> {
    return this.workTypesRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.workTypesRepository.delete(id);
  }
}
