/* eslint-disable */

const contentCreateDtoInType = shape({
  name: string(255).isRequired(),
  description: string(4000),
  uri: uri(),
  binary: binary(),
});

const contentGetBinaryDataDtoInType = shape({
  binary: code().isRequired(),
  contentDisposition: oneOf(["inline", "attachment"]),
});

const contentGetDtoInType = shape({
  id: id().isRequired(),
});

const contentListDtoInType = shape({
  sortBy: oneOf(["name", "uri", "binary"]),
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});

const contentDeleteDtoInType = shape({
  id: id().isRequired(),
});

const contentUpdateDtoInType = shape({
  _id: id().isRequired(),
  name: string(255),
  description: string(4000),
  uri: uri(),
  binary: binary(),
});
