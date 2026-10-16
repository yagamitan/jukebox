import express from "express";
import tracksRouter from "#api/tracks";
import playlistsRouter from "#api/playlists";

const app = express();

app.use(express.json());

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);

app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23503" || err.code === "23505") {
    return res.status(400).send(err.detail || err.message);
  }

  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});

export default app;
