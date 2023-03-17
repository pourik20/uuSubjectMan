//@@viewOn:imports
import { createVisualComponent, PropTypes, useState, useEffect } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";

import SubjectItem from "./subject-item.js";

import { useProgramme } from "../providers/programme-context";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      marginTop: "3rem",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const SubjectBlock = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SubjectBlock",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    name: PropTypes.String,
    type: PropTypes.String,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:privates
    const [listSubjects, setListSubjects] = useState();
    const programmeContext = useProgramme();

    useEffect(() => {
      setListSubjects(getSubjects());
    }, []);

    function getSubjects() {
      let data = [];

      programmeContext.data.programme.subjects.forEach((subjects) => {
        if (subjects.type === props.type) {
          data = subjects.subjectOptions;
        }
      });

      let result = [];

      data.forEach((subject) => {
        result.push(
          <SubjectItem name={subject.name} lang={subject.language} credits={subject.credits} id={subject.id} />
        );
      });

      return result;
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Uu5Elements.Block
        className={Css.main()}
        card="full"
        borderRadius="moderate"
        headerType="title"
        header={props.name}
        headerSeparator
        colorScheme="primary"
        significance="distinct"
      >
        {listSubjects}
      </Uu5Elements.Block>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SubjectBlock };
export default SubjectBlock;
//@@viewOff:exports
