import React from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
    console.log("rerender page");
  };

  render() {
    const { lstChecked } = this.state;
    var listItems = dc.lstPanels.map((i) => <div key={uuidv4()}>{i.lst}</div>);
    var checkeditems = [];
    for (var c in dc.lstCheck) {
      var tmp = dc.lstCheck[c].lst.map((i) => <div key={uuidv4()}>{i}</div>);
      checkeditems.push(tmp);
    }

    return (
      <Router>
        <div>
          <div className="fixedMenu">
            <div className="windowMenuSteps">
              {sc.getFlex([
                sc.getSpace(),
                <Link
                  className="topLink home"
                  activeClass="active"
                  to="/"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                >
                  template
                </Link>,
                sc.getSpace(),
                <Link
                  className="topLink testing"
                  activeClass="active"
                  to="/testing/"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                >
                  testing
                </Link>,
                sc.getSpace(),
                <Link
                  className="topLink source"
                  activeClass="active"
                  to="/source/"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                >
                  source
                </Link>,
                sc.getSpace(),
              ])}
            </div>
          </div>
          <Switch>
            <Route path="/testing/">
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
                  items={["hello", "my", "name", "is", "shannon"]}
                  parentCallback={this.handleCallback}
                />
                <dc.CheckList
                  id={1}
                  items={["a", "b", "c", "d", "e"]}
                  parentCallback={this.handleCallback}
                />
                {checkeditems}

                {ttt}
              </div>
            </Route>

            <Route exact path="/">
              show template
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default TG;
