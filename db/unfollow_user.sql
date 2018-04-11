DELETE FROM followedUsers
WHERE user_id = $1 AND followed_user_id = $2
RETURNING *;