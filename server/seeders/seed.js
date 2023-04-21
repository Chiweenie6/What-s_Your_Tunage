const db = require("../config/connection");
const { User, Thought, Album } = require("../models");
const userSeeds = require("./userSeeds.json");
const thoughtSeeds = require("./thoughtSeeds.json");
const albumSeeds = require("./albumSeeds.json");

db.once("open", async () => {
  try {
    await Thought.deleteMany({});
    await User.deleteMany({});
    await Album.deleteMany({});

    await User.create(userSeeds);
    await Album.create(albumSeeds);

    for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }

    for (let i = 0; i < albumSeeds.length; i++) {
      const { _id, title, artist, image, genre, release } = await Album.create(
        albumSeeds[i]
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("🌱 Seeded 🌱");
  process.exit(0);
});
