SELECT * FROM posts
WHERE post_title LIKE $1 OR post_title = $1;
