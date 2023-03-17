//@@viewOn:imports
import { createVisualComponent, Lsi, useRoute, useSession} from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";
import Uu5Elements from "uu5g05-elements";

import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
import { useSystemData } from "uu_plus4u5g02";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const RouteBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RouteBar",
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
    const systemDataObject = useSystemData();

    const profileList = systemDataObject.data.profileData.uuIdentityProfileList;
    const canViewCMS = profileList.includes("Executives");

    //sets routes
    const appActionList = [
      {
        name: "home", 
        children: <Lsi import={importLsi} path={["Menu", "home"]} />,
        onClick: () => setRoute("home"),
        icon:  "mdi-home",
      },
      {
        name: "about",
        children: <Lsi import={importLsi} path={["Menu", "about"]} />,
        onClick: () => setRoute("about"),
        collapsed: true,
      }
    ];

    if(canViewCMS){
      appActionList.push(
        { 
          name: "cms",
          children: <Lsi import={importLsi} path={["Menu", "cms"]} />,
          onClick: () => setRoute("cms"),
          icon:  "mdi-cogs",
        }
      )
    }

    //highlights current route   
    if (route.uu5Route) {
      appActionList.forEach(item => {
        if(item.name == route.uu5Route){
          item.significance = "highlighted";
          item.colorScheme = "primary";
        }
      })      
    }
    
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Plus4U5App.RouteBar appActionList={appActionList} {...props} >
        <Plus4U5App.RouteHeader title={systemDataObject.data.awidData.description} />
      </Plus4U5App.RouteBar>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RouteBar };
export default RouteBar;
//@@viewOff:exports
