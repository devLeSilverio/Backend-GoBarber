import { getRepository } from 'typeorm'; // usar o mesmo repositorio
import { hash } from 'bcryptjs';
import User from '../models/User'; // pegou os dados
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    // email duplicado
    const checkUserExist = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExist) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    // criando a instancia
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
