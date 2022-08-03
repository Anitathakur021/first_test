module.exports = function (app) {
  var datacontroler = require("./../controler/datacontroler");

  //   insert country
  app.route("/insertdata").post(datacontroler.country_data);
  app.route("/insertState").post(datacontroler.state_data);
  app.route("/fetchdata").get(datacontroler.fetchstates);
  app.route("/randomdata").get(datacontroler.randomdata);
  app.route("/countdata").get(datacontroler.countData);
  app.route("/duplicateList").get(datacontroler.duplicatelist);
};
