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

const ProgrammeEdit = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ProgrammeEdit",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    subjectList: PropTypes.array,
    programme: PropTypes.object,
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
      getPreviousProgramme();
      props.subjectList ? setSubjectList(props.subjectList.map((p) => ({ value: p.data.name }))) : {};
    }, []);

    /** Předvyplní data formuláře podle předchozích hodnot */
    const getPreviousProgramme = () => {
      setNewProgramme({ name: props.programme.name, description: props.programme.description });
      let obligatoryFound = props.programme.subjects.find((x) => x.type === "obligatory");
      let obligatorySelectiveFound = props.programme.subjects.find((x) => x.type === "obligatory-selective");
      let selectiveFound = props.programme.subjects.find((x) => x.type === "selective");
      setObligatory(obligatoryFound ? obligatoryFound.subjectOptions.map((x) => x.name) : []);
      setObligatorySelective(
        obligatorySelectiveFound ? obligatorySelectiveFound.subjectOptions.map((x) => x.name) : []
      );
      setSelective(selectiveFound ? selectiveFound.subjectOptions.map((x) => x.name) : []);
    };

    /** Zavře modální okno */
    const close = () => {
      setOpen(false);
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

    /** Upraví studijní program v databázi */
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
          _id: props.programme._id,
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
          await programmeContext.handlerMap.update(output);

          await programmeListContext.handlerMap.load();

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
            header={<Lsi import={importLsi} path={["ProgrammeModal", "titleUpdate"]} />}
            open={open}
            onClose={() => setOpen(false)}
            footer={
              <div className={Config.Css.css({ display: "flex", gap: 8, justifyContent: "center" })}>
                <Uu5Forms.SubmitButton colorScheme="secondary">
                  {<Lsi import={importLsi} path={["ProgrammeModal", "save"]} />}
                </Uu5Forms.SubmitButton>
                <Uu5Forms.CancelButton colorScheme="negative" onClick={() => setOpen(false)}>
                  {<Lsi import={importLsi} path={["ProgrammeModal", "close"]} />}
                </Uu5Forms.CancelButton>
              </div>
            }
          >
            <Uu5Forms.Text
              required
              label={<Lsi import={importLsi} path={["ProgrammeModal", "title"]} />}
              value={newProgramme.name}
              onChange={(e) => setNewProgramme({ ...newProgramme, name: e.data.value })}
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
export { ProgrammeEdit };
export default ProgrammeEdit;
//@@viewOff:exports
