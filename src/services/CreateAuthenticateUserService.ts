import { getRepository } from 'typeorm'; // usar o mesmo repositorio
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User'; // pegou os dados
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

// para nao declarar direto
interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorret email/password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorret email/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;
    // criptografado mas não é seguro
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
