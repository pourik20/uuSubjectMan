"use strict";

const SubjectManMainUseCaseError = require("./subjectman-main-use-case-error.js");
const PROGRAMME_ERROR_PREFIX = `${SubjectManMainUseCaseError.ERROR_PREFIX}programme/`;

const Create = {
  UC_CODE: `${PROGRAMME_ERROR_PREFIX}create/`,
  invalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  programmeCreateFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}programmeDaoCreateFailed`;
      this.message = `Create programme by programme Dao create failed.`;
    }
  },
  nonExistentSubject: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}nonExistentSubject`;
      this.message = `SubjectOptions ID is not existent. Please try again.`;
    }
  },
};

const GetById = {
  UC_CODE: `${PROGRAMME_ERROR_PREFIX}getById/`,
  invalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetById.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  programmeGetByIdFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetById.UC_CODE}programmeDaoGetByIdFailed`;
      this.message = `GetById programme by programme Dao GetByID failed.`;
    }
  },
};

const List = {
  UC_CODE: `${PROGRAMME_ERROR_PREFIX}list/`,
  invalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  programmeListFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}programmeDaoListFailed`;
      this.message = `List programme by programme Dao List failed.`;
    }
  },
};

const Update = {
  UC_CODE: `${PROGRAMME_ERROR_PREFIX}update/`,
  invalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  programmeUpdateFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}programmeDaoUpdateFailed`;
      this.message = `Update programme by programme Dao Update failed.`;
    }
  },
  programmeGetFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}programmeGetFailed`;
      this.message = `Get programme by programme Dao Get failed.`;
    }
  },
  nonExistentSubject: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}nonExistentSubject`;
      this.message = `SubjectOptions ID is not existent. Please try again.`;
    }
  },
};

const Delete = {
  UC_CODE: `${PROGRAMME_ERROR_PREFIX}delete/`,
  invalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  programmeDeleteFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}programmeDaoDeleteFailed`;
      this.message = `Delete programme by programme Dao Delete failed.`;
    }
  },
};

module.exports = {
  Delete,
  Update,
  List,
  GetById,
  Create,
  PROGRAMME_ERROR_PREFIX,
};
