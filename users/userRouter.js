const express = require('express');
const Users = require("./userDb.js");
const Posts = require("../posts/postDb.js");
const Validator = require("../middleware/validator.js");

const router = express.Router();

router.post('/', Validator.validateUser, (req, res) => {
  Users.insert(req.body)
       .then(user => {
        res.status(201).json(user);
       })
       .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Error adding user" });
       });
});

router.post('/:id/posts', Validator.validateUserId, Validator.validatePost, (req, res) => {
  const text = req.body
  if (text) {
    Posts.insert(req.body)
         .then(post => {
            if(post){
              res.status(201).json(post);
            } else {
              res.status(404).json({ message: "The user identifier does not exist. Cannot post on an non-existing user." });
            }
         })
         .catch(err => {
            console.log(err);
            res.status(500).json({ message: "Error posting new post for user"})
         })
  } else {
    res.status(400).json({ message: "Please provide text for the post" })
  }
});

router.get('/', (req, res) => {
  Users.get(req.query)
       .then(users => {
        res.status(200).json(users);
       })
       .catch(err => {
        res.status(500).json({ message: "Error retrieving users" });
       })
});

router.get('/:id', Validator.validateUserId, (req, res) => {
  Users.getById(req.params.id)
       .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "User not found" });
        }
       })
       .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Error retrieving the user by id" });
       });
});

router.get('/:id/posts', Validator.validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
       .then(posts => {
        res.status(200).json(posts);
       })
       .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Error getting the posts for the user" });
       });
});

router.delete('/:id', Validator.validateUserId, (req, res) => {
  Users.remove(req.params.id)
       .then(identifier => {
        if(identifier > 0) {
          res.status(200).json({ message: "The user has been destroyed" });
        } else {
          res.status(404).json({ message: "The user has not been found" });
        }
       })
       .catch(err => {
        console.log(error);
        res.status(500).json({ message: "Error removing the user" });
       });
});

router.put('/:id', Validator.validateUserId, (req, res) => {
  Users.update(req.params.id, req.body)
       .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "The user could not be found"});
        }
       })
       .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Error updating the user" });
       });
});

//custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
// }

// function validateUser(req, res, next) {
//   // do your magic!
// }

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
