const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// POST: /api/comments
router.post('/comments', withAuth, async (req, res) => {
    try {
        // Create a new comment in the database
        const newComment = await Comment.create({
            text: req.body.comment,
            user_id: req.session.user_id,
            blog_id: req.body.blogId,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});