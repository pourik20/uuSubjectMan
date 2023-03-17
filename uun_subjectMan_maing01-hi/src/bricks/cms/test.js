//@@viewOn:imports
import { createVisualComponent, PropTypes, useState, useEffect } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config.js";

/*
  Tohle patri do komponent, ve kterych budete pouzivat dany Context
  (napr. sekce study programmes pouziva context programmeListContext na vypsani study programu).

  Nevim proc, ale nejde pouzit context rovnou v route.

  Nejsem si jista, jestli to budete potrebovat, ale kdyby se vam nechtelo pouzivat uu5 grid, tak muzete pouzit kod, ktery je v Css.main().
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))" zajisti, ze se budou zobrazovat komponenty vedle sebe dokud se vejdou na jeden
  radek, a kdyz se nevejdou tak skoci pod sebe.
*/
import { useProgrammeList } from "../providers/programme-list-context";
import { useProgramme } from "../providers/programme-context";
import { useTopicList } from "../providers/topic-list-context.js";
import { useTopic } from "../providers/topic-context.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      display: "grid",
      width: "100%",
      gridTemplateColumns: "repeat(auto-fit,minmax(50px,1fr))",
      gridGap: "2rem",
      textAlign: "center",
      marginTop: "4rem",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Test = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Test",
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
    /*
      Tohle patri do komponent, ve kterych budete pouzivat dany Context
      (napr. sekce study programmes pouziva context programmeListContext na vypsani study programu).

      K datum a funkcim pak pristupujete pres staty pod timhle komentarem.
      (napr. pro vypis study programes pouzijete programmeListContext.data;
        pro update pouzijete programmeContext.handlerMap.update({ id: programmeContext.data.id, ...})).
    */
    const programmeListContext = useProgrammeList();
    const programmeContext = useProgramme();

    const topicListContext = useTopicList();
    const topicContext = useTopic();

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        {programmeListContext.state.includes("pendingNoData") ? (
          <Uu5Elements.Pending />
        ) : (
          <div className={Css.main()}>
            {/* STUDY PROGRAMMES - zkontrolujte si v insomnii, ze to funguje nebo si prekliknete na routu Home */}

            {/* list - jeste jsem neprisla na to, co s tim*/}
            {/* <Uu5Elements.Button
                  onClick={() => {console.log(programmeListContext.data)}}
                >
                  List
            </Uu5Elements.Button> */}

            {/* create */}
            <Uu5Elements.Button
              onClick={() => {
                programmeContext.handlerMap.create({ name: "Economy", description: "Lorem ipsum..." });
              }}
            >
              Create
            </Uu5Elements.Button>

            {/* get */}
            <Uu5Elements.Button
              onClick={() => {
                console.log(topicListContext.handlerMap.load());
              }}
            >
              Get
            </Uu5Elements.Button>

            {/* update */}
            <Uu5Elements.Button
              onClick={() => {
                programmeContext.handlerMap.update({ _id: "6349ea682d2ca924806071de", name: "Test" });
              }}
            >
              Update
            </Uu5Elements.Button>

            {/* delete - musite zmenit id na nejake existujici*/}
            <Uu5Elements.Button
              onClick={() => {
                programmeContext.handlerMap.update({ _id: "6383da2c63186636385f2df0" });
              }}
            >
              Delete
            </Uu5Elements.Button>
          </div>
        )}
      </div>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Test };
export default Test;
//@@viewOff:exports
