"use strict";
const ContentAbl = require("../../abl/content-abl.js");

class ContentController {

  update(ucEnv) {
    return ContentAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  delete(ucEnv) {
    return ContentAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return ContentAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return ContentAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return ContentAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  async getBinaryData(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let dtoOut = await ContentAbl.getBinaryData(ucEnv.getUri().getAwid(), dtoIn);
    return ucEnv.setBinaryDtoOut(dtoOut, dtoIn.contentDisposition);
  }
}

module.exports = new ContentController();
