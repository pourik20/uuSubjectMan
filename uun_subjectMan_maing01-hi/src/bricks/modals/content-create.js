//@@viewOn:imports
import { createVisualComponent, PropTypes, useState, useEffect, Lsi } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
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

const ContentCreate = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ContentCreate",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:privates
    const [open, setOpen] = useState(false);
    const [newContent, setNewContent] = useState({});
    const [file, setFile] = useState();
    const { addAlert } = Uu5Elements.useAlertBus();

    const contentContext = useContent();
    const contentListContext = useContentList();

    // Resets and closes the modal window
    const resetAndClose = () => {
      setNewContent({});
      setOpen(false);
    };

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

    // Creates a new content
    const onSubmit = async () => {
      if (isValid()) {
        let output = {
          name: newContent.name,
          description: newContent.description,
          binary: file,
          uri: newContent.uri,
        };

        try {
          await contentContext.handlerMap.create(output);
          await contentListContext.handlerMap.load();
          addAlert({
            header: <Lsi import={importLsi} path={["AlertCreate", "success"]} />,
            message: <Lsi import={importLsi} path={["AlertCreate", "created"]} />,
            priority: "success",
            durationMs: 3000,
          });
          resetAndClose();
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
        <Uu5Elements.Button significance="highlighted" colorScheme="secondary" onClick={() => setOpen(true)}>
          <Uu5Elements.Icon icon="fa-plus" />
        </Uu5Elements.Button>
        <Uu5Forms.Form.Provider onSubmit={onSubmit}>
          <Uu5Elements.Modal
            header={<Lsi import={importLsi} path={["ContentModal", "titleCreate"]} />}
            open={open}
            onClose={() => setOpen(false)}
            footer={
              <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "center" })}>
                <Uu5Forms.SubmitButton colorScheme="secondary">
                  {<Lsi import={importLsi} path={["ContentModal", "create"]} />}
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
              disabled={file ? true : false}
              value={newContent.uri}
              onChange={(e) => setNewContent({ ...newContent, uri: e.data.value })}
            />
            <Uu5Forms.File
              label={<Lsi import={importLsi} path={["ContentModal", "file"]} />}
              value={file}
              disabled={newContent.uri ? true : false}
              onChange={(e) => {
                setFile(e.data.value);
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
export { ContentCreate };
export default ContentCreate;
//@@viewOff:exports
