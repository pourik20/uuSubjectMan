"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class TopicMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async create(topic) {
    return super.insertOne(topic);
  }

  async list(awid) {
    return super.aggregate([{ $match: { awid } }]);
  }

  async get(awid, _id) {
    return super.findOne({ awid, _id });
  }

  async update(uuObject) {
    return super.findOneAndUpdate({ awid: uuObject.awid, _id: uuObject._id }, uuObject, "None");
  }

  async delete(awid, _id) {
    return super.deleteOne({ awid, _id });
  }
}

module.exports = TopicMongo;
