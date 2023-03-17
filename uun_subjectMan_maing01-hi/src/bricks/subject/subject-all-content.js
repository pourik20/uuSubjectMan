//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Config from "./config/config.js";
import Calls from "../../calls.js";
import { useDataObject, useState } from "uu5g05";

import "uu5g04-bricks";
import UriContent from "./uri-content.js";
import BinaryContent from "./binary-content.js";
import Uu5Elements from "uu5g05-elements";

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

const SubjectAllContent = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SubjectAllContent",
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
    const { children, subjectID } = props;
    const [allContent, setAllContent] = useState();
    const [content, setContent] = useState();

    const AllContentServer = useDataObject({
      handlerMap: {
        load: (dtoIn) => Calls.Subject.listContent({ id: subjectID }),
      },
      pageSize: 100,
    });
    console.log(AllContentServer);

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, SubjectAllContent);
    function serveContent(params) {
      setContent(
        AllContentServer.data.content.map((content) =>
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
              header="Zobrazit Content"
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
export { SubjectAllContent };
export default SubjectAllContent;
//@@viewOff:exports

{
  /*  <Uu5Elements.Block
          className={Css.main()}
          card="full"
          borderRadius="moderate"
          colorScheme="primary"
          significance="common"
        >
          <UU5.Bricks.Container>
            <UU5.Bricks.Panel
              size="m"
              header={subject.name}
              bgStyleHeader="filled"
              borderRadius="moderate"
              colorSchema="primary"
              iconExpanded="mdi-chevron-up"
              iconCollapsed="mdi-chevron-down"
              content={allContent}
              onClick={serverAllContent}
            />
          </UU5.Bricks.Container>
        </Uu5Elements.Block>*/
}
