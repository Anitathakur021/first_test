"use strict";

const mongoose = require("mongoose");

const Country = mongoose.model("CountryData");
const states = mongoose.model("StateData");

const country_data = async (req, res) => {
  console.log(req.body);
  try {
    let data = {
      Country_Id: req.body.id,
      Country_Name: req.body.name,
      Country_Code: req.body.code,
    };
    const newdata = new Country(data);
    const result = await newdata.save();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

const state_data = async (req, res) => {
  console.log(req.body);
  try {
    let stateData = {
      State_Id: req.body.id,
      Country_Id: req.body.country_id,
      State_Name: req.body.name,
    };
    const newStateData = new states(stateData);
    const results = await newStateData.save();
    res.send(results);
  } catch (err) {
    console.log(err);
  }
};

const fetchstates = async (req, res) => {
  console.log(req.body);
  try {
    const data = await states.find({
      $or: [{ Country_Id: 1 }, { Country_Id: 2 }],
    });

    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

const randomdata = async (req, res) => {
  try {
    const data = await Country.find({
      $or: [{ Country_Name: { $regex: "U", $options: "i" } }],
    });
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

const countData = async (req, res) => {
  try {
    const data = await Country.aggregate([
      {
        $match: { Country_Name: { $regex: /^a/ } },
      },
      {
        $count: "country_name",
      },
    ]);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
// const countData = async (req, res) => {
//   try {
//     const data = await Country.aggregate([
//       { $match: { country_name: { $gt: "A", $lt: "a" } } },
//       { $sample: { size: 1 } },
//       {
//         $count: "country_name",
//       },
//     ]);
//     res.send(data);
//   } catch (err) {
//     console.log(err);
//   }
// };

const duplicatelist = async (req, res) => {
  try {
    const data = await Country.aggregate([
      { $group: { _id: "$Country_Name", count: { $sum: 1 } } },
      { $match: { _id: { $ne: null }, count: { $gt: 1 } } },
      { $project: { Country_Name: "$_id", _id: 0 } },
    ]);
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
exports.country_data = country_data;
exports.state_data = state_data;
exports.fetchstates = fetchstates;
exports.randomdata = randomdata;
exports.countData = countData;
exports.duplicatelist = duplicatelist;
