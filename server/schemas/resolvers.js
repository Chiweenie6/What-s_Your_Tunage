const { AuthenticationError } = require("apollo-server-express");
const { User, Album } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("🐼 You need to be logged in!");
    },
    albums: async () => {
      return Album.find();
    },
    album: async (parent, { albumId }) => {
      return Album.findOne({ _id: albumId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    // Save Album to the User's profile
    saveAlbum: async (parent, { input }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedAlbums: input } },
          { new: true, runValidators: true }
        );
      }
      //   Must be logged in in order to save album to profile
      throw new AuthenticationError("🚫 Must Be Logged In To Save Album 🚫");
    },
    // Remove Album from the User's profile
    removeAlbum: async (parent, { albumId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedAlbums: { albumId: albumId } } },
          { new: true }
        );
      }
      //   Must be logged in in order to delete album from profile
      throw new AuthenticationError("🚫 Must Be Logged In To Delete Album 🚫");
    },
    addComment: async (parent, { albumId, commentText }, context) => {
      if (context.user) {
        return Album.findOneAndUpdate(
          { _id: albumId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeComment: async (parent, { albumId, commentId }, context) => {
      if (context.user) {
        return Album.findOneAndUpdate(
          { _id: albumId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
