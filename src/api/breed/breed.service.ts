import { Breed } from './model/breed';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Breed as BreedEntity } from '@datasource/database/model/breed.entity';
import { BreedArgs } from './dto/breed.args';
import { CreateBreedInput } from './dto/create-breed.input';

@Injectable()
export class BreedService {
  constructor(
    @InjectRepository(BreedEntity)
    private readonly breedRepository: Repository<BreedEntity>,
  ) {}

  public batch = async (breedKeys: number[]) => {
    return this.breedRepository.findByIds(breedKeys);
  };

  public findAll = async (breedArgs: BreedArgs): Promise<Breed[]> => {
    return await this.breedRepository.find();
  };

  public create = async (data: CreateBreedInput): Promise<Breed> => {
    return await this.breedRepository.save({ ...data });
  };

  public findOneById = async (id: number): Promise<Breed> => {
    return await this.breedRepository.findOne(id);
  };

  public remove = async (id: number): Promise<boolean> => {
    const response = await this.breedRepository.delete({ id });
    return response.affected === 1;
  };
}
