import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
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

export const QUERY_ME = gql`
  query me {
    me {
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

export const QUERY_ALBUMS = gql`
  query getAlbums {
    albums {
      _id
      title
      artist
      image
      genre
      release
    }
  }
`;

export const QUERY_SINGLE_ALBUM = gql`
  query getSingleAlbum($albumId: ID!) {
    album(albumId: $albumId) {
      _id
      title
      artist
      image
      genre
      release
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;
