"use strict";
const ProgrammeAbl = require("../../abl/programme-abl.js");

class ProgrammeController {
  delete(ucEnv) {
    return ProgrammeAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  update(ucEnv) {
    return ProgrammeAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  list(ucEnv) {
    return ProgrammeAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  getById(ucEnv) {
    return ProgrammeAbl.getById(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  create(ucEnv) {
    return ProgrammeAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new ProgrammeController();
