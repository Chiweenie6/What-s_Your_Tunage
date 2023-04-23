import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-5 p-3"
            style={{fontSize:25}}
            onClick={() => navigate(-1)}
          >
            🔙
          </button>
        )}
        <h4 className='pt-5'>
          {' '}
          <span
            className="emoji"
            role="img"
            aria-label="music"
            aria-hidden="false"
          >
            🎵
          </span>{' '}
          Music Soothes the Savage Beast 👹.
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
