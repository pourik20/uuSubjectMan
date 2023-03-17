//@@viewOn:imports
import { createVisualComponent, PropTypes, useState, useEffect } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";

/*
  Tohle patri do komponent, ve kterych budete pouzivat dany Context
  (napr. sekce study programmes pouziva context programmeListContext na vypsani study programu).

  Nevim proc, ale nejde pouzit context rovnou v route.

  Nejsem si jista, jestli to budete potrebovat, ale kdyby se vam nechtelo pouzivat uu5 grid, tak muzete pouzit kod, ktery je v Css.main().
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))" zajisti, ze se budou zobrazovat komponenty vedle sebe dokud se vejdou na jeden
  radek, a kdyz se nevejdou tak skoci pod sebe.
*/
import { useTopicList } from "../providers/topic-list-context";
import { useProgrammeList } from "../providers/programme-list-context.js";
import { useSubjectList } from "../providers/subject-list-context";
import { useContentList } from "../providers/content-list-context";
import ProgrammeCreate from "../modals/programme-create.js";
import ProgrammeEdit from "../modals/programme-update.js";
import ProgrammeDelete from "../modals/programme-delete.js";
import SubjectCreate from "../modals/subject-create.js";
import SubjectUpdate from "../modals/subject-update.js";
import SubjectDelete from "../modals/subject-delete.js";
import TopicCreate from "../modals/topic-create.js";
import TopicUpdate from "../modals/topic-update.js";
import ContentCreate from "../modals/content-create.js";
import ContentDelete from "../modals/content-delete.js";
import TopicDelete from "../modals/topic-delete.js";
import ContentUpdate from "../modals/content-update.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      width: "500px",
      padding: "20px",
    }),
  title: () =>
    Config.Css.css({
      textAlign: "center",
    }),
  tiles: () =>
    Config.Css.css({
      marginTop: "15px",
      display: "flex",
      flexDirection: "column",
    }),
  tile: () =>
    Config.Css.css({
      width: "100%",
      padding: "5px 20px",
      borderBottom: "1px solid rgba(0,0,0,0.2)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }),
  buttons: () =>
    Config.Css.css({
      display: "flex",
      gap: "5px",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers
/**
 * Vyrenderuje seznam položek dané entity a tlačítka
 * sloužící k úpravám jednotlivých položek
 */
const EntityManagement = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "EntityManagement",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    data: PropTypes.array,
    title: PropTypes.object,
    entity: PropTypes.string,
    list: PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    title: "My Entity",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:privates
    // const [entityList, setEntityList] = useState([]);

    const programmeListContext = useProgrammeList();
    const subjectListContext = useSubjectList();
    const topicListContext = useTopicList();
    const contentListContext = useContentList();

    const getContext = () => {
      switch (props.entity) {
        case "programme":
          return programmeListContext;
        case "subject":
          return subjectListContext;
        case "topic":
          return topicListContext;
        case "content":
          return contentListContext;
      }
    };

    // Generates tiles to control an entity
    const getTiles = () => {
      return getContext().data.map((object, i) => {
        return (
          <div key={object.data._id} className={Css.tile()}>
            <p>{object.data.name}</p>
            <div className={Css.buttons()}>
              {props.entity == "topic" && (
                <>
                  <TopicUpdate topic={object.data} contentList={contentListContext.data} />
                  <TopicDelete topic={object.data} />
                </>
              )}
              {props.entity == "content" && (
                <>
                  <ContentUpdate content={object.data} />
                  <ContentDelete content={object.data} />
                </>
              )}
              {props.entity == "subject" && (
                <>
                  <SubjectUpdate subject={object.data} topicList={topicListContext.data} />
                  <SubjectDelete subject={object.data} />
                </>
              )}
              {props.entity == "programme" && (
                <>
                  <ProgrammeEdit subjectList={subjectListContext.data} programme={object.data} />
                  <ProgrammeDelete programme={object.data} />
                </>
              )}
            </div>
          </div>
        );
      });
    };

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        {getContext().state.includes("pendingNoData") ? (
          <Uu5Elements.Pending />
        ) : (
          <div className={Css.main()}>
            <h2 className={Css.title()}>{props.title}</h2>
            {props.entity === "programme" && <ProgrammeCreate subjectList={subjectListContext.data} />}
            {props.entity === "subject" && <SubjectCreate topicList={topicListContext.data} />}
            {props.entity === "topic" && <TopicCreate contentList={contentListContext.data} />}
            {props.entity === "content" && <ContentCreate />}
            <div className={Css.tiles()}>{getTiles()}</div>
          </div>
        )}
      </div>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { EntityManagement };
export default EntityManagement;
//@@viewOff:exports
