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
  main: () => Config.Css.css({ 
    height: "3rem", 
  }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ProgrammeBlock = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ProgrammeBlock",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    key: PropTypes.Number,
    name: PropTypes.String, 
    description: PropTypes.String,
    id: PropTypes.String,
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
      <Uu5Elements.Block
        contentMaxHeight="4rem"
        card="full"
        borderRadius="moderate"
        headerType="title"
        header={props.name}
        headerSeparator
        colorScheme="primary"
        significance="highlighted"
        footer={
            <Uu5Elements.Button
              width="100%"
              colorScheme="primary"
              significance="highlighted"
              onClick={() => setRoute("programme", {id: props.id})}
            >
                <Lsi import={importLsi} path={["Home", "buttonView"]} />
            </Uu5Elements.Button>      
        }
        footerSeparator
      >
        <div className={Css.main}>
          {props.description}
        </div>          
      </Uu5Elements.Block>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ProgrammeBlock };
export default ProgrammeBlock;
//@@viewOff:exports
