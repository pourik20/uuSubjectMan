//@@viewOn:imports
import { createComponent, useMemo, useDataList } from "uu5g05";
import Config from "../config/config";
import TopicListContext from "./topic-list-context";
import Calls from "../../calls";

//@@viewOff:imports

export const TopicListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TopicListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const topicListDataList = useDataList({
      handlerMap: {
        load: () => Calls.Topic.list({}),
      },
    });
    const providerValue = useMemo(() => {
      return topicListDataList;
    }, [topicListDataList]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <TopicListContext.Provider value={providerValue}>
        {typeof props.children === "function" ? props.children(providerValue) : props.children}
      </TopicListContext.Provider>
    );
    //@@viewOff:render
  },
});
export default TopicListProvider;
