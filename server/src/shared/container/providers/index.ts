import { container } from 'tsyringe';
import { Argon2HashProvider } from './HashProvider/implementations/Argon2HashProvider';
import { IHashProvider } from './HashProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', Argon2HashProvider);
