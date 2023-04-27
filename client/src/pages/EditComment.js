import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { UPDATE_COMMENT } from "../utils/mutations";
import { QUERY_SINGLE_ALBUM } from "../utils/queries";
import Auth from "../utils/auth";
import RatingSystem from "../utils/ratingSystem";

const EditComment = ({ comment, singleAlbumId, commentText }) => {
  //   const [commentText, setCommentText] = useState("");
    // const [characterCount, setCharacterCount] = useState(0);
  //   const [rating, setRating] = useState(0);

  console.log(comment);
  console.log(singleAlbumId);

  // Using the UPDATE_COMMENT mutation to edit an album review and then update the album's reviews list
  const [updateComment, { error }] = useMutation(UPDATE_COMMENT, {
    onCompleted: (data) => console.log("👺👺👺 Mutation data", data),
    update(cache, { data: { editComment } }) {
      try {
        cache.writeQuery({
          query: QUERY_SINGLE_ALBUM,
          data: { album: editComment },
        });
      } catch (err) {
        console.log(err);
      }
      console.log(editComment);
    },
  });

  const handleUpdateComment = async (commentId, singleAlbumId, commentText) => {
    try {
      const { data } = await updateComment({
        variables: {
          commentId: commentId,
          albumId: singleAlbumId,
          commentText: commentText,
        },
      });
      console.log(commentId);
      console.log(singleAlbumId);
      console.log(commentText);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h4>Edit Review</h4>
      <br />
      <br />

      <div>
        <h3>{singleAlbumId}</h3>
        <div key={comment} className="col-12 mb-3 pb-3">
            <h5>Hey</h5>
          <p className="card-body" style={{ fontSize: "2rem" }}>
            {commentText}
          </p>
        </div>
      </div>







      {/* <div className="flex-row my-4">
        <div key={comment._id} className="col-12 mb-3 pb-3">
          <div className="p-3 bg-dark text-light">
            <p className="card-body" style={{ fontSize: "2rem" }}>
              {comment.commentText}
            </p>
            <h5 className="card-header">
              <span style={{ fontSize: "0.75rem" }}>By</span>{" "}
              {comment.commentAuthor}{" "}
              <span style={{ fontSize: "0.75rem" }}>
                on {comment.createdAt}
              </span>
            </h5>
            <br /> */}

        
            {Auth.loggedIn() ? (
              <>

                <div className="rateMusic p-5">
                  <RatingSystem />
                </div>
                <form
                  className="flex-row justify-center justify-space-between-md align-center"
                  // onSubmit={handleUpdateComment}
                >
                  <div className="col-12 col-lg-9">
                    <textarea
                      name="commentText"
                      placeholder={commentText}
                      value={commentText}
                      className="form-input w-100"
                      style={{ lineHeight: "1.5", resize: "vertical" }}
                    ></textarea>
                  </div>

                  <div className="text-right">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() =>
                        handleUpdateComment(
                          comment._id,
                          singleAlbumId,
                          commentText
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      🖊️ Save Change
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <p>
                You need to be logged in to share your thoughts. Please{" "}
                <Link to="/login">login</Link> or{" "}
                <Link to="/signup">signup.</Link>
              </p>
            )}
          </div>
        
        // </div>
        // </div>
        // </div>
  );
};

export default EditComment;
