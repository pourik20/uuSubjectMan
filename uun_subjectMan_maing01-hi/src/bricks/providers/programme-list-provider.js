//@@viewOn:imports
import { createComponent, useMemo, useDataList } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config";
import ProgrammeListContext from "./programme-list-context";
import Calls from "../../calls";

//@@viewOff:imports

export const ProgrammeListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ProgrammeListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const programmeListDataList = useDataList({
      handlerMap: {
        load: (dtoIn) => Calls.Programme.list(dtoIn),
        loadNext: (dtoIn) => Calls.Programme.list(dtoIn),
      },
      pageSize: 10,
    });
    const providerValue = useMemo(() => {
      return programmeListDataList;
    }, [programmeListDataList]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <ProgrammeListContext.Provider value={providerValue}>
        {typeof props.children === "function" ? props.children(providerValue) : props.children}
      </ProgrammeListContext.Provider>
    );
    //@@viewOff:render
  },
});

export default ProgrammeListProvider;
