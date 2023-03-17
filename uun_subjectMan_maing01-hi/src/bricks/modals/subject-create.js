//@@viewOn:imports
import { createVisualComponent, PropTypes, useState, useEffect, Lsi } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
import { useSubjectList } from "../providers/subject-list-context.js";
import { useSubject } from "../providers/subject-context.js";
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

const SubjectCreate = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SubjectCreate",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    topicList: PropTypes.array,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:privates
    const [open, setOpen] = useState(false);
    const [newSubject, setNewSubject] = useState({});
    const [topics, setTopics] = useState([]);

    const { addAlert } = Uu5Elements.useAlertBus();

    const [topicList, setTopicList] = useState();
    const degreeList = [{ value: "Bc." }, { value: "Mgr." }];
    const languageList = [{ value: "cz" }, { value: "en" }];

    const subjectContext = useSubject();
    const subjectListContext = useSubjectList();

    useEffect(() => {
      props.topicList ? setTopicList(props.topicList.map((s) => ({ value: s.data.name }))) : {};
    }, [props.topicList]);

    // Resets and closes the modal window
    const resetAndClose = () => {
      setNewSubject({});
      setTopics([]);
      setOpen(false);
    };

    /** Zkontroluje správnost zadaných údajů */
    const isValid = () => {
      if (
        !newSubject.name ||
        !newSubject.credits ||
        !newSubject.supervisor ||
        !newSubject.goal ||
        !newSubject.degree ||
        !newSubject.language
      ) {
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

    // Creates a new subject
    const onSubmit = async () => {
      if (isValid()) {
        let topicIds = [];
        for (let x of topics) {
          let found = props.topicList.find((e) => e.data.name === x);
          if (found) topicIds.push(found.data._id);
        }
        let output = {
          name: newSubject.name,
          description: newSubject.description,
          goal: newSubject.goal,
          supervisor: newSubject.supervisor,
          degree: newSubject.degree,
          language: newSubject.language,
          credits: newSubject.credits,
          topics: topicIds,
        };

        try {
          await subjectContext.handlerMap.create(output);

          await subjectListContext.handlerMap.load();

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
            header={<Lsi import={importLsi} path={["SubjectModal", "titleCreate"]} />}
            open={open}
            onClose={() => setOpen(false)}
            footer={
              <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "center" })}>
                <Uu5Forms.SubmitButton colorScheme="secondary">
                  {<Lsi import={importLsi} path={["SubjectModal", "create"]} />}
                </Uu5Forms.SubmitButton>
                <Uu5Forms.CancelButton colorScheme="negative" onClick={() => setOpen(false)}>
                  {<Lsi import={importLsi} path={["SubjectModal", "close"]} />}
                </Uu5Forms.CancelButton>
              </div>
            }
          >
            <Uu5Forms.Text
              required
              label={<Lsi import={importLsi} path={["SubjectModal", "title"]} />}
              value={newSubject.name}
              onChange={(e) => setNewSubject({ ...newSubject, name: e.data.value })}
            />
            <Uu5Forms.Text
              label={<Lsi import={importLsi} path={["SubjectModal", "description"]} />}
              value={newSubject.description}
              onChange={(e) => setNewSubject({ ...newSubject, description: e.data.value })}
            />
            <Uu5Forms.Text
              required
              label={<Lsi import={importLsi} path={["SubjectInfo", "goal"]} />}
              value={newSubject.goal}
              onChange={(e) => setNewSubject({ ...newSubject, goal: e.data.value })}
            />
            <Uu5Forms.Text
              required
              label={<Lsi import={importLsi} path={["SubjectInfo", "supervisor"]} />}
              value={newSubject.supervisor}
              onChange={(e) => setNewSubject({ ...newSubject, supervisor: e.data.value })}
            />

            <Uu5Forms.TextSelect
              required
              label={<Lsi import={importLsi} path={["SubjectInfo", "degree"]} />}
              itemList={degreeList}
              value={newSubject.degree}
              onChange={(e) => {
                setNewSubject({ ...newSubject, degree: e.data.value });
              }}
            />
            <Uu5Forms.TextSelect
              required
              label={<Lsi import={importLsi} path={["SubjectInfo", "language"]} />}
              itemList={languageList}
              value={newSubject.language}
              onChange={(e) => {
                setNewSubject({ ...newSubject, language: e.data.value });
              }}
            />
            <Uu5Forms.Number
              required
              label={<Lsi import={importLsi} path={["SubjectInfo", "credits"]} />}
              value={newSubject.credits}
              onChange={(e) => setNewSubject({ ...newSubject, credits: e.data.value })}
            />
            <Uu5Forms.TextSelect
              label={<Lsi import={importLsi} path={["CMS", "Topics"]} />}
              itemList={topicList}
              value={topics}
              multiple
              onChange={(e) => {
                setTopics(e.data.value);
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
export { SubjectCreate };
export default SubjectCreate;
//@@viewOff:exports
