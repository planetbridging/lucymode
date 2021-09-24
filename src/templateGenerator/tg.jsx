import React from "react";
import { v4 as uuidv4 } from "uuid";
import * as sc from "./staticContent";
import * as dc from "./dynamicContent";

class TG extends React.Component {
  state = { lstDyn: [] };

  componentDidMount() {}

  pass = (item) => {
    console.log(item);
  };

  handleCallback = () => {
    //this.setState({ lstDyn: dc.lstPanelIds });
    this.forceUpdate();
  };

  render() {
    var listItems = dc.lstPanels.map((i) => <div key={uuidv4()}>{i.lst}</div>);
    return (
      <div>
        {sc.getBox(sc.getText("lol"))}
        {sc.getFlex([
          sc.getSpace(),
          sc.getText("a"),
          sc.getSpace(),
          sc.getText("b"),
          sc.getSpace(),
          sc.getText("c"),
          sc.getSpace(),
        ])}

        <dc.SlidePanel
          id={0}
          parentCallback={this.handleCallback}
          testing={true}
          side="left"
          content={
            <dc.SlidePanel
              id={1}
              testing={true}
              parentCallback={this.handleCallback}
              content={sc.getText("content")}
            />
          }
        />
        {listItems}
      </div>
    );
  }
}

export default TG;
