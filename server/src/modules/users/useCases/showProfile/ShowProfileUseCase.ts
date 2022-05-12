import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@errors/AppError';
import { User } from '@modules/users/infra/typeorm/entities/User';

@injectable()
class ShowProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new AppError('User does not exists');
    }

    return userExists;
  }
}

export { ShowProfileUseCase };
