"use strict";
const SubjectManMainAbl = require("../../abl/subjectman-main-abl.js");

class SubjectManMainController {
  init(ucEnv) {
    return SubjectManMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return SubjectManMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return SubjectManMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new SubjectManMainController();
