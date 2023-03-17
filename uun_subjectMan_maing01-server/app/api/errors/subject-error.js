"use strict";

const SubjectManMainUseCaseError = require("./subjectman-main-use-case-error.js");
const SUBJECT_ERROR_PREFIX = `${SubjectManMainUseCaseError.ERROR_PREFIX}subject/`;

const Create = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}create/`,
  invalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  subjectCreateFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectCreateFailed`;
      this.message = `Subject create failed at Subject create DAO.`;
    }
  },
  nonExistentTopics: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}nonExistentTopics`;
      this.message = `Topics ID is not valid. Please check it and try again.`;
    }
  },
};

const List = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}list/`,
  invalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  subjectListFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}subjectListFailed`;
      this.message = `Subject List failed at Subject List DAO.`;
    }
  },
};

const Get = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}get/`,
  invalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  subjectGetFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}subjectGetFailed`;
      this.message = `Subject Get failed at Subject Get DAO.`;
    }
  },
};

const Update = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}update/`,
  invalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  subjectUpdateFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}subjectUpdateFailed`;
      this.message = `Subject Update failed at Subject Update DAO.`;
    }
  },
  nonExistentTopics: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}nonExistentTopics`;
      this.message = `Topics ID is not valid. Please check it and try again.`;
    }
  },
  subjectGetFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}subjectGetFailed`;
      this.message = `Subject Get failed at Subject Get DAO.`;
    }
  },
};

const Delete = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}delete/`,
  invalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  subjectDeleteFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}subjectDeleteFailed`;
      this.message = `Subject Delete failed at Subject Delete DAO.`;
    }
  },
  ProgrammeDaoListFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}ProgrammeDaoListFailed`;
      this.message = `Programme List failed at Programme List DAO.`;
    }
  },
  ProgrammeDaoUpdateFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}ProgrammeDaoUpdateFailed`;
      this.message = `Programme Update failed at Programme Update DAO.`;
    }
  },
};

const ListContent = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}listContent/`,
  invalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListContent.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  subjectListContentFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListContent.UC_CODE}subjectListContentFailed`;
      this.message = `Subject listContent failed at Subject listContent DAO.`;
    }
  },
  topicsGetFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListContent.UC_CODE}topicsGetFailed`;
      this.message = `Topics Get failed at Topics Get DAO.`;
    }
  },
  contentGetFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListContent.UC_CODE}contentGetFailed`;
      this.message = `Content Get failed at Content Get DAO.`;
    }
  },
};

module.exports = {
  ListContent,
  Delete,
  Update,
  Get,
  List,
  Create,
  SUBJECT_ERROR_PREFIX,
};
