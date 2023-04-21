import React from 'react';
import { Link } from 'react-router-dom';

const AlbumList = ({ albums }) => {
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
                <img src="/images/{album.image}" alt="{album.title}"></img>
                <h2 className="card-header bg-dark text-light p-2 m-0">
                  {album.title} <br />
                </h2>
                <h3>{album.artist}</h3>
                <h5>{album.genre}</h5>
                <h5>{album.release}</h5>


                <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/albums/${album._id}`}
                >
                  Album
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AlbumList;
