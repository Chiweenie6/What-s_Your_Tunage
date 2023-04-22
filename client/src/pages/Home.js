import React from "react";
import { useQuery } from "@apollo/client";

import ThoughtList from "../components/ThoughtList";
import ThoughtForm from "../components/ThoughtForm";
import AlbumList from "../components/AlbumList";

import { QUERY_THOUGHTS, QUERY_ALBUMS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  const {loadingAlbums, info} = useQuery(QUERY_ALBUMS);
  const albums = info?.albums || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <ThoughtForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>🔃 Loading 🔃</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Food for Thought..."
            />
          )}
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loadingAlbums ? (
            <div>🔃 Loading 🔃</div>
          ) : (
            <AlbumList
              albums={albums}
              title="🎶 Let there be MUSIC! 🎶"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
