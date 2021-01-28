import { getRepository } from 'typeorm'; // usar o mesmo repositorio
import { compare } from 'bcryptjs';
import User from '../models/User'; // pegou os dados

interface Request {
  email: string;
  password: string;
}

// para nao declarar direto
interface Response {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.find({ where: { email } });

    if (!user) {
      throw new Error('Incorret email/password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorret email/password combination');
    }

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
