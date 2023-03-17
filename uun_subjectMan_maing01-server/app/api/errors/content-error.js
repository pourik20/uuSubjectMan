"use strict";

const SubjectManMainUseCaseError = require("./subjectman-main-use-case-error.js");
const CONTENT_ERROR_PREFIX = `${SubjectManMainUseCaseError.ERROR_PREFIX}content/`;

const Create = {
  UC_CODE: `${CONTENT_ERROR_PREFIX}create/`,
  invalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  contentCreateFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}contentCreateFailed`;
      this.message = `Content create failed at Content create DAO.`;
    }
  },
  BinaryDaoCreateFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}binaryContentCreateFailed`;
      this.message = `binaryContent create failed at binaryContent create DAO.`;
    }
  },
  ContentTooComplexError: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}ContentTooComplexError`;
      this.message = `Beware, you can only have one type of content. Either uri or BinaryData can be inputted at same time.`;
    }
  },
};

const GetBinaryData = {
  UC_CODE: `${CONTENT_ERROR_PREFIX}getBinaryData/`,

  InvalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetBinaryData.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  BinaryDataDoesNotExist: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetBinaryData.UC_CODE}binaryDataDoesNotExist`;
      this.message = "Object contentBinary does not exist.";
    }
  },
};

const Get = {
  UC_CODE: `${CONTENT_ERROR_PREFIX}get/`,
  invalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  contentGetFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}contentGetFailed`;
      this.message = `Content Get failed at Content Get DAO.`;
    }
  },
};

const List = {
  UC_CODE: `${CONTENT_ERROR_PREFIX}list/`,
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
      this.message = `Content List failed at Content List DAO.`;
    }
  },
};

const Delete = {
  UC_CODE: `${CONTENT_ERROR_PREFIX}delete/`,
  invalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  contentDeleteFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}contentDeleteFailed`;
      this.message = `Content Delete failed at Content Delete DAO.`;
    }
  },
  BinaryDaoDeleteFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}binaryDaoDeleteFailed`;
      this.message = `ContentBinary Delete failed at ContentBinary Delete DAO.`;
    }
  },
  TopicDaoListFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}topicDaoListFailed`;
      this.message = `Topic List failed at Topic List DAO.`;
    }
  },
  TopicDaoUpdateFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}topicDaoUpdateFailed`;
      this.message = `Topic Update failed at Topic Update DAO.`;
    }
  },
};

const Update = {
  UC_CODE: `${CONTENT_ERROR_PREFIX}update/`,
  invalidDtoIn: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = `DtoIn is not valid.`;
    }
  },
  contentUpdateFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}contentUpdateFailed`;
      this.message = `Content Update failed at Content Update DAO.`;
    }
  },
  BinaryDaoUpdateFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}binaryContentUpdateFailed`;
      this.message = `binaryContent Update failed at binaryContent Update DAO.`;
    }
  },
  ContentTooComplexError: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}ContentTooComplexError`;
      this.message = `Beware, you can only have one type of content. Either uri or BinaryData can be inputted at same time. If you wish to change the content type, please pass in the other field with "null" type`;
    }
  },
  contentGetFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}contentGetFailed`;
      this.message = `Content Get failed at Content Get DAO.`;
    }
  },
  BinaryDaoDeleteFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}binaryDaoDeleteFailed`;
      this.message = `ContentBinary Delete failed at ContentBinary Delete DAO.`;
    }
  },
  BinaryDaoCreateFailed: class extends SubjectManMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}binaryContentCreateFailed`;
      this.message = `binaryContent create failed at binaryContent create DAO.`;
    }
  },
};

module.exports = {
  Update,
  Delete,
  List,
  Get,
  GetBinaryData,
  Create,
  CONTENT_ERROR_PREFIX,
};
