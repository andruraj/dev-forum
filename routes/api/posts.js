const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//post validator
const validatePostInput = require("../../validation/post");

//post model
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

// @route   GET api/posts/test
// @desc    Tests posts api
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "posts api working"
  })
);

// @route   POST api/posts
// @desc    Create posts
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check valid
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

// @route   GET api/posts
// @desc    get posts
// @access  Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: "No posts" }));
});

// @route   GET api/posts/:id
// @desc    get post by id
// @access  Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

// @route   DELETE api/posts/:id
// @desc    delete post by id
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            //check for post owner
            if (post.user.toString() !== req.user.id) {
              return res.status(401).json({ auth: "user not authorized" });
            }

            //delete
            post.remove().then(() => res.json({ success: true }));
          })
          .catch(err => res.status(404).json({ post: "Post not found" }));
      })
      .catch(err =>
        res.status(404).json({ nopostfound: "No post found with that ID" })
      );
  }
);

// @route   POST api/posts/like/:id
// @desc    like post by id
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //check if liked
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "user already liked this post" });
          }

          //add likes
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ post: "Post not found" }));
    });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    unlike post by id
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //check if liked
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }

          //get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //splice out of array
          post.likes.splice(removeIndex, 1);

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ post: "Post not found" }));
    });
  }
);

// @route   POST api/posts/comment/:id
// @desc    add comment to post by id
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check valid
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        post.comments.unshift(newComment);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ post: "Post not found" }));
  }
);

// @route   DELETE api/posts/comment/:id/:c_id
// @desc    delete comment
// @access  Private
router.delete(
  "/comment/:id/:c_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        //check comment present
        if (
          post.comments.filter(com => com._id.toString() === req.params.c_id)
            .length === 0
        ) {
          return res.status(404).json({ commentnotfound: "Comment not found" });
        }
        //get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.c_id);

        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ post: "Post not found" }));
  }
);

module.exports = router;
