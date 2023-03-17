//@@viewOn:imports
import { createComponent, useMemo, useDataObject, useRoute } from "uu5g05";

import Uu5Elements from "uu5g05-elements";
import Config from "../config/config";
import SubjectContext from "./subject-context";
import Calls from "../../calls";

//@@viewOff:imports

export const SubjectProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SubjectProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [route, setRoute] = useRoute();

    const subjectDataObject = useDataObject({
      handlerMap: {
        load: (dtoIn) => Calls.Subject.get({ id: route.params.id }),

        create: (dtoIn) => Calls.Subject.create(dtoIn),
        update: (dtoIn) => Calls.Subject.update(dtoIn),
        delete: (dtoIn) => Calls.Subject.delete(dtoIn),
        get: (dtoIn) => Calls.Subject.get(dtoIn),
      },
      pageSize: 20,
    });

    const providerValue = useMemo(() => {
      return subjectDataObject;
    }, [subjectDataObject]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <SubjectContext.Provider value={providerValue}>
        {typeof props.children === "function" ? props.children(providerValue) : props.children}
      </SubjectContext.Provider>
    );
    //@@viewOff:render
  },
});

export default SubjectProvider;
