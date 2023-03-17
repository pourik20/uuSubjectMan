"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/topic-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.TOPIC_ERROR_PREFIX}unsupportedKeys`,
  },
};

class TopicAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("topic");
    this.dao.createSchema();

    this.contentDao = DaoFactory.getDao("content");
    this.contentDao.createSchema();

    this.subjectDao = DaoFactory.getDao("subject");
    this.subjectDao.createSchema();
  }

  async delete(awid, dtoIn) {
    let validationResult = this.validator.validate("topicDeleteDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Delete.invalidDtoIn
    );

    let subjects;
    try {
      subjects = await this.subjectDao.list(awid);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Delete.SubjectDaoListFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    let updatedSubjects = [];
    subjects.forEach((subject) => {
      const filteredSubjectContent = subject.topics.filter((topic) => topic !== dtoIn.id);
      if (filteredSubjectContent.length !== subject.topics.length) {
        subject.topics = filteredSubjectContent;
        updatedSubjects.push(subject);
      }
    });

    try {
      for (let i = 0; i < updatedSubjects.length; i++) {
        await this.subjectDao.update(updatedSubjects[i]);
      }
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Delete.SubjectDaoUpdateFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    try {
      await this.dao.delete(awid, dtoIn.id);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Delete.topicDeleteFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    let dtoOut = {};
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async update(awid, dtoIn) {
    let validationResult = this.validator.validate("topicUpdateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Update.invalidDtoIn
    );

    dtoIn.awid = awid;

    if (dtoIn.content) {
      try {
        let promises = [];

        dtoIn.content.forEach((value) => {
          promises.push(this.contentDao.getById(awid, value));
        });

        promises = await Promise.all(promises);

        promises.forEach((value) => {
          if (value === null) throw new Errors.Update.nonExistentContent({ uuAppErrorMap });
        });
      } catch (err) {
        if (err instanceof ObjectStoreError) {
          throw new Errors.Update.nonExistentContent({ uuAppErrorMap }, err);
        }

        throw err;
      }
    }

    let oldTopic;
    try {
      oldTopic = await this.dao.get(awid, dtoIn._id);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Update.nonExistentTopic({ uuAppErrorMap }, err);
      }

      throw err;
    }

    dtoIn.name || (dtoIn.name = oldTopic.name) || (dtoIn.name = null);
    dtoIn.description || (dtoIn.description = oldTopic.description) || (dtoIn.description = null);
    dtoIn.content || (dtoIn.content = oldTopic.content) || (dtoIn.content = []);

    let dtoOut = {};
    try {
      dtoOut.topic = await this.dao.update(dtoIn);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Update.topicUpdateFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    for (let i = 0; i < dtoOut.topic?.content.length; i++) {
      dtoOut.topic.content[i] = await this.contentDao.getById(awid, dtoOut.topic.content[i]);
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("topicGetDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Get.invalidDtoIn
    );

    let dtoOut = {};
    try {
      dtoOut.topic = await this.dao.get(awid, dtoIn.id);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Get.topicGetFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    for (let i = 0; i < dtoOut.topic?.content.length; i++) {
      dtoOut.topic.content[i] = await this.contentDao.getById(awid, dtoOut.topic.content[i]);
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async list(awid, dtoIn) {
    let validationResult = this.validator.validate("topicListDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.List.invalidDtoIn
    );

    let dtoOut = {};
    try {
      dtoOut.topics = await this.dao.list(awid);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.List.contentListFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    for (let i = 0; i < dtoOut.topics.length; i++) {
      for (let j = 0; j < dtoOut.topics[i].content.length; j++) {
        dtoOut.topics[i].content[j] = await this.contentDao.getById(awid, dtoOut.topics[i].content[j]);
      }
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async create(awid, dtoIn) {
    let validationResult = this.validator.validate("topicCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.invalidDtoIn
    );

    dtoIn.awid = awid;

    if (dtoIn.content) {
      try {
        let promises = [];

        dtoIn.content.forEach((value) => {
          promises.push(this.contentDao.getById(awid, value));
        });

        promises = await Promise.all(promises);

        promises.forEach((value) => {
          if (value === null) throw new Errors.Create.nonExistentContent({ uuAppErrorMap });
        });
      } catch (err) {
        if (err instanceof ObjectStoreError) {
          throw new Errors.Create.nonExistentContent({ uuAppErrorMap }, err);
        }

        throw err;
      }
    }

    dtoIn.description || (dtoIn.description = null);
    dtoIn.content || (dtoIn.content = []);

    let dtoOut = {};
    try {
      dtoOut.topic = await this.dao.create(dtoIn);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Create.topicCreateFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    for (let i = 0; i < dtoOut.topic?.content.length; i++) {
      dtoOut.topic.content[i] = await this.contentDao.getById(awid, dtoOut.topic.content[i]);
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new TopicAbl();
