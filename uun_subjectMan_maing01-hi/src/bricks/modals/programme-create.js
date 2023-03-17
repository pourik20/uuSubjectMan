//@@viewOn:imports
import { createVisualComponent, PropTypes, useState, useEffect, Lsi } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";
import { useProgramme } from "../providers/programme-context.js";
import { useProgrammeList } from "../providers/programme-list-context.js";
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

const ProgrammeCreate = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ProgrammeCreate",
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
    const [newProgramme, setNewProgramme] = useState({});
    const [obligatory, setObligatory] = useState([]);
    const [obligatorySelective, setObligatorySelective] = useState([]);
    const [selective, setSelective] = useState([]);

    const { addAlert } = Uu5Elements.useAlertBus();

    const [subjectList, setSubjectList] = useState();

    const programmeContext = useProgramme();
    const programmeListContext = useProgrammeList();

    useEffect(() => {
      props.subjectList ? setSubjectList(props.subjectList.map((p) => ({ value: p.data.name }))) : {};
    }, [props.subjectList]);

    /** Resetuje hodnoty a zavře modální okno */
    const resetAndClose = () => {
      setNewProgramme({});
      setOpen(false);
      setObligatory([]);
      setObligatorySelective([]);
      setSelective([]);
    };

    /** Zkontroluje správnost zadaných údajů */
    const isValid = () => {
      let subjects = [...obligatory, ...obligatorySelective, ...selective];
      if (!newProgramme.name) {
        addAlert({
          header: <Lsi import={importLsi} path={["AlertError", "title"]} />,
          message: <Lsi import={importLsi} path={["AlertError", "errorAllFields"]} />,
          priority: "error",
          durationMs: 3000,
        });
        return false;
      }
      if (subjects.length !== new Set(subjects).size) {
        addAlert({
          header: <Lsi import={importLsi} path={["AlertError", "title"]} />,
          message: <Lsi import={importLsi} path={["AlertError", "errorOneCategory"]} />,
          priority: "error",
          durationMs: 3000,
        });
        return false;
      }
      return true;
    };

    /** Vytvoří nový studijní program v databázi */
    const onSubmit = async () => {
      if (isValid()) {
        let obligatoryIds = [];
        let obligatorySelectiveIds = [];
        let selectiveIds = [];
        for (let x of obligatory) {
          let found = props.subjectList.find((e) => e.data.name === x);
          if (found) obligatoryIds.push(found.data._id);
        }
        for (let x of obligatorySelective) {
          let found = props.subjectList.find((e) => e.data.name === x);
          if (found) obligatorySelectiveIds.push(found.data._id);
        }
        for (let x of selective) {
          let found = props.subjectList.find((e) => e.data.name === x);
          if (found) selectiveIds.push(found.data._id);
        }
        let output = {
          name: newProgramme.name,
          description: newProgramme.description,
          subjects: [
            {
              subjectOptions: obligatoryIds,
              type: "obligatory",
            },
            {
              subjectOptions: obligatorySelectiveIds,
              type: "obligatory-selective",
            },
            {
              subjectOptions: selectiveIds,
              type: "selective",
            },
          ],
        };

        try {
          await programmeContext.handlerMap.create(output);
          await programmeListContext.handlerMap.load();
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
            header={<Lsi import={importLsi} path={["ProgrammeModal", "titleCreate"]} />}
            open={open}
            onClose={() => setOpen(false)}
            footer={
              <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "center" })}>
                <Uu5Forms.SubmitButton colorScheme="secondary">
                  {<Lsi import={importLsi} path={["ProgrammeModal", "create"]} />}
                </Uu5Forms.SubmitButton>
                <Uu5Forms.CancelButton onClick={() => setOpen(false)}>
                  {<Lsi import={importLsi} path={["ProgrammeModal", "close"]} />}
                </Uu5Forms.CancelButton>
              </div>
            }
          >
            <Uu5Forms.Text
              required
              label={<Lsi import={importLsi} path={["ProgrammeModal", "title"]} />}
              value={newProgramme.name}
              onChange={(e) => {
                setNewProgramme({ ...newProgramme, name: e.data.value });
              }}
            />
            <Uu5Forms.Text
              label={<Lsi import={importLsi} path={["ProgrammeModal", "description"]} />}
              value={newProgramme.description}
              onChange={(e) => setNewProgramme({ ...newProgramme, description: e.data.value })}
            />
            <Uu5Forms.TextSelect
              label={<Lsi import={importLsi} path={["Programme", "obligatory"]} />}
              itemList={subjectList}
              value={obligatory}
              multiple
              onChange={(e) => {
                setObligatory(e.data.value);
                // Odstraní daný prvek ze subjectList, ale dělá bordel
                // setSubjectList(subjectList.filter((x) => x.value !== e.data.value[e.data.value.length - 1]));
                // TODO: Odstranit možnost přidání jednoho předmětu do více kategorií
              }}
            />
            <Uu5Forms.TextSelect
              label={<Lsi import={importLsi} path={["Programme", "obligatory-selective"]} />}
              itemList={subjectList}
              value={obligatorySelective}
              multiple
              onChange={(e) => {
                setObligatorySelective(e.data.value);
              }}
            />
            <Uu5Forms.TextSelect
              label={<Lsi import={importLsi} path={["Programme", "selective"]} />}
              itemList={subjectList}
              value={selective}
              multiple
              onChange={(e) => {
                setSelective(e.data.value);
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
export { ProgrammeCreate };
export default ProgrammeCreate;
//@@viewOff:exports
