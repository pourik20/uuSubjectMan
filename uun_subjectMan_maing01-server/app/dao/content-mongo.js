"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ContentMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async create(content) {
    return super.insertOne(content);
  }

  async getById(awid, id) {
    return super.findOne({ awid, _id: id });
  }

  async list(awid, listProps) {
    return super.aggregate([
      { $match: { awid: awid } },
      { $sort: { [listProps.sortBy]: listProps.order } },
      { $skip: listProps.pageInfo.pageIndex * listProps.pageInfo.pageSize },
      { $limit: listProps.pageInfo.pageSize },
    ]);
  }

  async delete(awid, _id) {
    return super.deleteOne({ awid, _id });
  }

  async update(uuObject) {
    return super.findOneAndUpdate({ awid: uuObject.awid, _id: uuObject._id }, uuObject, "None");
  }
}

module.exports = ContentMongo;
