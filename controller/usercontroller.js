const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User } = require("../models");

const router = Router();


router.post("/register", function (req, res) {
	User.create({
		firstName: req.body.user.firstName,
		lastName: req.body.user.lastName,
		isAdmin: req.body.user.isAdmin,
		email: req.body.user.email,
		password: bcrypt.hashSync(req.body.user.password, 13),
	})
		.then(function createSuccess(user) {
			let token = jwt.sign(
				{ id: user.id, email: user.email },
				process.env.JWT_SECRET,
				{
					expiresIn: 60 * 60 * 24,
				}
			);
			res.json({
				user: user,
				message: "User succesfully created!",
				sessionToken: token,
			});
		})
		.catch((err) => res.status(500).json({ error: err }));
});

router.post("/login", function (req, res) {
	console.log(process.env.JWT_SECRET);
	User.findOne({
		where: {
			email: req.body.user.email,
		},
	})
		.then(function loginSuccess(user) {
			if (user) {
				bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
				if(matches) {
					let token = jwt.sign(
						{ id: user.id, email: user.email },
						process.env.JWT_SECRET,
						{ expiresIn: 60 * 60 * 24 }
					);
	
					res.status(200).json({
						user: user,
						message: "User successfully logged in!",
						sessionToken: token,
					})
				} else {
					res.status(502).send({
						error: "incorrect password"
					})
				}
				})
			} else {
				res.status(500).json({ error: "user does not exist." });
			}
		})
		.catch((err) => res.status(500).json({ error: err }));
});


module.exports = router;
