/* eslint-disable */

const subjectCreateDtoInType = shape({
  name: string(255).isRequired(),
  description: string(4000),
  credits: number().isRequired(),
  supervisor: uuIdentity().isRequired(),
  goal: string(4000).isRequired(),
  degree: oneOf(["Bc.", "Mgr."]).isRequired(),
  language: oneOf(["en", "cz"]).isRequired(),
  topics: array(id()),
});

const subjectListDtoInType = shape({});

const subjectGetDtoInType = shape({
  id: id().isRequired(),
});

const subjectUpdateDtoInType = shape({
  _id: id().isRequired(),
  name: string(255),
  description: string(4000),
  credits: number(),
  supervisor: uuIdentity(),
  goal: string(4000),
  degree: oneOf(["Bc.", "Mgr."]),
  language: oneOf(["en", "cz"]),
  topics: array(id()),
});

const subjectDeleteDtoInType = shape({
  id: id().isRequired(),
});

const subjectListContentDtoInType = shape({
  id: id().isRequired(),
});
