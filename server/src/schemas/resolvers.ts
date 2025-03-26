import { User } from '../models/index.js';
import { UserDocument } from '../models/User';
import { signToken, AuthenticationError } from '../utils/auth.js';

interface LoginUserArgs {
  email: string;
  password: string;
}

interface AddUserArgs {
  username: string;
  email: string;
  password: string;
}

interface SaveBookArgs {
  input: {
    bookId: string;
    authors: string[];
    description: string;
    title: string;
    image: string;
    link: string;
  }
}

interface RemoveBookArgs {
  bookId: string;
}

interface Context {
  user?: UserDocument;
}

const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: Context): Promise<UserDocument | null> => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password').populate('savedBooks');
        // May need to remove .populate('savedBooks') from the above line
        return userData;
      }
      throw new AuthenticationError('User is not authenticated');
    },
  },

  Mutation: {
    login: async (_parent: any, { email, password }: LoginUserArgs): Promise<{ token: string; user: UserDocument }> => {
      console.log('Attempting login for email:${email}');

      const user = await User.findOne({ email});
      console.log('User found: ', user);

      if (!user) {
        console.log('Login failed: User not found');
        throw new AuthenticationError('Incorrect credentials');
      }

      console.log('Stored hased password: ', user.password);
      console.log('Endtered password: ', password);

      const correctPw = await user.isCorrectPassword(password);
      console.log('Password match result: ', correctPw);

      if (!correctPw) {
        console.log('Login failed: Password incorrect');
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user.username, user.email, user._id);
      console.log('Login successful, token generated:', token);
      return { token, user };
    },

    addUser: async (_parent: any, { username, email, password }: AddUserArgs): Promise<{ token: string; user: UserDocument }> => {
      const user = await User.create({ username, email, password });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    saveBook: async (_parent: any, { input }: { input: SaveBookArgs }, context: Context): Promise<UserDocument | null> => {
      console.log("Recieved input: ", input);
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: input } },
          { new: true }
        )
      }
      throw new AuthenticationError('User is not authenticated');
    },

    removeBook: async (_parent: any, { bookId }: RemoveBookArgs, context: Context): Promise<UserDocument | null> => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        )
      }
      throw new AuthenticationError('User is not authenticated');
    },
  },
};

export default resolvers;