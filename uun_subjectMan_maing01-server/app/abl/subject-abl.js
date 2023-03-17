"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/subject-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.SUBJECT_ERROR_PREFIX}unsupportedKeys`,
  },
};

class SubjectAbl {
  constructor() {
    this.validator = Validator.load();

    this.dao = DaoFactory.getDao("subject");
    this.dao.createSchema();

    this.topicsDao = DaoFactory.getDao("topic");
    this.topicsDao.createSchema();

    this.programmeDao = DaoFactory.getDao("programme");
    this.programmeDao.createSchema();

    this.contentDao = DaoFactory.getDao("content");
    this.contentDao.createSchema();
  }

  async listContent(awid, dtoIn) {
    let validationResult = this.validator.validate("subjectListContentDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.ListContent.invalidDtoIn
    );

    let dtoOut = {};
    let subject = {};
    try {
      subject = await this.dao.get(awid, dtoIn.id);
      if (subject == null) throw new new Errors.ListContent.subjectListContentFailed({ uuAppErrorMap }, err)();
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.ListContent.subjectListContentFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    let topics = [];
    let content = [];
    try {
      topics = subject.topics.map((topicId) => this.topicsDao.get(awid, topicId));
      topics = await Promise.all(topics);
      topics.forEach((topic) => {
        content.push(...topic.content);
      });
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.ListContent.topicsGetFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    try {
      content = content.map((contentId) => this.contentDao.getById(awid, contentId));
      dtoOut.content = await Promise.all(content);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.ListContent.contentGetFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async delete(awid, dtoIn) {
    let validationResult = this.validator.validate("subjectDeleteDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Delete.invalidDtoIn
    );

    let programmes;
    try {
      programmes = await this.programmeDao.listAll(awid);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Delete.ProgrammeDaoListFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    let updatedProgrammes = [];
    programmes.forEach((programme) => {
      let updated = false;

      let newProgramme = { ...programme };
      newProgramme.subjects = programme.subjects.map((subject) => {
        subject.subjectOptions = subject.subjectOptions.filter((subjectId) => {
          if (subjectId == dtoIn.id) {
            updated = true;
            return false;
          }
          return true;
        });
        if (subject.subjectOptions.length == 0) {
          return null;
        }
      });

      if (updated) {
        newProgramme.subjects = programme.subjects.filter((subject) => subject.subjectOptions.length != 0);
        updatedProgrammes.push(newProgramme);
      }
    });

    try {
      for (let i = 0; i < updatedProgrammes.length; i++) {
        await this.programmeDao.update(updatedProgrammes[i]);
      }
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Delete.ProgrammeDaoUpdateFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    try {
      await this.dao.delete(awid, dtoIn.id);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Delete.subjectDeleteFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    let dtoOut = {};
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async update(awid, dtoIn) {
    let validationResult = this.validator.validate("subjectUpdateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Update.invalidDtoIn
    );

    if (dtoIn.topics) {
      try {
        let promises = [];

        dtoIn.topics.forEach((value) => {
          promises.push(this.topicsDao.get(awid, value));
        });

        promises = await Promise.all(promises);

        promises.forEach((value) => {
          if (value === null) throw new Errors.Update.nonExistentTopics({ uuAppErrorMap });
        });
      } catch (err) {
        if (err instanceof ObjectStoreError) {
          throw new Errors.Update.nonExistentTopics({ uuAppErrorMap }, err);
        }

        throw err;
      }
    }

    let oldSubject = {};
    try {
      oldSubject = await this.dao.get(awid, dtoIn._id);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Update.subjectGetFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    dtoIn.awid = awid;
    dtoIn.name || (dtoIn.name = oldSubject.name);
    dtoIn.description || (dtoIn.description = oldSubject.description);
    dtoIn.credits || (dtoIn.credits = oldSubject.credits);
    dtoIn.supervisor || (dtoIn.supervisor = oldSubject.supervisor);
    dtoIn.goal || (dtoIn.goal = oldSubject.goal);
    dtoIn.degree || (dtoIn.degree = oldSubject.degree);
    dtoIn.language || (dtoIn.language = oldSubject.language);
    dtoIn.topics || (dtoIn.topics = oldSubject.topics);

    let dtoOut = {};
    try {
      dtoOut.subject = await this.dao.update(dtoIn);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Update.subjectUpdateFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    for (let i = 0; i < dtoOut.subject?.topics.length; i++) {
      dtoOut.subject.topics[i] = await this.topicsDao.get(awid, dtoOut.subject.topics[i]);
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("subjectGetDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Get.invalidDtoIn
    );

    let dtoOut = {};
    try {
      dtoOut.subject = await this.dao.get(awid, dtoIn.id);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Get.subjectGetFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    for (let i = 0; i < dtoOut.subject?.topics.length; i++) {
      dtoOut.subject.topics[i] = await this.topicsDao.get(awid, dtoOut.subject.topics[i]);
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async list(awid, dtoIn) {
    let validationResult = this.validator.validate("subjectListDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.List.invalidDtoIn
    );

    let dtoOut = {};
    try {
      dtoOut.subjects = await this.dao.list(awid);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.List.subjectListFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    for (let i = 0; i < dtoOut.subjects.length; i++) {
      for (let j = 0; j < dtoOut.subjects[i].topics.length; j++) {
        dtoOut.subjects[i].topics[j] = await this.topicsDao.get(awid, dtoOut.subjects[i].topics[j]);
      }
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async create(awid, dtoIn) {
    let validationResult = this.validator.validate("subjectCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.invalidDtoIn
    );

    dtoIn.awid = awid;

    if (dtoIn.topics) {
      try {
        let promises = [];

        dtoIn.topics.forEach((value) => {
          promises.push(this.topicsDao.get(awid, value));
        });

        promises = await Promise.all(promises);

        promises.forEach((value) => {
          if (value === null) throw new Errors.Create.nonExistentTopics({ uuAppErrorMap });
        });
      } catch (err) {
        if (err instanceof ObjectStoreError) {
          throw new Errors.Create.nonExistentTopics({ uuAppErrorMap }, err);
        }

        throw err;
      }
    }

    dtoIn.description || (dtoIn.description = null);
    dtoIn.topics || (dtoIn.topics = []);

    let dtoOut = {};
    try {
      dtoOut.subject = await this.dao.create(dtoIn);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Create.subjectCreateFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    for (let i = 0; i < dtoOut.subject?.topics.length; i++) {
      dtoOut.subject.topics[i] = await this.topicsDao.get(awid, dtoOut.subject.topics[i]);
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new SubjectAbl();
