//@@viewOn:imports
import { createVisualComponent, PropTypes, useState, useEffect, useRef, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
import importLsi from "../../lsi/import-lsi.js";

import ProgrammeBlock from "./programme-block.js";

import { useProgrammeList } from "../providers/programme-list-context";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  button: () =>
    Config.Css.css({
    marginTop: "3rem",
  }),
  main: () =>
  Config.Css.css({
    marginTop: "4rem",
  }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ProgrammesView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ProgrammesView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    data: PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:privates
    const nextPageIndexRef = useRef(1);
    const { addAlert } = Uu5Elements.useAlertBus();
    const programmeListContext = useProgrammeList();

    const [listProgrammes, setListProgrammes] = useState();

    useEffect(() => {
      setListProgrammes(getProgrammes());
    }, [programmeListContext.data]);

    function showError(error, header = "") {
      addAlert({
        header,
        message: error.message,
        priority: "error",
      });
    }

    async function handleLoadNext() {
      try {
        await programmeListContext.handlerMap.loadNext({ pageInfo: { pageIndex: nextPageIndexRef.current } });
        nextPageIndexRef.current++;
      } catch (error) {
        ProgrammesView.logger.error("Error loading next page", error);
        showError(error, "Page loading failed!");
      }
    }

    function getProgrammes() {
      let result = [];
      const dataList = programmeListContext.data.filter((item) => item !== undefined);

      dataList.forEach((item, num) => {
        result.push(
          <ProgrammeBlock
            key={num}
            name={item.data.name}
            description={item.data.description}
            id={item.data._id}
          />
        );
      });

      return result;
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        {programmeListContext.state.includes("pendingNoData") ? (
          <Uu5Elements.Pending />
        ) : (
          <Uu5Elements.Grid templateColumns={{ xs: "1fr", m: "repeat(4, 1fr)" }} className={Css.main()}>
            {listProgrammes}
          </Uu5Elements.Grid>
        )}
        <Uu5Elements.Button
          className={Css.button()}
          width="100%"
          colorScheme="primary"
          significance="distinct"
          onClick={handleLoadNext}
        >
          <Lsi import={importLsi} path={["Home", "buttonLoad"]} />
        </Uu5Elements.Button>
      </div>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ProgrammesView };
export default ProgrammesView;
//@@viewOff:exports
