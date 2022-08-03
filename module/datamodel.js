"use strict";

var mongoose = require("mongoose");

const countryData = new mongoose.Schema(
  {
    Country_Id: { type: Number },
    Country_Name: { type: String },
    Country_Code: { type: Number },
  },
  { timestamps: true }
);

const stateData = new mongoose.Schema({
  State_Id: { type: String },
  Country_Id: { type: String },
  State_Name: { type: String },
});

module.exports = mongoose.model("CountryData", countryData);
module.exports = mongoose.model("StateData", stateData);
