import { Resolver, Query, Args, Mutation, ResolveProperty, Parent } from '@nestjs/graphql';
import { NotFoundException, UseGuards } from '@nestjs/common';

import { Cat } from './model/cat';
import { CatArgs } from './dto/cat.args';
import { CatService } from './cat.service';
import { CreateCatInput } from './dto/create-cat.input';

import { Human } from '@api/human/model/human';

import { Dataloader } from '@shared/modules/dataloader/dataloader.decorator';
import { IDataloader } from '@shared/modules/dataloader/model/dataloader.interface';
import { RolesGuard } from '@shared/auth/guards/roles.guard';
import { Roles } from '@shared/auth/decorators/roles.decorator';
import { Breed } from '@api/breed/model/breed';

@Resolver(of => Cat)
export class CatResolver {
  constructor(private readonly catService: CatService) {}

  @Query(of => [Cat])
  public cats(@Args() catArgs: CatArgs): Promise<Cat[]> {
    return this.catService.findAll(catArgs);
  }

  @Query(of => Cat)
  public cat(@Args('id') id: number): Promise<Cat> {
    const cat = this.catService.findOneById(id);
    if (!cat) {
      throw new NotFoundException(id);
    }
    return cat;
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Mutation(of => Cat)
  public createCat(@Args('data') data: CreateCatInput): Promise<Cat> {
    return this.catService.create(data);
  }

  @Mutation(of => Boolean)
  public deleteCat(@Args('id') id: number) {
    return this.catService.remove(id);
  }

  @ResolveProperty(() => Human)
  async owners(@Parent() cat: Cat, @Dataloader() { catHumanDataloader }: IDataloader): Promise<Human[]> {
    return catHumanDataloader.load(cat.id || -1);
  }

  @ResolveProperty(() => Breed)
  async breed(@Parent() cat: Cat, @Dataloader() { catBreedDataloader }: IDataloader): Promise<Breed> {
    return (await catBreedDataloader.load(cat.breedId || -1)).shift();
  }
}
