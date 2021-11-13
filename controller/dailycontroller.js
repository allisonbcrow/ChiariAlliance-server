let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const { Daily } = require("../models");

router.get("/practice", function (req, res) {
  res.send("Hey!! This is a practice route!");
});

router.get("/about", function (req, res) {
  res.send("Hey!! This is an about route!");
});

router.post("/create", validateSession, (req, res) => {
  const dailyEntry = {
    // date: req.body.daily.date,
    food: req.body.daily.food,
    water: req.body.daily.water,
    sleep: req.body.daily.sleep,
    mood: req.body.daily.mood,
    stressLevel: req.body.daily.stressLevel,
    exercise: req.body.daily.exercise,
    painLevel: req.body.daily.painLevel,
    other: req.body.daily.other,
    userId: req.user.id
  };
  Daily.create(dailyEntry)
    .then((daily) => res.status(200).json(daily))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get('/all', validateSession, function (req, res) {
  Daily.findAll()
  .then(daily => res.status(200).json(daily))
  .catch((err) => res.status(500).json({ error: err}));
});


router.get("/mine", validateSession, function (req, res) {
	let userId = req.user.id;
	Daily.findAll({
		where: { userId: userId },
	})
		.then((daily) => res.status(200).json(daily))
		.catch((err) => res.status(500).json({ error: err }));
});

router.put("/update/:entryId", validateSession, function (req, res) {
	const updateDailyEntry = {
    // date: req.body.daily.date,
		food: req.body.daily.food,
    water: req.body.daily.water,
    sleep: req.body.daily.sleep,
    mood: req.body.daily.mood,
    stressLevel: req.body.daily.stressLevel,
    exercise: req.body.daily.exercise,
    painLevel: req.body.daily.painLevel,
    other: req.body.daily.other
	};
	const query = { where: { id: req.params.entryId, userId: req.user.id } };
	Daily.update(updateDailyEntry, query)
		.then((daily) =>
			res.status(200).json({ message: "The Daily Post has been updated." })
		)
		.catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
    //conditional that checks if role === true
  //where:{id: req.paras.id}
  //if not run code below.
	let query ;
   if (req.user.isAdmin == true) {
    query = { where: { id: req.params.id } };
  } else {
    query = { where: { id: req.params.id, userId: req.user.id } };
  }
	Daily.destroy(query)
		.then((daily) =>
			res.status(200).json({ message: "The Daily Post has been deleted" })
		)
		.catch((err) => res.status(500).json({ error: err }));
});


module.exports = router;