import express from "express";
import {
  createPlaylist,
  getPlaylistById,
  getPlaylists,
  getTracksByPlaylistId,
} from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";

const router = express.Router();

function validatePlaylist(req, res, next) {
  if (!req.body) {
    return res.status(400).send("Request body is required.");
  }
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).send("Name and description are required.");
  }
  next();
}

function validateTrackId(req, res, next) {
  if (!req.body) {
    return res.status(400).send("Request body is required.");
  }
  const { trackId } = req.body;
  if (!trackId) {
    return res.status(400).send("trackId is required.");
  }
  next();
}
router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

router.post("/", validatePlaylist, async (req, res) => {
  const playlist = await createPlaylist(req.body);
  res.status(201).send(playlist);
});

router.param("id", async (req, res, next, id) => {
  const playlist = await getPlaylistById(id);

  if (!playlist) {
    return res.status(404).send("Playlist not found.");
  }

  req.playlist = playlist;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.playlist);
});

router.get("/:id/tracks", async (req, res) => {
  const tracks = await getTracksByPlaylistId(req.playlist.id);
  res.send(tracks);
});

router.post("/:id/tracks", validateTrackId, async (req, res) => {
  const playlistTrack = await createPlaylistTrack(
    req.playlist.id,
    req.body.trackId,
  );
  res.status(201).send(playlistTrack);
});
export default router;
