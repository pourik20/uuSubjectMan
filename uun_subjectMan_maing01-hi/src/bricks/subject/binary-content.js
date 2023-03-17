//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Config from "./config/config.js";
import Calls from "../../calls.js";
import fileDownload from "js-file-download";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      // display: "grid"
      // width: "100%",
      // height: "100%",
      // gridGap: "2rem",
      // textAlign: "center",
      // marginTop: "4rem",
      // border: "1px solid white",
      // borderRadius: "8px",
      // backgroundColor: "rgb(219, 238, 253)",
      color: "#262626",
      textAlign: "left",
      fontWeight: "bold",

      maxWidth: "24em",
      margin: "0 auto 2em",
      position: "relative",

      boxSizing: "borderBox",

      backgroundColor: "rgb(219, 238, 253)",
      borderRadius: "0.75em",
      borderBottomLeftRadius: "0.9em",
      borderBottomRightRadius: "0.9em",

      border: "1px solid black",

      //
      padding: "1.35em 1.75em 1.75em",

      //
      // fontSize: "inherit",
      // lineHeight: "1.5em",

      //
      // display: "flex",
      // alignItems: "center",
      // flexDirection: "row",
      // justifyContent: "space-between",
      // marginTop: "1.5em",

      // color: "rgba(255, 255, 255, 0.9)",
    }),
  button: () =>
    Config.Css.css({
      display: "flex",
      backgroundColor: "#2196F3",
      color: "white",
      marginLeft: "auto",
      marginRight: "auto",
      fontWeight: "bold",
    }),
  text: () =>
    Config.Css.css({
      display: "flex",
      textAlign: "center",
      justifyContent: "center",
      marginLeft: "auto",
      marginRight: "auto",
      fontWeight: "bold",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const BinaryContent = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BinaryContent",
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

    const onButtonClick = async () => {
      const result = await Calls.Content.getBinaryData({
        binary: content.binary,
        contentDisposition: "attachment",
      });
      fileDownload(result, result.name);
    };

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <div className={Css.main()}>
        <p className={Css.text()}>{content.name}</p>
        <button className={Css.button()} onClick={onButtonClick}>
          Download
        </button>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { BinaryContent };
export default BinaryContent;
//@@viewOff:exports
