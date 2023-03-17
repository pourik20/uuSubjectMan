//@@viewOn:imports
import { createVisualComponent, Utils, Content, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi";
import lektorImg from "./lektorImg.png";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      marginBottom: "2rem",
    }),
  text: () =>
    Config.Css.css({
      textAlign: "center",
      padding: "6px",
      // fontWeight: "bold",
    }),
  keyText: () =>
    Config.Css.css({
      textAlign: "center",
      padding: "6px",
      fontWeight: "bold",
      fontSize: "18px",
    }),

  subjectInner: () =>
    Config.Css.css({
      border: "5px solid rgb(219, 238, 253)",
      borderRadius: "10px",
      display: "grid",
      width: "100%",
      gridTemplateColumns: "repeat(auto-fit,minmax(50px,1fr))",
      gridGap: "1rem",
    }),
  subjectInnerDesc: () =>
    Config.Css.css({
      marginTop: "100px",
      display: "grid",
      width: "100%",
      alignContent: "end",
      textAlign: "center",
      gridTemplateRows: "repeat(auto-fit,minmax(150px,1fr))",
      gridGap: "5rem",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const SubjectInfo = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SubjectInfo",
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

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(
      props,
      SubjectInfo
    );

    return (
      <div className={Css.main()}>
        <Uu5Elements.Block
          className={Css.main()}
          card="full"
          borderRadius="moderate"
          colorScheme="primary"
          significance="common"
        >
          <div className={Css.subjectInner()}>
            <p className={Css.text()}>
              <div className={Css.keyText()}>
                <Lsi import={importLsi} path={["SubjectInfo", "supervisor"]} />
              </div>
              <div> {props.supervisor} </div>
            </p>

            <p className={Css.text()}>
              <div className={Css.keyText()}>
                <Lsi import={importLsi} path={["SubjectInfo", "credits"]} />
              </div>
              <div className={Css.text()}>{props.credits}</div>
            </p>

            <p className={Css.text()}>
              <div className={Css.keyText()}>
                <Lsi import={importLsi} path={["SubjectInfo", "language"]} />
              </div>
              <div className={Css.text()}>{props.language}</div>
            </p>

            <p className={Css.text()}>
              <div className={Css.keyText()}>
                <Lsi import={importLsi} path={["SubjectInfo", "degree"]} />
              </div>
              <div className={Css.text()}>{props.degree}</div>
            </p>
          </div>

          <div className={Css.subjectInnerDesc()}>
            <p>
              <div className={Css.keyText()}>
                <Lsi import={importLsi} path={["SubjectInfo", "goal"]} />
              </div>
              <div className={Css.text()}>{props.goal}</div>
            </p>

            <p>
              <div className={Css.keyText()}>
                <Lsi import={importLsi} path={["SubjectInfo", "description"]} />
              </div>
              <div className={Css.text()}>{props.description}</div>
            </p>
          </div>
        </Uu5Elements.Block>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SubjectInfo };
export default SubjectInfo;
//@@viewOff:exports
