"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/programme-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.PROGRAMME_ERROR_PREFIX}unsupportedKeys`,
  },
};

class ProgrammeAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("programme");
    this.dao.createSchema();
    this.subjectDao = DaoFactory.getDao("subject");
    this.subjectDao.createSchema();
  }

  async delete(awid, dtoIn) {
    let validationResult = this.validator.validate("programmeDeleteDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Delete.invalidDtoIn
    );

    let dtoOut = {};
    try {
      await this.dao.delete(awid, dtoIn.id);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Delete.programmeDeleteFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async update(awid, dtoIn) {
    let validationResult = this.validator.validate("programmeUpdateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Update.invalidDtoIn
    );

    if (dtoIn.subjects) {
      try {
        let promises = [];

        dtoIn.subjects.forEach((subject) => {
          subject.subjectOptions.forEach((subjectId) => {
            promises.push(this.subjectDao.get(awid, subjectId));
          });
        });

        promises = await Promise.all(promises);

        promises.forEach((value) => {
          if (value === null) throw new Errors.Update.nonExistentSubject({ uuAppErrorMap });
        });
      } catch (err) {
        if (err instanceof ObjectStoreError) {
          throw new Errors.Update.nonExistentSubject({ uuAppErrorMap }, err);
        }

        throw err;
      }
    }

    let oldProgramme = {};
    try {
      oldProgramme = await this.dao.getById(awid, dtoIn._id);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Update.programmeGetFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    dtoIn.awid = awid;
    dtoIn.name || (dtoIn.name = oldProgramme.name);
    dtoIn.description || (dtoIn.description = oldProgramme.description);
    dtoIn.subjects || (dtoIn.subjects = oldProgramme.subjects);

    let dtoOut = {};
    try {
      dtoOut.programme = await this.dao.update(dtoIn);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Update.programmeUpdateFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    for (let i = 0; i < dtoOut.programme?.subjects.length; i++) {
      for (let j = 0; j < dtoOut.programme.subjects[i].subjectOptions?.length; j++) {
        dtoOut.programme.subjects[i].subjectOptions[j] = await this.subjectDao.get(
          awid,
          dtoOut.programme.subjects[i].subjectOptions[j]
        );
      }
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async list(awid, dtoIn) {
    let validationResult = this.validator.validate("programmeListDtoInType", dtoIn);
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
      dtoOut.itemList = await this.dao.list(awid, listProps);
      console.log(dtoOut);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.List.programmeListFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    dtoOut.pageInfo = {
      pageIndex: listProps.pageInfo.pageIndex,
      pageSize: listProps.pageInfo.pageSize,
      total: dtoOut.itemList.length,
    };

    for (let i = 0; i < dtoOut.itemList.length; i++) {
      for (let j = 0; j < dtoOut.itemList[i].subjects.length; j++) {
        for (let k = 0; k < dtoOut.itemList[i].subjects[j].subjectOptions?.length; k++) {
          dtoOut.itemList[i].subjects[j].subjectOptions[k] = await this.subjectDao.get(
            awid,
            dtoOut.itemList[i].subjects[j].subjectOptions[k]
          );
        }
      }
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async getById(awid, dtoIn) {
    let validationResult = this.validator.validate("programmeGetByIdDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.GetById.invalidDtoIn
    );

    let dtoOut = {};
    try {
      dtoOut.programme = await this.dao.getById(awid, dtoIn.id);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.GetById.programmeGetByIdFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    for (let i = 0; i < dtoOut.programme?.subjects.length; i++) {
      for (let j = 0; j < dtoOut.programme.subjects[i].subjectOptions?.length; j++) {
        dtoOut.programme.subjects[i].subjectOptions[j] = await this.subjectDao.get(
          awid,
          dtoOut.programme.subjects[i].subjectOptions[j]
        );
      }
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async create(awid, dtoIn) {
    let validationResult = this.validator.validate("programmeCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.invalidDtoIn
    );

    if (dtoIn.subjects) {
      try {
        let promises = [];

        dtoIn.subjects.forEach((subject) => {
          subject.subjectOptions.forEach((subjectId) => {
            promises.push(this.subjectDao.get(awid, subjectId));
          });
        });

        promises = await Promise.all(promises);

        promises.forEach((value) => {
          if (value === null) throw new Errors.Create.nonExistentSubject({ uuAppErrorMap });
        });
      } catch (err) {
        if (err instanceof ObjectStoreError) {
          throw new Errors.Create.nonExistentSubject({ uuAppErrorMap }, err);
        }

        throw err;
      }
    }

    dtoIn.awid = awid;
    dtoIn.description || (dtoIn.description = null);
    dtoIn.subjects || (dtoIn.subjects = []);

    let dtoOut = {};
    try {
      dtoOut.programme = await this.dao.create(dtoIn);
    } catch (err) {
      if (err instanceof ObjectStoreError) {
        throw new Errors.Create.programmeCreateFailed({ uuAppErrorMap }, err);
      }

      throw err;
    }

    for (let i = 0; i < dtoOut.programme?.subjects.length; i++) {
      for (let j = 0; j < dtoOut.programme.subjects[i].subjectOptions?.length; j++) {
        dtoOut.programme.subjects[i].subjectOptions[j] = await this.subjectDao.get(
          awid,
          dtoOut.programme.subjects[i].subjectOptions[j]
        );
      }
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new ProgrammeAbl();
