const express = require('express');
const Posts = require('./postDb.js');
const Validator = require('../middleware/validator.js');

const router = express.Router();

router.get('/', (req, res) => {
	Posts.get(req.query)
		 .then(posts => {
		 	res.status(200).json(posts)
		 })
		 .catch(err => {
		 	res.status(500).json({ message: "Error retrieving the posts" });
		 })
});

router.get('/:id', (req, res) => {
	Posts.getById(req.params.id)
		 .then(post => {
		 	if (post) {
		 		res.status(200).json(post);
		 	} else {
		 		res.status(404).json({ message: "Post not found" });
		 	}
		 })
		 .catch(err => {
		 	console.log(err);
		 	res.status(500).json({ message: "Error retrieving post using ID" });
		 });
});

router.delete('/:id', (req, res) => {
  Posts.remove(req.params.id)
  	   .then(identifier => {
  	   	if(identifier > 0) {
  	   		res.status(200).json({ message: "The post has been destroyed" });
  	   	} else {
  	   		res.status(404).json({ message: "The post could not be found" });
  	   	}
  	   })
  	   .catch(err => {
  	   	console.log(err);
  	   	res.status(500).json({ message: "Error removing the post" });
  	   });
});

router.put('/:id', (req, res) => {
	Posts.update(req.params.id, req.body)
		 .then(post => {
		 	if (post) {
		 		res.status(200).json(hub);
		 	} else {
		 		res.status(404).json({ message: "The post could not be found" });
		 	}
		 })
		 .catch(err => {
		 	console.log(err);
		 	res.status(500).json({ message: "Error updating the post" });
		 })
});

// custom middleware
// function validatePostId(req, res, next) {
//   // do your magic!
// }

module.exports = router;
