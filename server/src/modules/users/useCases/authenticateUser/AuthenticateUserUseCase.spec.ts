import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UsersRepositoryInMemory';
import { FakeHashProvider } from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let fakeHashProvider: FakeHashProvider;

describe('Authenticate user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    fakeHashProvider = new FakeHashProvider();

    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory,
      fakeHashProvider,
    );

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate an user', async () => {
    const user = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'test_password',
    });

    const authInfo = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(authInfo).toHaveProperty('user');
    expect(authInfo).toHaveProperty('token');
  });
});
