function logger(req, res, next) {
	console.log("req method:", req.method);
	console.log("req url:", req.url);
	console.log("timestamp:", Date.now());
	next();
}

exports.logger = logger;
