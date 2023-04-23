const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    albums: [Album]
  }

  type Album {
    _id: ID
    title: String
    artist: String
    image: String
    genre: String
    release: String
  }

  input AlbumInput {
    _id: ID
    title: String
    artist: String
    image: String
    genre: String
    release: String
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    albums: [Album]!
    album(albumId: ID!): Album
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
    updateComment(albumId: ID!, commentId: ID!): Album
    saveAlbum(input: AlbumInput): User
    removeAlbum(albumId: ID!): Album
  }
`;

module.exports = typeDefs;
