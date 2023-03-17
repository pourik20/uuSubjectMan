//@@viewOn:imports
import { createComponent, useMemo, useDataObject, useRoute } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config";
import SubjectTopic from "./subject-topic";
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

    const SubjectTopicList = useDataObject({
      handlerMap: {
        load: (dtoIn) => Calls.Topic.get({ id: route.params.id }),
        // load: (dtoIn) => Calls.Topic.get({ dtoIn }),
        // load: (dtoIn) => Calls.Topic.get({ id: route.params.id }),
        // load: (dtoIn) => Calls.Topic.list({ dtoIn }),
        // load: (dtoIn) => Calls.Topic.list({ id: route.params.sid }),
      },
      pageSize: 5,
    });

    const providerValue = useMemo(() => {
      return SubjectTopicList;
    }, [SubjectTopicList]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <SubjectTopic.Provider value={providerValue}>
        {typeof props.children === "function" ? props.children(providerValue) : props.children}
      </SubjectTopic.Provider>
    );
    //@@viewOff:render
  },
});

export default SubjectTopicProvider;
