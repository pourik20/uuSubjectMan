//@@viewOn:imports
import { createVisualComponent, PropTypes, useState, useEffect, Lsi } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
import Calls from "../../calls.js";
import { useContent } from "../providers/content-context.js";
import { useContentList } from "../providers/content-list-context.js";
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

const ContentUpdate = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ContentUpdate",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    content: PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:privates
    const [open, setOpen] = useState(false);
    const [newContent, setNewContent] = useState({});

    const { addAlert } = Uu5Elements.useAlertBus();

    const contentContext = useContent();
    const contentListContext = useContentList();

    // useEffect(() => {
    //   props.contentList ? setContentList(props.contentList.map((p) => ({ value: p.data.name }))) : {};
    // }, [props.contentList]);

    /** Zavře modální okno */
    const close = () => {
      setOpen(false);
    };

    useEffect(() => {
      const loadPrevContent = async () => {
        const result = await Calls.Content.getBinaryData({
          binary: props.content.binary,
          contentDisposition: "attachment",
        });
        setNewContent({ ...props.content, binary: result });
      };
      loadPrevContent();
      // setNewContent({ ...props.content });
      // console.log("props content", props.content);
    }, []);

    /** Zkontroluje správnost zadaných údajů */
    const isValid = () => {
      if (!newContent.name) {
        addAlert({
          header: <Lsi import={importLsi} path={["AlertError", "title"]} />,
          message: <Lsi import={importLsi} path={["AlertError", "errorAllFields"]} />,
          priority: "error",
          durationMs: 3000,
        });
        return false;
      }
      return true;
    };

    /** Upraví téma v databázi */
    const onSubmit = async () => {
      if (isValid()) {
        let output = {
          _id: newContent._id,
          name: newContent.name,
          description: newContent.description,
          binary: newContent.binary,
        };

        try {
          await contentContext.handlerMap.update(output);
          await contentListContext.handlerMap.load();

          addAlert({
            header: <Lsi import={importLsi} path={["AlertUpdate", "success"]} />,
            message: <Lsi import={importLsi} path={["AlertUpdate", "updated"]} />,
            priority: "success",
            durationMs: 3000,
          });
          close();
        } catch (e) {
          addAlert({
            header: <Lsi import={importLsi} path={["AlertError", "title"]} />,
            message: `${(<Lsi import={importLsi} path={["AlertError", "error"]} />)}${e.message}`,
            priority: "error",
            durationMs: 3000,
          });
        }
      }
    };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <>
        <Uu5Elements.Button colorScheme="primary" onClick={() => setOpen(true)}>
          <Uu5Elements.Icon icon="fa-edit" />
        </Uu5Elements.Button>
        <Uu5Forms.Form.Provider onSubmit={onSubmit}>
          <Uu5Elements.Modal
            header={<Lsi import={importLsi} path={["ContentModal", "titleUpdate"]} />}
            open={open}
            onClose={() => setOpen(false)}
            footer={
              <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "center" })}>
                <Uu5Forms.SubmitButton colorScheme="secondary">
                  {<Lsi import={importLsi} path={["ContentModal", "save"]} />}
                </Uu5Forms.SubmitButton>
                <Uu5Forms.CancelButton onClick={() => setOpen(false)}>
                  {<Lsi import={importLsi} path={["ContentModal", "close"]} />}
                </Uu5Forms.CancelButton>
              </div>
            }
          >
            <Uu5Forms.Text
              required
              label={<Lsi import={importLsi} path={["ContentModal", "title"]} />}
              value={newContent.name}
              onChange={(e) => setNewContent({ ...newContent, name: e.data.value })}
            />
            <Uu5Forms.Text
              label={<Lsi import={importLsi} path={["ContentModal", "description"]} />}
              value={newContent.description}
              onChange={(e) => setNewContent({ ...newContent, description: e.data.value })}
            />
            <Uu5Forms.Text
              label="URI"
              disabled={newContent.binary ? true : false}
              value={newContent.uri}
              onChange={(e) => setNewContent({ ...newContent, uri: e.data.value })}
            />
            {/* TODO: Asi convert binary zpátky na file...jak? */}
            <Uu5Forms.File
              label={<Lsi import={importLsi} path={["ContentModal", "file"]} />}
              value={newContent.binary}
              disabled={newContent.uri ? true : false}
              onChange={(e) => {
                console.log("onChange", e);
                setNewContent({ ...newContent, binary: e.data.value });
              }}
            />
          </Uu5Elements.Modal>
        </Uu5Forms.Form.Provider>
      </>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ContentUpdate };
export default ContentUpdate;
//@@viewOff:exports
