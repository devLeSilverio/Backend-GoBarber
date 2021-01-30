import { getRepository } from 'typeorm'; // usar o mesmo repositorio
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User'; // pegou os dados

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

    // criptografado mas não é seguro
    const token = sign({}, 'd3aa349c8d932ea71f11aa096ba29f61', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
