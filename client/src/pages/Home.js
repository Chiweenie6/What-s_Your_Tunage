import React from "react";
import { useQuery } from "@apollo/client";

import AlbumList from "../components/AlbumList";

import { QUERY_ALBUMS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_ALBUMS);
  const albums = data?.albums || [];

  console.log(albums);

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 mb-3 text-center">
          {loading ? (
            <div>🔃 Loading 🔃</div>
          ) : (
            <AlbumList albums={albums} title="🎶 Let there be MUSIC! 🎶" />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
