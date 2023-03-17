"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ProgrammeMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async create(programme) {
    return super.insertOne(programme);
  }
  async getById(awid, id) {
    return super.findOne({ _id: id, awid: awid });
  }
  async list(awid, listProps) {
    return super.aggregate([
      { $match: { awid: awid } },
      { $sort: { [listProps.sortBy]: listProps.order } },
      { $skip: listProps.pageInfo.pageIndex * listProps.pageInfo.pageSize },
      { $limit: listProps.pageInfo.pageSize },
    ]);
  }

  async listAll(awid) {
    return super.aggregate([{ $match: { awid } }]);
  }

  async update(newProgramme) {
    return super.findOneAndUpdate({ awid: newProgramme.awid, _id: newProgramme._id }, newProgramme, "None");
  }
  async delete(awid, _id) {
    return super.deleteOne({ awid, _id });
  }
}

module.exports = ProgrammeMongo;
