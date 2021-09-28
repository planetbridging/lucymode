import React from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as sc from "./staticContent";
import * as dc from "./dynamicContent";
import * as cr from "./contentReader";
import * as ch from "@chakra-ui/react";

var ttt = "wow";

var j = {
  content: [
    { i: "text", content: "text1", fontSize: "lg" },
    { i: "text", content: "text2", fontSize: "lg" },
    {
      i: "box",
      content: { i: "text", content: "text3", fontSize: "lg" },
      border: "1px",
      borderColor: "red.200",
    },
    {
      i: "box",
      content: {
        i: "box",
        content: { i: "text", content: "text4", fontSize: "lg" },
        border: "1px",
        borderColor: "purple.200",
      },
      border: "1px",
      borderColor: "green.200",
    },
  ],
};
//border="1px" borderColor="gray.200"

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
                  className="topLink testing"
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
                  className="topLink home"
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
                  className="topLink source"
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
                {sc.getBox(<sc.objText content={"lol"} />)}
                {sc.getFlex([sc.getSpace(), <sc.objText content="a" />])}

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

                <ch.Box border="1px" borderColor="gray.200">
                  hello
                  <ch.Box border="1px" borderColor="red">
                    <ch.Box border="1px" borderColor="blue">
                      <ch.Box border="1px" borderColor="orange">
                        Card
                      </ch.Box>
                    </ch.Box>
                  </ch.Box>
                </ch.Box>
                {cr.contentReader(j)}
                {cr.getTemplate(
                  {
                    i: "box",
                    content: "ewfew",
                    border: "1px",
                    borderColor: "red.200",
                  },
                  <ch.Box>inside</ch.Box>
                )}
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
