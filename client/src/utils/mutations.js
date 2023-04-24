import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($albumId: ID!, $commentText: String!) {
    addComment(albumId: $albumId, commentText: $commentText) {
      _id
      title
      artist
      image
      genre
      release
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($albumId: ID!, $commentText: String!) {
    removeComment(albumId: $albumId, commentText: $commentText) {
      _id
      title
      artist
      image
      genre
      release
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const SAVE_ALBUM = gql`
  mutation saveAlbum($input: AlbumInput) {
    saveAlbum(input: $input) {
      _id
      username
      email
      albumCount
      savedAlbums {
        _id
        title
        artist
        image
        genre
        release
      }
    }
  }
`;

export const REMOVE_ALBUM = gql`
  mutation removeAlbum($albumId: ID!) {
    removeAlbum(albumId: $albumId) {
      _id
      username
      email
      albumCount
      savedAlbums {
        _id
        title
        artist
        image
        genre
        release
      }
    }
  }
`;
