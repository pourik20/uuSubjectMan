//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import { withRoute, RouteController } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";

import SubjectBlock from "../bricks/programme/subject-block.js";

import ProgrammeProvider from "../bricks/providers/programme-provider";
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
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Programme = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Programme",
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
        <ProgrammeProvider>
          {(programmeDataObject) => (
            <RouteController routeDataObject={programmeDataObject}>
              {programmeDataObject.state.includes("pendingNoData") ? (
                <Uu5Elements.Pending />
              ) : (
                <div className={Css.main()}>         
                  <h1>{programmeDataObject.data.programme.name}</h1>
                  <p>{programmeDataObject.data.programme.description}</p>
                  <SubjectBlock type="obligatory" name={<Lsi import={importLsi} path={["Programme", "obligatory"]} />}/>
                  <SubjectBlock type="selective" name={<Lsi import={importLsi} path={["Programme", "selective"]} />}/>
                  <SubjectBlock type="obligatory-selective" name={<Lsi import={importLsi} path={["Programme", "obligatory-selective"]} />}/>
                </div>
              )}        
            </RouteController>
          )}
        </ProgrammeProvider>
      </div>
    );
    //@@viewOff:render
  },
});

Programme = withRoute(Programme, { authenticated: true });

//@@viewOn:exports
export { Programme };
export default Programme;
//@@viewOff:exports
