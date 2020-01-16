const Users = require("../users/userDb.js");
const Posts = require("../posts/postDb.js");

function validateUserId(req, res, next) {
	Users.getById(req.params.id)
		 .then(identifier => {
		 	if(identifier) {
		 		req.user = identifier;
		 		next();
		 	} else {
		 		res.status(404).json({ message: "user object is unknown from custom middleware: validateUserId" });
		 	}
		 })
		 .catch(err => {
		 	console.log(err);
		 	res.status(500).json({ message: "error retrieving user identifier" });
		 });
};

function validateUser(req, res, next) {
	if(!req.body) {
		res.status(400).json({ message: "missing user data" });
	}
	else if(!req.body.name) {
		res.status(400).json({ message: "missing required name field" });
	} else {
		req.user = req.body;
		next();
	}
};

function validatePost(req, res, next) {
	if(!req.body) {
		res.status(400).json({ message: "missing post data" });
	} 
	else if(!req.body.text) {
		res.status(400).json({ message: "missing required text field" });
	} else {
		next();
	}
};

function validatePostId(req, res, next) {
	Posts.getById(req.params.id)
		 .then(identifier => {
		 	if(identifier) {
		 		next();
		 	} else {
		 		res.status(404).json({ message: "not valid post" })
		 	}
		 })
		 .catch(err => {
		 	console.log(err);
		 	res.status(500).json({ message: "could not validate post id" })
		 })
}

exports.validateUserId = validateUserId
exports.validateUser = validateUser
exports.validatePost = validatePost 