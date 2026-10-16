import express from "express";
import { getTrackById, getTracks } from "#db/queries/tracks";

const router = express.Router();

router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.get("/:id", async (req, res) => {
  const track = await getTrackById(req.params.id);

  if (!track) {
    return res.status(404).send("Track not found.");
  }
  res.send(track);
});

export default router;
