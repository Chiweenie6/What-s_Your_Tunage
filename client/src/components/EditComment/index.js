import React, { useState, Component } from "react";
import { useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";

import { UPDATE_COMMENT } from "../../utils/mutations";
import { QUERY_SINGLE_ALBUM } from "../../utils/queries";
import Auth from "../../utils/auth";
import RatingSystem from "../../utils/ratingSystem";

const EditComment = ({ singleAlbumId, commentId, commentText }) => {
  // const [commentText, setCommentText] = useState([]);
  //   const [rating, setRating] = useState(0);

  const [comment, setComment] = useState({
    albumId: singleAlbumId,
    commentId: commentId,
    commentText: commentText,
  });

  const handleCommentTextChange = (e) => {
    setComment({
      ...comment,
      commentText: e.target.value,
    });
    console.log(commentText);
    console.log(e.target.value);
  };

  console.log(comment);
  console.log(comment.commentText);

  // Using the UPDATE_COMMENT mutation to edit an album review and then update the album's reviews list
  const [updateComment, { error }] = useMutation(UPDATE_COMMENT, {
    onCompleted: (data) => console.log("👺👺👺 Mutation data", data),
    update(cache, { data: { updateComment } }) {
      try {
        cache.writeQuery({
          query: QUERY_SINGLE_ALBUM,
          data: { album: updateComment },
        });
      } catch (err) {
        console.log(err);
      }
      console.log(updateComment);
    },
  });

  const handleUpdateComment = async () => {
    try {
      const { data } = await updateComment({
        variables: {
          commentId: comment.commentId,
          albumId: comment.albumId,
          commentText: comment.commentText,
        },
      });
      return;

      // console.log(data.comment._id);
      // console.log(comment.commentId);
      // console.log(comment.albumId);
      // console.log(comment.commentText);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div key={comment.commentId}>
      <h4 className="text-center" style={{ color: "orange" }}>
        Edit Review
      </h4>
      <br />

      {Auth.loggedIn() ? (
        <>
          <div className="rateMusic p-5 text-center">
            <RatingSystem />
          </div>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="reviewText"
                value={comment.commentText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleCommentTextChange}
              ></textarea>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="btn btn-sm btn-primary"
                onClick={() => handleUpdateComment(comment)}
                style={{ cursor: "pointer" }}
              >
                🖊️ Save Change
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          Must be logged in to edit review. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default EditComment;
