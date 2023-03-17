//@@viewOn:imports
import { createVisualComponent, useDataObject, useState } from "uu5g05";

import Config from "./config/config.js";
import Uu5Elements, { Button } from "uu5g05-elements";
import UU5 from "uu5g04";
import "uu5g04-bricks";
import Calls from "../../calls.js";
import UriContent from "../../bricks/subject/uri-content";
import BinaryContent from "../../bricks/subject/binary-content";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      marginBottom: "2rem",
    }),
  grid: () =>
    Config.Css.css({
      marginBottom: "2rem",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const SubjectTopic = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SubjectTopic",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children, topic } = props;
    const [content, setContent] = useState();

    const ContentServer = useDataObject({
      handlerMap: {
        load: (dtoIn) => Calls.Topic.get({ id: topic.id }),
      },
      pageSize: 100,
    });

    //@@viewOff:private

    function serveContent(params) {
      setContent(
        ContentServer.data.topic.content.map((content) =>
          content.uri ? (
            <div className={Css.grid()}>
              <UriContent content={content}></UriContent>
            </div>
          ) : (
            <div className={Css.grid()}>
              <BinaryContent content={content}></BinaryContent>
            </div>
          )
        )
      );
    }

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <div className={Css.main()}>
        <Uu5Elements.Block
          className={Css.main()}
          card="full"
          borderRadius="moderate"
          colorScheme="primary"
          significance="common"
        >
          <UU5.Bricks.Container>
            <UU5.Bricks.Panel
              size="m"
              header={topic.name}
              bgStyleHeader="filled"
              borderRadius="moderate"
              colorSchema="primary"
              iconExpanded="mdi-chevron-up"
              iconCollapsed="mdi-chevron-down"
              content={content}
              onClick={serveContent}
            />
          </UU5.Bricks.Container>
        </Uu5Elements.Block>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SubjectTopic };
export default SubjectTopic;
//@@viewOff:exports
