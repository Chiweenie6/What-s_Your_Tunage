import React from "react";
import { useMutation } from "@apollo/client";

import { REMOVE_COMMENT } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const CommentList = ({ comments, isLoggedInUser = false }) => {
  const [removeComment, { error }] = useMutation(REMOVE_COMMENT, {
    update(cache, { data: { removeComment } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeComment },
        });
      } catch (err) {
        console.error(err);
      }
    },
  });

  const handleRemoveComment = async (comment) => {
    try {
      const { data } = await removeComment({
        variables: { comment },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: "1px dotted #1a1a1a" }}
      >
        Comments
      </h3>
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {comment.commentAuthor} commented{" "}
                  <span style={{ fontSize: "0.825rem" }}>
                    on {comment.createdAt}
                  </span>
                </h5>
                <p className="card-body">{comment.commentText}</p>
              </div>
              {isLoggedInUser && (
                <button
                  className="btn-danger"
                  onClick={() => handleRemoveComment(comment)}
                >
                  🔥 Remove Album
                </button>
              )}
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
