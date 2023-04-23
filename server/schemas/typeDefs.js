const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    albumCount: Int
    savedAlbums: [Album]
  }

  type Album {
    _id: ID
    title: String
    artist: String
    image: String
    genre: String
    release: String
    comments: [Comment]
  }

  input AlbumInput {
    _id: ID
    title: String
    artist: String
    image: String
    genre: String
    release: String
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
    albums: [Album]
    album(albumId: ID!): Album
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addComment(albumId: ID!, commentText: String!): Album
    removeComment(albumId: ID!, commentId: ID!): Album
    updateComment(albumId: ID!, commentId: ID!): Album
    saveAlbum(input: AlbumInput): User
    removeAlbum(albumId: ID!): User
  }
`;

module.exports = typeDefs;
