import { User } from '../models/index.js';
import { UserDocument } from '../models/User';
import { signToken, AuthenticationError } from '../utils/auth.js';

interface LoginUserArgs {
  email: string;
  password: string;
}

interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  };
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
      const user = await User.findOne({ email});

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    addUser: async (_parent: any, { input }: AddUserArgs): Promise<{ token: string; user: UserDocument }> => {
      const user = await User.create({ ...input });

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    saveBook: async (_parent: any, { input }: SaveBookArgs, context: Context): Promise<UserDocument | null> => {
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