"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { BinaryStoreError } = require("uu_appg01_binarystore");

const Errors = require("../api/errors/content-error");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.PROGRAMME_ERROR_PREFIX}unsupportedKeys`,
  },
};

class ContentAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("content");
    this.dao.createSchema();

    this.binaryDao = DaoFactory.getDao("contentBinary");
    this.binaryDao.createSchema();

    this.topicDao = DaoFactory.getDao("topic");
    this.topicDao.createSchema();
  }

  async update(awid, dtoIn) {
    let validationResult = this.validator.validate("contentUpdateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Update.invalidDtoIn
    );

    let oldContent;
    try {
      oldContent = await this.dao.getById(awid, dtoIn._id);
    } catch (e) {
      if (e instanceof BinaryStoreError) {
        throw new Errors.Update.BinaryDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    if (dtoIn.binary && dtoIn.uri) throw new Errors.Update.ContentTooComplexError({ uuAppErrorMap });

    if ((dtoIn.binary || dtoIn.uri) && oldContent.binary) {
      try {
        await this.binaryDao.deleteByCode(awid, oldContent.binary);
      } catch (e) {
        if (e instanceof BinaryStoreError) {
          throw new Errors.Update.BinaryDaoDeleteFailed({ uuAppErrorMap }, e);
        }
        throw e;
      }
    }

    let contentBinary;
    if (dtoIn.binary) {
      try {
        contentBinary = await this.binaryDao.create({ awid }, dtoIn.binary);
      } catch (e) {
        if (e instanceof BinaryStoreError) {
          throw new Errors.Update.BinaryDaoCreateFailed({ uuAppErrorMap }, e);
        }
        throw e;
      }
      dtoIn.binary = contentBinary.code;
    }

    if (dtoIn.binary || dtoIn.uri) {
      dtoIn.binary ? (dtoIn.uri = null) : (dtoIn.binary = null);
      dtoIn.uri ? (dtoIn.binary = null) : (dtoIn.uri = null);
    } else {
      dtoIn.binary = oldContent.binary;
      dtoIn.uri = oldContent.uri;
    }

    dtoIn.awid = awid;
    dtoIn.name || (dtoIn.name = oldContent.name);
    dtoIn.description || (dtoIn.description = oldContent.description);

    let dtoOut = {};
    try {
      dtoOut.content = await this.dao.update(dtoIn);
    } catch (err) {
      if (contentBinary) {
        await this.binaryDao.deleteByCode(awid, contentBinary.code);
      }
      if (err instanceof ObjectStoreError) {
        throw new Errors.Update.contentUpdateFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async delete(awid, dtoIn) {
    let validationResult = this.validator.validate("contentDeleteDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Delete.invalidDtoIn
    );

    let contentObject = await this.dao.getById(awid, dtoIn.id);

    if (contentObject.binary) {
      try {
        await this.binaryDao.deleteByCode(awid, contentObject.binary);
      } catch (e) {
        if (e instanceof BinaryStoreError) {
          throw new Errors.Delete.BinaryDaoDeleteFailed({ uuAppErrorMap }, e);
        }
        throw e;
      }
    }

    let topics;
    try {
      topics = await this.topicDao.list(awid);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Delete.TopicDaoListFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    let updatedTopics = [];
    topics.forEach((topic) => {
      const filteredTopicContent = topic.content.filter((content) => content !== dtoIn.id);
      if (filteredTopicContent.length !== topic.content.length) {
        topic.content = filteredTopicContent;
        updatedTopics.push(topic);
      }
    });

    try {
      for (let i = 0; i < updatedTopics.length; i++) {
        await this.topicDao.update(updatedTopics[i]);
      }
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Delete.TopicDaoUpdateFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    try {
      await this.dao.delete(awid, dtoIn.id);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Delete.contentDeleteFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    let dtoOut = {};
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async list(awid, dtoIn) {
    let validationResult = this.validator.validate("contentListDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.List.invalidDtoIn
    );

    const listProps = {
      sortBy: dtoIn.sortBy || "name",
      order: dtoIn.order === "desc" ? -1 : 1,
      pageInfo: {
        pageIndex: dtoIn.pageInfo?.pageIndex > 0 ? dtoIn.pageInfo?.pageIndex : 0,
        pageSize: dtoIn.pageInfo?.pageSize > 0 ? dtoIn.pageInfo?.pageSize : 10,
      },
    };

    let dtoOut = {};
    try {
      dtoOut.contents = await this.dao.list(awid, listProps);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.List.contentListFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    dtoOut.pageInfo = {
      pageIndex: listProps.pageInfo.pageIndex,
      pageSize: listProps.pageInfo.pageSize,
      total: dtoOut.contents?.length,
    };

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("contentGetDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Get.invalidDtoIn
    );

    let dtoOut = {};
    try {
      dtoOut.content = await this.dao.getById(awid, dtoIn.id);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Get.contentGetFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async create(awid, dtoIn) {
    let validationResult = this.validator.validate("contentCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.invalidDtoIn
    );

    if (dtoIn.binary && dtoIn.uri) throw new Errors.Create.ContentTooComplexError({ uuAppErrorMap });
    dtoIn.binary ? (dtoIn.uri = null) : (dtoIn.binary = null);
    dtoIn.uri ? (dtoIn.binary = null) : (dtoIn.uri = null);

    let contentBinary;
    if (dtoIn.binary) {
      try {
        contentBinary = await this.binaryDao.create({ awid }, dtoIn.binary);
      } catch (e) {
        if (e instanceof BinaryStoreError) {
          throw new Errors.Create.BinaryDaoCreateFailed({ uuAppErrorMap }, e);
        }
        throw e;
      }
      dtoIn.binary = contentBinary.code;
    }

    dtoIn.awid = awid;

    let dtoOut = {};
    try {
      dtoOut.content = await this.dao.create(dtoIn);
    } catch (err) {
      if (contentBinary) {
        await this.binaryDao.deleteByCode(awid, contentBinary.code);
      }
      if (err instanceof ObjectStoreError) {
        throw new Errors.Create.programmeCreateFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async getBinaryData(awid, dtoIn) {
    let validationResult = this.validator.validate("contentGetBinaryDataDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.GetBinaryData.InvalidDtoIn
    );

    let dtoOut;
    try {
      dtoOut = await this.binaryDao.getDataByCode(awid, dtoIn.binary);
    } catch (err) {
      if (err.code === "uu-app-binarystore/objectNotFound") {
        throw new Errors.GetBinaryData.BinaryDataDoesNotExist({ uuAppErrorMap }, { binary: dtoIn.binary });
      }

      throw err;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new ContentAbl();
