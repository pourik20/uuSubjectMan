"use strict";

const SubjectManMainUseCaseError = require("./subjectman-main-use-case-error.js");
const TOPIC_ERROR_PREFIX = `${SubjectManMainUseCaseError.ERROR_PREFIX}topic/`;

const Create = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}create/`,
  invalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  topicCreateFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}topicCreateFailed`;
      this.message = `Topic create failed at Topic create DAO.`;
    }
  },
  nonExistentContent: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}nonExistentContent`;
      this.message = `Content ID is not valid. Please check it and try again.`;
    }
  },
};

const List = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}list/`,
  invalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  contentListFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}contentListFailed`;
      this.message = `content List failed at content List DAO.`;
    }
  },
};

const Get = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}get/`,
  invalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  topicGetFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}topicGetFailed`;
      this.message = `Topic Get failed at Topic Get DAO.`;
    }
  },
};

const Update = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}update/`,
  invalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  topicUpdateFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}topicUpdateFailed`;
      this.message = `Topic Update failed at Topic Update DAO.`;
    }
  },
  nonExistentContent: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}nonExistentContent`;
      this.message = `Content ID is not valid. Please check it and try again.`;
    }
  },
  nonExistentTopic: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}nonExistentContent`;
      this.message = `Topic ID was not found. Please check it and try again.`;
    }
  },
};

const Delete = {
  UC_CODE: `${TOPIC_ERROR_PREFIX}delete/`,
  invalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  topicDeleteFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}topicDeleteFailed`;
      this.message = `Topic Delete failed at Topic Delete DAO.`;
    }
  },
  SubjectDaoListFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}SubjectDaoListFailed`;
      this.message = `Subject List failed at Subject List DAO.`;
    }
  },
  SubjectDaoUpdateFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}SubjectDaoUpdateFailed`;
      this.message = `Subject Update failed at Topic Update DAO.`;
    }
  },
};

module.exports = {
  Delete,
  Update,
  Get,
  List,
  Create,
  TOPIC_ERROR_PREFIX,
};
