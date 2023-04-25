import React, { useState, useEffect } from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import Auth from "../utils/auth";
import { saveAlbumIds, getSavedAlbumIds } from "../utils/localStorage";
import { SAVE_ALBUM } from "../utils/mutations";

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

  // Create state for holding saved album ids
  const { savedAlbumIds, setSavedAlbumIds } = useState(getSavedAlbumIds());

  // useEffect hook to save "saveAlbumIds" to local storage
  useEffect(() => {
    return () => saveAlbumIds(savedAlbumIds);
  });

  // Use useMutation to utilize SAVE_ALBUM
  const [saveAlbum] = useMutation(SAVE_ALBUM);

  // Save album function
  const handleSaveAlbum = async (_id) => {
    const albumToSave = _id;

    console.log(albumToSave);

    // Get Token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      const response = await saveAlbum({
        variables: { input: albumToSave },
      });

      if (!response) {
        throw new Error("🚫 Error 🚫");
      }
      // Save album to state if album is successfully saved
      setSavedAlbumIds([...savedAlbumIds, albumToSave._id]);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>🔃 Loading 🔃</div>;
  }
  return (
    <div className="my-3 text-center container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "75%", height: "auto" }}>
          <div>
            <img
              src={require(`../images/${album.image}`)}
              alt={`${album.image}`}
              className="p-3"
              style={{ width: "60%", height: "auto" }}
            />
          </div>
          <h3 className="card-header bg-dark text-light p-2 m-0">
            {album.title} <br />
          </h3>
          <div className="bg-light py-4">
            <h4>{album.artist}</h4>
            <br></br>
            <h4>{album.genre}</h4>
            <br></br>
            <h4>{album.release}</h4>
          </div>
          {Auth.loggedIn() && (
            <button
              disabled={savedAlbumIds?.some(
                (savedAlbumId) => savedAlbumId === album._id
              )}
              className="btn-block btn-info p-2"
              onClick={() => handleSaveAlbum(album._id)}
            >
              {savedAlbumIds?.some((savedAlbumId) => savedAlbumId === album._id)
                ? "Already been saved! ✅"
                : "💾 Save this Album!"}
            </button>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="col-12 offset-2">
          <div className="my-5">
            <CommentList comments={album.comments} />
          </div>
          <div className="m-3 p-4" style={{ border: "1px dotted #1a1a1a" }}>
            <CommentForm albumId={album._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleAlbum;
