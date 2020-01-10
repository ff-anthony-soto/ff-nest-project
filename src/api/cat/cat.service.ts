import { Repository, In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Cat } from './model/cat';
import { CatArgs } from './dto/cat.args';
import { CreateCatInput } from './dto/create-cat.input';
import { Cat as CatEntity } from '@shared/datasource/database/model/cat.entity';
import { CatHuman as CatHumanEntity } from '@shared/datasource/database/model/cat-human.entity';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(CatEntity)
    private readonly catRepository: Repository<CatEntity>,
    @InjectRepository(CatHumanEntity)
    private readonly catHumanRepository: Repository<CatHumanEntity>,
  ) {}

  public batchByHumans = async (humanKeys: number[]) => {
    return this.catHumanRepository.find({ where: { humanId: In(humanKeys) }, relations: ['cat'] });
  };

  public batchByBreeds = async (breedKeys: number[]) => {
    return this.catRepository.find({ where: { breedId: In(breedKeys) } });
  };

  public findAll = async (catArgs: CatArgs): Promise<Cat[]> => {
    return await this.catRepository.find();
  };

  public create = async (data: CreateCatInput): Promise<Cat> => {
    return await this.catRepository.save({ ...data });
  };

  public findOneById = async (id: number): Promise<Cat> => {
    return await this.catRepository.findOne(id);
  };

  public remove = async (id: number): Promise<boolean> => {
    const response = await this.catRepository.delete({ id });
    return response.affected === 1;
  };
}
