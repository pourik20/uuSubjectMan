//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, useEffect } from "uu5g05";
import Config from "./config/config.js";
import SubjectInfo from "./subject-info.js";

import { useSubject } from "../providers/subject-context.js";
import Uu5Elements from "uu5g05-elements";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      // display: "grid",
      // width: "100%",
      // gridTemplateRows: "repeat(auto-fit,minmax(50px,5fr))",
      // gridGap: "2rem",
      // textAlign: "center",
      // marginTop: "4rem",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const SubjectInfoBlock = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SubjectInfoBlock",
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
    const [subjectInfo, setSubjectInfo] = useState();
    const subjectContext = useSubject();

    useEffect(() => {
      setSubjectInfo(getSubjectInfo());
    }, []);

    function getSubjectInfo() {
      return (
        <SubjectInfo
          credits={subjectContext.data.subject.credits}
          language={subjectContext.data.subject.language}
          degree={subjectContext.data.subject.degree}
          goal={subjectContext.data.subject.goal}
          description={subjectContext.data.subject.description}
          supervisor={subjectContext.data.subject.supervisor}
          id={subjectContext.data.subject.id}
        />
      );
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, SubjectInfoBlock);

    return (
      <Uu5Elements.Block
        className={Css.main()}
        card="full"
        borderRadius="moderate"
        headerType="title"
        header={props.name}
        // headerSeparator
        colorScheme="primary"
        significance="distinct"
      >
        {subjectInfo}
      </Uu5Elements.Block>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SubjectInfoBlock };
export default SubjectInfoBlock;
//@@viewOff:exports
