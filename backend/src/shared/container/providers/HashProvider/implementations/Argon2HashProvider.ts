import { hash, verify } from 'argon2';
import { IHashProvider } from '../models/IHashProvider';

class Argon2HashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return verify(hashed, payload);
  }
}

export { Argon2HashProvider };
