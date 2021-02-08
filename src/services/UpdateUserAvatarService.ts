interface Request {
  // eslint-disable-next-line camelcase
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  // eslint-disable-next-line camelcase
  public async execute({ user_id, avatarFilename }: Request): Promise<void> {}
}

export default UpdateUserAvatarService;
