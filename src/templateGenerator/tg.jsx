import React from "react";
import { v4 as uuidv4 } from "uuid";
import * as sc from "./staticContent";
import * as dc from "./dynamicContent";

var ttt = "wow";

class TG extends React.Component {
  state = { lstDyn: [], lstChecked: [], change: "" };

  componentDidMount() {}

  pass = (item) => {
    console.log(item);
  };

  handleCallback = () => {
    //const { lstChecked } = this.state;
    //this.setState({ lstDyn: dc.lstPanelIds, lstChecked: dc.lstCheck });
    this.forceUpdate();
    console.log("redender");
  };

  handleCallbackChecked = (items) => {
    //const { lstChecked } = this.state;
    //lstChecked = items;
    //this.setState({ lstDyn: dc.lstPanelIds, lstChecked: dc.lstCheck });
    //this.forceUpdate();
    console.log("fefe");
    console.log(items);
  };

  updateSelectedItems = (lst, num) => {
    //selectedKnownSoft
    //console.log(lst);
    //console.log(num);
    const { lstChecked } = this.state;
    this.updateCheckLst(num);
    if (lst[1]) {
      if (!lstChecked[num].includes(lst[0])) {
        lstChecked[num].push(lst[0]);
      }
    } else {
      const index = lstChecked[num].indexOf(lst[0]);
      if (index > -1) {
        lstChecked[num].splice(index, 1);
      }
    }
    console.log(lstChecked);
    ttt = lst[0];
    console.log(ttt);
    //this.shouldComponentUpdate();
    const timer = setTimeout(() => {
      this.forceUpdate();
    }, 1000);
    //this.setState({ change: uuidv4() });
  };

  updateCheckLst = (id) => {
    const { lstChecked } = this.state;
    if (id >= lstChecked.length) {
      for (var i = 0; i <= id; i++) {
        lstChecked.push([]);
      }
    }
  };

  render() {
    const { lstChecked } = this.state;
    var listItems = dc.lstPanels.map((i) => <div key={uuidv4()}>{i.lst}</div>);
    var checkeditems = [];
    for (var c in lstChecked) {
      var tmp = lstChecked[c].map((i) => <div key={uuidv4()}>{i}</div>);
      checkeditems.push(tmp);
    }
    console.log(checkeditems);
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
        <dc.CheckList
          id={0}
          items={["hello"]}
          parentCallback={this.handleCallback}
        />
        {checkeditems}
        <dc.OnlyCHeck item="ffs" />
        {ttt}
      </div>
    );
  }
}

export default TG;
