const db = require("../config/connection");
const { User, Album } = require("../models");
const userSeeds = require("./userSeeds.json");
const albumSeeds = require("./albumSeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await Album.deleteMany({});

    await User.create(userSeeds);
    await Album.create(albumSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("🌱 Seeded 🌱");
  process.exit(0);
});
