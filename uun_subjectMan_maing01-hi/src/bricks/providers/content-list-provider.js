//@@viewOn:imports
import { createComponent, useMemo, useDataList } from "uu5g05";
import Config from "../config/config";
import ContentListContext from "./content-list-context";
import Calls from "../../calls";

//@@viewOff:imports

export const ContentListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ContentListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const contentListDataList = useDataList({
      handlerMap: {
        load: () => Calls.Content.list({}),
      },
    });
    const providerValue = useMemo(() => {
      return contentListDataList;
    }, [contentListDataList]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <ContentListContext.Provider value={providerValue}>
        {typeof props.children === "function" ? props.children(providerValue) : props.children}
      </ContentListContext.Provider>
    );
    //@@viewOff:render
  },
});
export default ContentListProvider;
