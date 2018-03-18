CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    user_id INT,
    post_title VARCHAR(180),
    post_intro VARCHAR(180),
    post_author VARCHAR(180),
    post_body TEXT
);