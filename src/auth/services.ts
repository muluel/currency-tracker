import User from './models';

export class UserService {
  async register(email: string, password: string) {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw new Error('User already exists');
    }
    try {
      const user = new User({ email, password });
      await user.save();
      return user;
    } catch (error) {
      throw new Error('User registration failed');
    }
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    try {
      const isValid = await user.comparePassword(password);
      if (!isValid) {
        throw new Error('Invalid email or password');
      }
      return user;
    } catch (error) {
      throw new Error('Authentication failed');
    }
  }
}

export default new UserService();
