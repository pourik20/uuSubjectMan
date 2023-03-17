/* eslint-disable */

const topicCreateDtoInType = shape({
  name: string(255).isRequired(),
  description: string(4000),
  content: array(id()),
});

const topicListDtoInType = shape({});

const topicGetDtoInType = shape({
  id: id().isRequired(),
});

const topicUpdateDtoInType = shape({
  _id: id().isRequired(),
  name: string(255),
  description: string(4000),
  content: array(id()),
});

const topicDeleteDtoInType = shape({
  id: id().isRequired(),
});
