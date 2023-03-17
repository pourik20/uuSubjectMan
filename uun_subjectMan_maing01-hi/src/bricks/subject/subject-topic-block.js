//@@viewOn:imports
import { createVisualComponent, Utils, useState, useEffect } from "uu5g05";
import Config from "./config/config.js";
import SubjectTopic from "./subject-topic.js";
import Uu5Elements, { Button } from "uu5g05-elements";

import { useSubject } from "../providers/subject-context.js";

import SubjectAllContent from "./subject-all-content.js";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const SubjectTopicBlock = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SubjectTopicBlock",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const [subjectInfo, setSubjectInfo] = useState();
    const [allContent, setAllContent] = useState(false);

    const subjectContext = useSubject();

    useEffect(() => {
      setSubjectInfo(getTopic());
    }, []);

    // //@@viewOn:private

    function getTopic() {
      return subjectContext.data.subject.topics.map((topics) => {
        return <SubjectTopic key={topics.id} topic={topics} />;
      });
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(
      props,
      SubjectTopicBlock
    );
    {
    }
    return (
      <>
        <Button onClick={() => setAllContent((current) => !current)}>
          AllContent
        </Button>
        {allContent ? (
          <Uu5Elements.Block
            className={Css.main()}
            card="full"
            borderRadius="moderate"
            headerType="title"
            header="Topics"
            headerSeparator
            colorScheme="primary"
            significance="distinct"
          >
            <SubjectAllContent subjectID={subjectContext.data.subject.id} />
          </Uu5Elements.Block>
        ) : (
          <Uu5Elements.Block
            className={Css.main()}
            card="full"
            borderRadius="moderate"
            headerType="title"
            header="Topics"
            headerSeparator
            colorScheme="primary"
            significance="distinct"
          >
            {subjectInfo}
          </Uu5Elements.Block>
        )}
      </>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SubjectTopicBlock };
export default SubjectTopicBlock;
//@@viewOff:exports
