import { Environment } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";

// the base URI of calls for development / staging environments can be configured in *-hi/env/development.json
// (or <stagingEnv>.json), e.g.:
//   "uu5Environment": {
//     "callsBaseUri": "http://localhost:8080/vnd-app/awid"
//   }
const CALLS_BASE_URI =
  (process.env.NODE_ENV !== "production" ? Environment.get("callsBaseUri") : null) || Environment.appBaseUri;

const Calls = {
  async call(method, url, dtoIn, clientOptions) {
    const response = await Plus4U5.Utils.AppClient[method](url, dtoIn, clientOptions);
    return response.data;
  },

  // // example for mock calls
  // loadDemoContent(dtoIn) {
  //   const commandUri = Calls.getCommandUri("loadDemoContent");
  //   return Calls.call("get", commandUri, dtoIn);
  // },

  loadIdentityProfiles() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/initUve");
    return Calls.call("get", commandUri);
  },

  initWorkspace(dtoInData) {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/init");
    return Calls.call("post", commandUri, dtoInData);
  },

  getWorkspace() {
    const commandUri = Calls.getCommandUri("sys/uuAppWorkspace/get");
    return Calls.call("get", commandUri);
  },

  async initAndGetWorkspace(dtoInData) {
    await Calls.initWorkspace(dtoInData);
    return await Calls.getWorkspace();
  },

  Programme: {
    async list(dtoIn) {
      const commandUri = Calls.getCommandUri("programme/list");
      const test = await Calls.call("get", commandUri, dtoIn);
      console.log("TEST PROGRAMME", test);
      return Calls.call("get", commandUri, dtoIn);
    },

    create(dtoIn) {
      const commandUri = Calls.getCommandUri("programme/create");
      return Calls.call("post", commandUri, dtoIn);
    },

    update(dtoIn) {
      const commandUri = Calls.getCommandUri("programme/update");
      return Calls.call("post", commandUri, dtoIn);
    },

    getById(dtoIn) {
      const commandUri = Calls.getCommandUri("programme/getById");
      return Calls.call("get", commandUri, dtoIn);
    },

    delete(dtoIn) {
      const commandUri = Calls.getCommandUri("programme/delete");
      return Calls.call("post", commandUri, dtoIn);
    },
  },

  Subject: {
    async list(dtoIn) {
      const commandUri = Calls.getCommandUri("subject/list");
      const test = await Calls.call("get", commandUri, dtoIn);
      console.log("TEST SUBJECT", test);
      return { itemList: [...test.subjects], pageInfo: { pageIndex: 0, pageSize: 10, total: test.subjects.length } };
    },

    listContent(dtoIn) {
      const commandUri = Calls.getCommandUri("subject/listContent");
      return Calls.call("get", commandUri, dtoIn);
    },

    create(dtoIn) {
      const commandUri = Calls.getCommandUri("subject/create");
      return Calls.call("post", commandUri, dtoIn);
    },

    update(dtoIn) {
      const commandUri = Calls.getCommandUri("subject/update");
      return Calls.call("post", commandUri, dtoIn);
    },

    get(dtoIn) {
      const commandUri = Calls.getCommandUri("subject/get");
      return Calls.call("get", commandUri, dtoIn);
    },

    delete(dtoIn) {
      const commandUri = Calls.getCommandUri("subject/delete");
      return Calls.call("post", commandUri, dtoIn);
    },
  },

  Topic: {
    async list(dtoIn) {
      const commandUri = Calls.getCommandUri("topic/list");
      const test = await Calls.call("get", commandUri, dtoIn);
      console.log("TEST TOPIC", test);
      return { itemList: [...test.topics], pageInfo: { pageIndex: 0, pageSize: 10, total: test.topics.length } };
    },

    create(dtoIn) {
      const commandUri = Calls.getCommandUri("topic/create");
      return Calls.call("post", commandUri, dtoIn);
    },

    update(dtoIn) {
      const commandUri = Calls.getCommandUri("topic/update");
      return Calls.call("post", commandUri, dtoIn);
    },

    get(dtoIn) {
      const commandUri = Calls.getCommandUri("topic/get");
      return Calls.call("get", commandUri, dtoIn);
    },

    delete(dtoIn) {
      const commandUri = Calls.getCommandUri("topic/delete");
      return Calls.call("post", commandUri, dtoIn);
    },
  },

  Content: {
    async list(dtoIn) {
      const commandUri = Calls.getCommandUri("content/list");
      const test = await Calls.call("get", commandUri, dtoIn);
      console.log("TEST CONTENT", test);
      return { itemList: [...test.contents], pageInfo: { pageIndex: 0, pageSize: 10, total: test.contents.length } };
    },

    create(dtoIn) {
      const commandUri = Calls.getCommandUri("content/create");
      return Calls.call("post", commandUri, dtoIn);
    },

    update(dtoIn) {
      const commandUri = Calls.getCommandUri("content/update");
      return Calls.call("post", commandUri, dtoIn);
    },

    get(dtoIn) {
      const commandUri = Calls.getCommandUri("content/update");
      return Calls.call("post", commandUri, dtoIn);
    },

    getBinaryData(dtoIn) {
      const commandUri = Calls.getCommandUri("content/getBinaryData");
      return Calls.call("get", commandUri, dtoIn);
    },

    delete(dtoIn) {
      const commandUri = Calls.getCommandUri("content/delete");
      return Calls.call("post", commandUri, dtoIn);
    },
  },

  getCommandUri(useCase, baseUri = CALLS_BASE_URI) {
    return (!baseUri.endsWith("/") ? baseUri + "/" : baseUri) + (useCase.startsWith("/") ? useCase.slice(1) : useCase);
  },
};

export default Calls;
