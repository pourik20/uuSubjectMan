//@@viewOn:imports
import { createComponent, useMemo, useDataObject, useRoute } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config";
import ProgrammeContext from "./programme-context";
import Calls from "../../calls";

//@@viewOff:imports

export const ProgrammeProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ProgrammeProvider",
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

    const programmeDataObject = useDataObject({
      handlerMap: {
        load: (dtoIn) => Calls.Programme.getById({ id: route.params.id }),

        create: (dtoIn) => Calls.Programme.create(dtoIn),
        get: (dtoIn) => Calls.Programme.getById(dtoIn),
        update: (dtoIn) => Calls.Programme.update(dtoIn),
        delete: (dtoIn) => Calls.Programme.delete(dtoIn),
      },
      pageSize: 3,
    });

    const providerValue = useMemo(() => {
      return programmeDataObject;
    }, [programmeDataObject]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <ProgrammeContext.Provider value={providerValue}>
        {typeof props.children === "function" ? props.children(providerValue) : props.children}
      </ProgrammeContext.Provider>
    );
    //@@viewOff:render
  },
});

export default ProgrammeProvider;
