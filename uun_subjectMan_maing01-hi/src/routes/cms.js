//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute, RouteController } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";

import Test from "../bricks/cms/test.js";
import EntityManagement from "../bricks/cms/entity-management";

import ProgrammeListProvider from "../bricks/providers/programme-list-provider";
import ProgrammeProvider from "../bricks/providers/programme-provider";
import TopicListProvider from "../bricks/providers/topic-list-provider";
import TopicProvider from "../bricks/providers/topic-provider";
import SubjectListProvider from "../bricks/providers/subject-list-provider";
import SubjectProvider from "../bricks/providers/subject-provider";
import ContentListProvider from "../bricks/providers/content-list-provider";
import ContentProvider from "../bricks/providers/content-provider";
import entityManagement from "../bricks/cms/entity-management";
import ProgrammeCreate from "../bricks/modals/programme-create.js";
import { useSubAppData, useSystemData } from "uu_plus4u5g02";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      padding: "20px",
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "30px",
      // display: "grid",
      // gridTemplateColumns: "repeat(auto-fit,minmax(500px,1fr))",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let CMS = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CMS",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const systemDataObject = useSystemData();

    const profileList = systemDataObject.data.profileData.uuIdentityProfileList;
    const canViewCMS = profileList.includes("Executives");

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <RouteBar />
        <ProgrammeListProvider>
          <ProgrammeProvider>
            <SubjectListProvider>
              <SubjectProvider>
                <TopicListProvider>
                  <TopicProvider>
                    <ContentListProvider>
                      <ContentProvider>
                        {(topicListDataList) => (
                          <RouteController routeDataObject={topicListDataList}>
                            {canViewCMS && (
                              <div className={Css.main()}>
                                <EntityManagement
                                  title={<Lsi import={importLsi} path={["CMS", "Programmes"]} />}
                                  entity="programme"
                                />
                                <EntityManagement
                                  title={<Lsi import={importLsi} path={["CMS", "Subjects"]} />}
                                  entity="subject"
                                />
                                <EntityManagement
                                  title={<Lsi import={importLsi} path={["CMS", "Topics"]} />}
                                  entity="topic"
                                />
                                <EntityManagement
                                  title={<Lsi import={importLsi} path={["CMS", "Content"]} />}
                                  entity="content"
                                />
                              </div>
                            )}
                          </RouteController>
                        )}
                      </ContentProvider>
                    </ContentListProvider>
                  </TopicProvider>
                </TopicListProvider>
              </SubjectProvider>
            </SubjectListProvider>
          </ProgrammeProvider>
        </ProgrammeListProvider>
      </div>
    );
    //@@viewOff:render
  },
});

CMS = withRoute(CMS, { authenticated: true });

//@@viewOn:exports
export { CMS };
export default CMS;
//@@viewOff:exports
