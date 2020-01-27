import { Repository, In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Human } from './model/human';
import { HumanArgs } from './dto/human.args';
import { CreateHumanInput } from './dto/create-human.input';
import { Human as HumanEntity } from '@shared/datasource/database/model/human.entity';
import { CatHuman as CatHumanEntity } from '@shared/datasource/database/model/cat-human.entity';
import { FileService } from '@shared/modules/file/file.service';

@Injectable()
export class HumanService {
  constructor(
    private readonly fileService: FileService,
    @InjectRepository(HumanEntity)
    private readonly humanRepository: Repository<HumanEntity>,
    @InjectRepository(CatHumanEntity)
    private readonly catHumanRepository: Repository<CatHumanEntity>,
  ) {}

  public batch = async (catKeys: number[]) => {
    return this.catHumanRepository.find({ where: { catId: In(catKeys) }, relations: ['human'] });
  };

  public findAll = async (catArgs: HumanArgs): Promise<Human[]> => {
    return await this.humanRepository.find();
  };

  public create = async ({ firstName, lastName, base64Picture }: CreateHumanInput): Promise<Human> => {
    const { Location: picture } = await this.fileService.uploadFile(base64Picture, 'profile.png');
    return await this.humanRepository.save({ firstName, lastName, picture });
  };

  public findOneById = async (id: number): Promise<Human> => {
    return await this.humanRepository.findOne(id);
  };

  public remove = async (id: number): Promise<boolean> => {
    const response = await this.humanRepository.delete({ id });
    return response.affected === 1;
  };
}
