import React from "react";

const CommentList = ({ comments = [] }) => {
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
              <p className="card-body" style={{ fontSize: "2rem" }}>{comment.commentText}</p>
                <h5 className="card-header">
                  <span style={{ fontSize: "0.75rem" }}>By</span> {comment.commentAuthor}  {" "}
                  <span style={{ fontSize: "0.75rem" }}>
                    on {comment.createdAt}
                  </span>
                </h5>
                <br />
                <div className="text-right">
                  <button className="btn btn-sm btn-danger">
                    🔥 Remove Comment
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
