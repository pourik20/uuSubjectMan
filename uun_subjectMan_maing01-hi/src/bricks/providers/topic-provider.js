//@@viewOn:imports
import { createComponent, useMemo, useDataObject } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config";
import TopicContext from "./topic-context";
import Calls from "../../calls";

//@@viewOff:imports

export const TopicProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TopicProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const topicDataObject = useDataObject({
      handlerMap: {
        // load: (dtoIn) => Calls.Topic.get(dtoIn),
        create: (dtoIn) => Calls.Topic.create(dtoIn),
        update: (dtoIn) => Calls.Topic.update(dtoIn),
        delete: (dtoIn) => Calls.Topic.delete(dtoIn),
        get: (dtoIn) => Calls.Topic.get(dtoIn),
      },
      pageSize: 3,
    });

    const providerValue = useMemo(() => {
      return topicDataObject;
    }, [topicDataObject]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <TopicContext.Provider value={providerValue}>
        {typeof props.children === "function" ? props.children(providerValue) : props.children}
      </TopicContext.Provider>
    );
    //@@viewOff:render
  },
});

export default TopicProvider;
