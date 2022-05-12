import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { AppError } from '@errors/AppError';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
    isAdmin: boolean;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({}, process.env.SECRET_JWT, {
      subject: user.id,
      expiresIn: '1d', // Expires in 1 day
    });

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.is_admin,
      },
      token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
