const express = require("express");
const router = express.Router();
const Bike = require("../models/bikeModel");

router.get("/getallbikes", async (req, res) => {
  try {
    const bike = await Bike.find();
    res.send(bike);
  } catch (error) {
    return res.status(400).json(error);
  }
});


router.post("/addbike", async (req, res) => {
  try {
    const newbike = new Bike(req.body);
    await newbike.save();
    res.send("bike added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
