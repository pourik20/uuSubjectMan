//@@viewOn:imports
import { createComponent, useMemo, useDataObject } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Config from "../config/config";
import ContentContext from "./content-context";
import Calls from "../../calls";

//@@viewOff:imports

export const ContentProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ContentProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const contentDataObject = useDataObject({
      handlerMap: {
        // load: (dtoIn) => Calls.Content.get(dtoIn),
        create: (dtoIn) => Calls.Content.create(dtoIn),
        update: (dtoIn) => Calls.Content.update(dtoIn),
        delete: (dtoIn) => Calls.Content.delete(dtoIn),
        get: (dtoIn) => Calls.Content.get(dtoIn),
      },
      pageSize: 3,
    });

    const providerValue = useMemo(() => {
      return contentDataObject;
    }, [contentDataObject]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <ContentContext.Provider value={providerValue}>
        {typeof props.children === "function" ? props.children(providerValue) : props.children}
      </ContentContext.Provider>
    );
    //@@viewOff:render
  },
});

export default ContentProvider;
