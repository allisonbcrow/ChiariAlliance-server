let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const { Medical } = require("../models");

router.get("/practice", function (req, res) {
  res.send("Hey!! This is a practice route!");
});

router.get("/about", function (req, res) {
  res.send("Hey!! This is an about route!");
});

/*CREATING A POST*/
router.post("/create", validateSession, function (req, res) {
  const medicalEntry = {
    // date: req.body.medical.date,
    medicalConditions: req.body.medical.medicalConditions,
    previousSurgeries: req.body.medical.previousSurgeries,
    previousHospitalizations: req.body.medical.previousHospitalizations,
    currentMedications: req.body.medical.currentMedications,
    allergies: req.body.medical.allergies,
    height: req.body.medical.height,
    weight: req.body.medical.weight,
    other: req.body.medical.other,
    userId: req.user.id
  };
  Medical.create(medicalEntry)
    .then((medical) => res.status(200).json(medical))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/mine", validateSession, function (req, res) {
	let userId = req.user.id;
	Medical.findAll({
		where: { userId: userId },
	})
		.then((medical) => res.status(200).json(medical))
		.catch((err) => res.status(500).json({ error: err }));
});

router.put("/update/:entryId", validateSession, function (req, res) {
	const updateMedicalEntry = {
    // date: req.body.medical.date,
		medicalConditions: req.body.medical.medicalConditions,
    previousSurgeries: req.body.medical.previousSurgeries,
    previousHospitalizations: req.body.medical.previousHospitalizations,
    currentMedications: req.body.medical.currentMedications,
    allergies: req.body.medical.allergies,
    height: req.body.medical.height,
    weight: req.body.medical.weight,
    other: req.body.medical.other
	};
	const query = { where: { id: req.params.entryId, userId: req.user.id } };
	Medical.update(updateMedicalEntry, query)
		.then((medical) =>
			res.status(200).json({ message: "The Medical Post has been updated." })
		)
		.catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
	const query = { where: { id: req.params.id, userId: req.user.id } };
	Medical.destroy(query)
		.then((medical) =>
			res.status(200).json({ message: "The Medical Post has been deleted" })
		)
		.catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
