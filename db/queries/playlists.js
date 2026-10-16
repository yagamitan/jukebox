import db from "#db/client";

export async function getPlaylists() {
  const sql = `
    SELECT *
    FROM playlists;
    `;

  const { rows: playlists } = await db.query(sql);
  return playlists;
}

export async function createPlaylist({ name, description }) {
  const sql = `
    INSERT INTO playlists (name, description)
    VALUES ($1, $2)
    RETURNING *;
    `;

  const {
    rows: [playlist],
  } = await db.query(sql, [name, description]);

  return playlist;
}

export async function getPlaylistById(id) {
  const sql = `
    SELECT *
    FROM playlists
    WHERE id = $1;
    `;

  const {
    rows: [playlist],
  } = await db.query(sql, [id]);

  return playlist;
}

export async function getTracksByPlaylistId(id) {
  const sql = `
    SELECT tracks.*
    FROM playlists_tracks
    JOIN tracks ON playlists_tracks.track_id = tracks.id
    WHERE playlists_tracks.playlist_id = $1;
    `;

  const { rows: tracks } = await db.query(sql, [id]);
  return tracks;
}
