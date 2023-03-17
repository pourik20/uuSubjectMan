/* eslint-disable */

const programmeCreateDtoInType = shape({
  name: string(255).isRequired(),
  description: string(4000),
  subjects: array(
    shape({
      subjectOptions: array(id()).isRequired(),
      type: oneOf(["obligatory", "selective", "obligatory-selective"]).isRequired(),
    })
  ),
});

const programmeGetByIdDtoInType = shape({
  id: id().isRequired(),
});

const programmeListDtoInType = shape({
  sortBy: oneOf(["name"]),
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});

const programmeUpdateDtoInType = shape({
  _id: id().isRequired(),
  name: string(255),
  description: string(4000),
  subjects: array(
    shape({
      subjectOptions: array(id()).isRequired(),
      type: oneOf(["obligatory", "selective", "obligatory-selective"]).isRequired(),
    })
  ),
});

const programmeDeleteDtoInType = shape({
  id: id().isRequired(),
});
