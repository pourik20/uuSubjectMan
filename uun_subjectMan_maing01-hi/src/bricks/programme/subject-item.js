//@@viewOn:imports
import { createVisualComponent, PropTypes, useRoute, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
import importLsi from "../../lsi/import-lsi.js";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  item: () =>
    Config.Css.css({
      marginRight: "1rem"
    }),
  subjectContainer: () =>
    Config.Css.css({
      textAlign: "center",
      background: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.2rem 2rem",
      marginBottom: "2rem",
      borderRadius: "0.8rem",
      flexWrap: "wrap"
    }),
  subjectInner: () =>
    Config.Css.css({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      flexWrap: "wrap"
    })
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const SubjectItem = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SubjectItem",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    name: PropTypes.String,
    lang: PropTypes.String,
    credits: PropTypes.Number,
    id: PropTypes.String
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:privates
    const [route, setRoute] = useRoute();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
        <div className={Css.subjectContainer()}>    
            <h3>{props.name}</h3>
            <div className={Css.subjectInner()}>
              <p className={Css.item()}>{props.lang}</p>
              <p className={Css.item()}>{props.credits}</p>
              <Uu5Elements.Button
                colorScheme="primary"
                significance="highlighted"
                onClick={() => setRoute("subject", {id: props.id})}
                >
                  <Lsi import={importLsi} path={["Programme", "buttonView"]} />
              </Uu5Elements.Button>    
            </div>
        </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SubjectItem };
export default SubjectItem;
//@@viewOff:exports
