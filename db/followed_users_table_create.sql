CREATE TABLE IF NOT EXISTS followedUsers (
    id SERIAL PRIMARY KEY,
    user_id INT,
    followed_user_id INT
);