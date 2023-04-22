import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
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
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
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