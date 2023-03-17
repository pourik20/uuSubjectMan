//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      color: "#262626",
      textAlign: "center",
      textDecoration: "none",
      maxWidth: "24em",
      margin: "0 auto 2em",
      position: "relative",
      boxSizing: "borderBox",
      backgroundColor: "rgb(219, 238, 253)",
      borderRadius: "0.75em",
      borderBottomLeftRadius: "0.9em",
      borderBottomRightRadius: "0.9em",
      border: "1px solid black",
      padding: "1.35em 1.75em 1.75em",
    }),
  link: () =>
    Config.Css.css({
      textDecoration: "none",
      color: "black",
      fontWeight: "bold",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const UriContent = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UriContent",
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
    const { children, content } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <div className={Css.main()}>
        <a className={Css.link()} href={content.uri}>
          {content.name}
        </a>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { UriContent };
export default UriContent;
//@@viewOff:exports
