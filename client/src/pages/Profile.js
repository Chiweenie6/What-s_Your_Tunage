import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import AlbumList from "../components/AlbumList";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>🔃 Loading 🔃</div>;
  }

  if (!user?.username) {
    return <h4>🚫 Must Be Logged In 🚫</h4>;
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          <AlbumList
            albums={user.albums}
            title={`${user.username}'s albums...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
