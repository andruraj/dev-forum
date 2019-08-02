const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//input validation
const validateProfileInput = require("../../validation/profile");
const validateExpInput = require("../../validation/experience");
const validateEduInput = require("../../validation/education");

//profile model
const Profile = require("../../models/Profile");

//user model
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Tests profile api
// @access  Public
router.get("/test", (req, res) =>
  res.json({
    msg: "profile api working"
  })
);

// @route   GET api/profile
// @desc    get current user profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/handle/:handle
// @desc    get profile through handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profile
// @desc    Create, update user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //check valid
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //get fields
    const profFields = {};
    profFields.user = req.user.id;
    if (req.body.handle) profFields.handle = req.body.handle;
    if (req.body.company) profFields.company = req.body.company;
    if (req.body.website) profFields.website = req.body.website;
    if (req.body.location) profFields.location = req.body.location;
    if (req.body.bio) profFields.bio = req.body.bio;
    if (req.body.status) profFields.status = req.body.status;
    if (req.body.githubusername)
      profFields.githubusername = req.body.githubusername;
    //skills array
    if (typeof req.body.skills !== "undefined") {
      profFields.skills = req.body.skills.split(",");
    }
    //social
    profFields.social = {};
    if (req.body.youtube) profFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profFields.social.instagram = req.body.instagram;
    if (req.body.github) profFields.social.github = req.body.github;
    if (req.body.linkedin) profFields.social.linkedin = req.body.linkedin;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profFields },
          { new: true }
        )
          .then(profile => res.json(profile))
          .catch(err => console.log(err));
      } else {
        //create
        Profile.findOne({ handle: profFields.handle })
          .then(profile => {
            if (profile) {
              errors.handle = "That handle already exists";
              res.status(400).json(errors);
            }
            //save profile
            new Profile(profFields)
              .save()
              .then(profile => res.json(profile))
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    });
  }
);

// @route   GET api/profile/user/:user_id
// @desc    get profile through user ID
// @access  Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// @route   GET api/profile/all
// @desc    get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There is no profiles" }));
});

// @route   GET api/profile/experience
// @desc    add exp
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExpInput(req.body);

    //check valid
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      //add to exp array
      profile.experience.unshift(newExp);

      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => console.log(err));
    });
  }
);

// @route   GET api/profile/education
// @desc    add edu
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEduInput(req.body);

    //check valid
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      //add to exp array
      profile.education.unshift(newEdu);

      profile
        .save()
        .then(profile => res.json(profile))
        .catch(err => console.log(err));
    });
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete exp
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        //splice out of array
        profile.experience.splice(removeIndex, 1);

        //save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete edu
// @access  Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        //splice out of array
        profile.education.splice(removeIndex, 1);

        //save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile
// @desc    Delete profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ success: true });
      });
    });
  }
);

module.exports = router;
