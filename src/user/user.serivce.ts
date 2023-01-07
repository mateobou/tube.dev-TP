import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';

@Injectable()
export class UsersService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOneById(_id: number) {
    throw new Error('Method not implemented.');
  }
  getUser(
    @Args('firstName', { nullable: true }) firstName?: string,
    @Args('lastName', { defaultValue: '' }) lastName?: string,
  ): string {
    return 'User';
  }
}
