DELETE FROM bookmarks
WHERE user_id = $1 AND post_id = $2
RETURNING *;