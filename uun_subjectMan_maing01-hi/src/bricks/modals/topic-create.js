//@@viewOn:imports
import { createVisualComponent, PropTypes, useState, useEffect, Lsi } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
import { useTopic } from "../providers/topic-context.js";
import { useTopicList } from "../providers/topic-list-context.js";
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

const TopicCreate = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TopicCreate",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    subjectList: PropTypes.array,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:privates
    const [open, setOpen] = useState(false);
    const [newTopic, setNewTopic] = useState({});
    const [content, setContent] = useState([]);

    const { addAlert } = Uu5Elements.useAlertBus();

    const [contentList, setContentList] = useState();

    const topicContext = useTopic();
    const topicListContext = useTopicList();

    useEffect(() => {
      props.contentList ? setContentList(props.contentList.map((p) => ({ value: p.data.name }))) : {};
    }, [props.contentList]);

    // Resets and closes the modal window
    const resetAndClose = () => {
      setNewTopic({});
      setOpen(false);
    };

    /** Zkontroluje správnost zadaných údajů */
    const isValid = () => {
      if (!newTopic.name) {
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

    // Creates a new topic
    const onSubmit = async () => {
      if (isValid()) {
        let contentIds = [];
        for (let x of content) {
          let found = props.contentList.find((e) => e.data.name === x);
          if (found) contentIds.push(found.data._id);
        }
        let output = {
          name: newTopic.name,
          description: newTopic.description,
          content: contentIds,
        };

        try {
          await topicContext.handlerMap.create(output);
          await topicListContext.handlerMap.load();
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
            header={<Lsi import={importLsi} path={["TopicModal", "titleCreate"]} />}
            open={open}
            onClose={() => setOpen(false)}
            footer={
              <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "center" })}>
                <Uu5Forms.SubmitButton colorScheme="secondary">
                  {<Lsi import={importLsi} path={["TopicModal", "create"]} />}
                </Uu5Forms.SubmitButton>
                <Uu5Forms.CancelButton onClick={() => setOpen(false)}>
                  {<Lsi import={importLsi} path={["TopicModal", "close"]} />}
                </Uu5Forms.CancelButton>
              </div>
            }
          >
            <Uu5Forms.Text
              required
              label={<Lsi import={importLsi} path={["TopicModal", "title"]} />}
              value={newTopic.name}
              onChange={(e) => setNewTopic({ ...newTopic, name: e.data.value })}
            />
            <Uu5Forms.Text
              label={<Lsi import={importLsi} path={["TopicModal", "description"]} />}
              value={newTopic.description}
              onChange={(e) => setNewTopic({ ...newTopic, description: e.data.value })}
            />
            <Uu5Forms.TextSelect
              label={<Lsi import={importLsi} path={["TopicModal", "content"]} />}
              itemList={contentList}
              Content
              value={content}
              multiple
              onChange={(e) => {
                setContent(e.data.value);
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
export { TopicCreate };
export default TopicCreate;
//@@viewOff:exports
