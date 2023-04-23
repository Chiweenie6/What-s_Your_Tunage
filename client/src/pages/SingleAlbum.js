import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

import { QUERY_SINGLE_ALBUM } from "../utils/queries";

const SingleAlbum = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { albumId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_ALBUM, {
    // pass URL parameter
    variables: { albumId: albumId },
  });

  const album = data?.album || {};

  if (loading) {
    return <div>🔃 Loading 🔃</div>;
  }
  return (
    <div className="my-3">
        <div>
            <img src="{album.image}" alt="{album.title}"></img>
        </div>
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {album.title} <br />
      </h3>
      <div className="bg-light py-4">
          <h4>{album.author}</h4>
          <br></br>
          <h4>{album.genre}</h4>
          <br></br>
          <h4>{album.release}</h4>
      </div>

      <div className="my-5">
        <CommentList comments={album.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: "1px dotted #1a1a1a" }}>
        <CommentForm albumId={album._id} />
      </div>
    </div>
  );
};

export default SingleAlbum;
