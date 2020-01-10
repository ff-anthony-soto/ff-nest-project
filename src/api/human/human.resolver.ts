import { Resolver, Query, Args, Mutation, ResolveProperty, Parent } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';

import { Human } from './model/human';
import { HumanArgs } from './dto/human.args';
import { HumanService } from '../human/human.service';
import { CreateHumanInput } from './dto/create-human.input';

import { Cat } from '../cat/model/cat';

import { IDataloader } from '@shared/modules/dataloader/model/dataloader.interface';
import { Dataloader } from '@shared/modules/dataloader/dataloader.decorator';

@Resolver(of => Human)
export class HumanResolver {
  constructor(private readonly humanService: HumanService) {}
  @Query(of => [Human])
  public humans(@Args() humanArgs: HumanArgs): Promise<Human[]> {
    return this.humanService.findAll(humanArgs);
  }

  @Query(of => Human)
  public human(@Args('id') id: number): Promise<Human> {
    const cat = this.humanService.findOneById(id);
    if (!cat) {
      throw new NotFoundException(id);
    }
    return cat;
  }

  @Mutation(of => Human)
  public createHuman(@Args('data') data: CreateHumanInput): Promise<Human> {
    return this.humanService.create(data);
  }

  @Mutation(of => Boolean)
  public deleteHuman(@Args('id') id: number) {
    return this.humanService.remove(id);
  }

  @ResolveProperty(() => Cat)
  async cats(@Parent() human: Human, @Dataloader() { humanCatsDataloader }: IDataloader): Promise<Cat[]> {
    return await humanCatsDataloader.load(human.id || -1);
  }
}
