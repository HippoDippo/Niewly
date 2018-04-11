UPDATE posts
SET post_title = $2, post_intro = $3, post_body = $4
WHERE id = $1;