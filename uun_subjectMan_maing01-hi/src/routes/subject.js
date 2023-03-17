//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi, useState } from "uu5g05";
import Uu5Elements, { Button } from "uu5g05-elements";
import { withRoute, RouteController } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import SubjectProvider from "../bricks/providers/subject-provider";
import SubjectInfo from "../bricks/subject/subject-info.js";
import SubjectInfoBlock from "../bricks/subject/subject-info-block.js";
import SubjectTopicBlock from "../bricks/subject/subject-topic-block.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      margin: "4rem",
      textAlign: "center",
    }),
  kids: () =>
    Config.Css.css({
      textAlign: "center",
      paddingTop: "24px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Subject = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Subject",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <RouteBar />
        <SubjectProvider>
          {(subjectDataObject) => (
            <RouteController routeDataObject={subjectDataObject}>
              {subjectDataObject.state.includes("pendingNoData") ? (
                <Uu5Elements.Pending />
              ) : (
                <div className={Css.main()}>
                  <h1>{subjectDataObject.data.subject.name}</h1>
                  <SubjectInfoBlock header={subjectDataObject.data.subject.name} />
                  <div className={Css.kids()}>
                    <SubjectTopicBlock />
                  </div>
                </div>
              )}
            </RouteController>
          )}
        </SubjectProvider>
      </div>
    );
    //@@viewOff:render
  },
});

Subject = withRoute(Subject, { authenticated: true });

//@@viewOn:exports
export { Subject };
export default Subject;
//@@viewOff:exports
