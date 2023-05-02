import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { REMOVE_COMMENT } from "../../utils/mutations";
import { QUERY_SINGLE_ALBUM, QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";

import EditComment from "../EditComment";

const CommentList = ({ comments = [], singleAlbum }) => {
  const [toggle, setToggle] = useState(true);
  const showEditComment = (id) => {
    if (id) {
      setToggle(!toggle);
    }
  };

  // New attempt to update
  const [commentText, setCommentText] = useState("YAY");

  const handleUpdate = (updatedText) => {
    setCommentText(updatedText);
  };

  console.log(comments);
  console.log(singleAlbum);

  // Using the REMOVE_COMMENT mutation to delete an album review and then update the album's reviews list
  const [removeComment, { error }] = useMutation(REMOVE_COMMENT, {
    onCompleted: (data) => console.log("🧌🧌🧌Mutation data", data),
    update(cache, { data: { removeComment } }) {
      try {
        cache.writeQuery({
          query: QUERY_SINGLE_ALBUM,
          data: { album: removeComment },
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleRemoveComment = async (commentId, singleAlbumId) => {
    try {
      const { data } = await removeComment({
        variables: { commentId: commentId, albumId: singleAlbumId },
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (!comments.length) {
    return <h3 style={{ color: "orange" }}>No Comments Yet</h3>;
  }

  return (
    <>
      {/* <div>
    <EditComment commentText={commentText} onUpdate={handleUpdate} />
    </div> */}

      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: "10px double #1a1a1a" }}
      >
        Reviews
      </h3>

      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
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
                <br />

                {Auth.loggedIn() &&
                  Auth.getProfile().data.username === comment.commentAuthor && (
                    <div className="text-right">
                      {/* <button
                        type="submit"
                        className="btn btn-sm btn-primary text-right"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          showEditComment(comment._id);
                        }}
                      >
                        🖊️ Edit Review
                      </button>
                      {toggle ? (
                        <></>
                      ) : (

                        <EditComment
                          key={comment._id}
                          commentToChange={comment}
                          singleAlbumId={singleAlbum._id}
                          commentId={comment._id}
                          commentText={comment.commentText}
                        />
                      )} */}

                      <EditComment
                        key={comment._id}
                        // commentText={commentText}
                        onUpdate={handleUpdate}
                        commentToChange={comment}
                        singleAlbumId={singleAlbum._id}
                        commentId={comment._id}
                        commentText={comment.commentText}
                      />
                    </div>
                  )}
                {Auth.loggedIn() &&
                  Auth.getProfile().data.username === comment.commentAuthor && (
                    <div className="text-right">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          handleRemoveComment(comment._id, singleAlbum._id)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        🔥 Remove Review
                      </button>
                    </div>
                  )}
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </>
  );
};

export default CommentList;
