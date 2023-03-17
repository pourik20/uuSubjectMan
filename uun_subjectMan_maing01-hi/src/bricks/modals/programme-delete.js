//@@viewOn:imports
import { createVisualComponent, PropTypes, useState, useEffect, Lsi } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
import { useProgrammeList } from "../providers/programme-list-context.js";
import { useProgramme } from "../providers/programme-context.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ProgrammeDelete = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ProgrammeDelete",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    programme: PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:privates
    const [open, setOpen] = useState(false);

    const { addAlert } = Uu5Elements.useAlertBus();

    const programmeContext = useProgramme();
    const programmeListContext = useProgrammeList();

    // Submits the form and closes the modal window
    const onSubmit = async () => {
      try {
        await programmeContext.handlerMap.delete({ id: props.programme._id });
        await programmeListContext.handlerMap.load();

        addAlert({
          header: <Lsi import={importLsi} path={["AlertDelete", "success"]} />,
          message: <Lsi import={importLsi} path={["AlertDelete", "deleted"]} />,
          priority: "success",
          durationMs: 3000,
        });
      } catch (e) {
        console.error(e.message);
      }

      setOpen(false);
    };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <>
        <Uu5Elements.Button colorScheme="negative" onClick={() => setOpen(true)}>
          <Uu5Elements.Icon icon="mdi-delete" />
        </Uu5Elements.Button>
        <Uu5Forms.Form.Provider onSubmit={onSubmit}>
          <Uu5Elements.Modal
            header={<Lsi import={importLsi} path={["DeleteModal", "titleProgramme"]} />}
            open={open}
            onClose={() => setOpen(false)}
            footer={
              <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "center" })}>
                <Uu5Forms.SubmitButton colorScheme="negative">
                  {<Lsi import={importLsi} path={["DeleteModal", "yes"]} />}
                </Uu5Forms.SubmitButton>
                <Uu5Forms.CancelButton onClick={() => setOpen(false)}>
                  {<Lsi import={importLsi} path={["DeleteModal", "no"]} />}
                </Uu5Forms.CancelButton>
              </div>
            }
          >
            <p className={Config.Css.css({ textAlign: "center" })}>
              {<Lsi import={importLsi} path={["DeleteModal", "programme"]} />}
            </p>
          </Uu5Elements.Modal>
        </Uu5Forms.Form.Provider>
      </>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ProgrammeDelete };
export default ProgrammeDelete;
//@@viewOff:exports
