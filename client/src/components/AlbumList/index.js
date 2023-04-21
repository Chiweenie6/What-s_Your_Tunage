import React from 'react';
import { Link } from 'react-router-dom';

const ProfileList = ({ albums }) => {
  if (!albums.length) {
    return <h3>No Albums at the Moment</h3>;
  }

  return (
    <div>
      
      <div className="flex-row justify-space-between my-4">
        {albums &&
          albums.map((album) => (
            <div key={album._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {album.name} <br />
                </h4>

                <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/albums/${album._id}`}
                >
                  View and endorse their skills.
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileList;
