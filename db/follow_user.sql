INSERT INTO followedUsers
(user_id, followed_user_id)
VALUES ($1, $2)
RETURNING *;
