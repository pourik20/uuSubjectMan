//@@viewOn:imports
import { createComponent, useMemo, useDataList } from "uu5g05";
import Config from "../config/config";
import SubjectListContext from "./subject-list-context";
import Calls from "../../calls";

//@@viewOff:imports

export const SubjectListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SubjectListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const subjectListDataList = useDataList({
      handlerMap: {
        load: () => Calls.Subject.list({}),
      },
    });
    const providerValue = useMemo(() => {
      return subjectListDataList;
    }, [subjectListDataList]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <SubjectListContext.Provider value={providerValue}>
        {typeof props.children === "function" ? props.children(providerValue) : props.children}
      </SubjectListContext.Provider>
    );
    //@@viewOff:render
  },
});
export default SubjectListProvider;
