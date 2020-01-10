import { Resolver, Query, Args, Mutation, ResolveProperty, Parent } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';

import { Cat } from '@api/cat/model/cat';

import { Breed } from './model/breed';
import { BreedArgs } from './dto/breed.args';
import { BreedService } from './breed.service';
import { CreateBreedInput } from './dto/create-breed.input';

import { IDataloader } from '@shared/modules/dataloader/model/dataloader.interface';
import { Dataloader } from '@shared/modules/dataloader/dataloader.decorator';

@Resolver(of => Breed)
export class BreedResolver {
  constructor(private readonly breedService: BreedService) {}

  @Query(of => [Breed])
  public breeds(@Args() breedArgs: BreedArgs): Promise<Breed[]> {
    return this.breedService.findAll(breedArgs);
  }

  @Query(of => Breed)
  public breed(@Args('id') id: number): Promise<Breed> {
    const breed = this.breedService.findOneById(id);
    if (!breed) {
      throw new NotFoundException(id);
    }
    return breed;
  }

  @Mutation(of => Breed)
  public createBreed(@Args('data') data: CreateBreedInput): Promise<Breed> {
    return this.breedService.create(data);
  }

  @Mutation(of => Boolean)
  public deleteBreed(@Args('id') id: number) {
    return this.breedService.remove(id);
  }

  @ResolveProperty(() => Breed)
  async cats(@Parent() breed: Breed, @Dataloader() { breedCatDataloader }: IDataloader): Promise<Cat[]> {
    return breedCatDataloader.load(breed.id || -1);
  }
}
