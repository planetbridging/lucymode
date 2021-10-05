import { v4 as uuidv4 } from "uuid";
import * as ch from "@chakra-ui/react";
import React from "react";
import * as sc from "./staticContent";

class objPanels {
  constructor(id, stat) {
    this.id = id;
    this.lst = [];
    this.c = stat;
  }
}

export var lstPanelIds = new Map();
export var lstPanels = [];
export var lstCheckIds = new Map();
export var lstCheck = [];

export class CustomCheckBox extends React.Component {
  state = {
    location: false,
  };
  render() {
    var id = uuidv4();
    if (this.props.check) {
      return (
        <input
          type="checkbox"
          onClick={this.onClick}
          name={id}
          id={id}
          checked
        ></input>
      );
    } else {
      return (
        <input type="checkbox" onClick={this.onClick} name={id} id={id}></input>
      );
    }
    return (
      <div>
        wetert
        <input type="checkbox" onClick={this.onClick} name={id} id={id}></input>
        <label for={id}>{this.props.item}</label>
      </div>
    );
  }

  onClick = (e) => {
    this.setState({ location: e.target.checked });
  };
}

function removeDups(a) {
  var seen = {};
  var out = [];
  var len = a.length;
  var j = 0;
  for (var i = 0; i < len; i++) {
    var item = a[i];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}

export class CheckList extends React.Component {
  state = {
    showCheckItems: [],
    checked: [],
    sel: false,
    clicked: 0,
  };
  componentDidMount() {
    if (!lstCheckIds.has(this.props.id)) {
      lstCheckIds.set(this.props.id);
      lstCheck.push(new objPanels(this.props.id));
    }
    this.loadCheckedItems();
  }

  loadCheckedItems = () => {
    var lst = [];
    for (var i in this.props.items) {
      lst.push(false);
    }
    this.setState({ checked: lst });
  };

  setCheckedItems = (id, lst) => {
    var { showCheckItems } = this.state;
    try {
      if (lst[1]) {
        if (!showCheckItems.includes(lst[0])) {
          showCheckItems.push(lst[0]);
          lstCheck[id].lst.push(lst[0]);
        }
      } else {
        const index = showCheckItems.indexOf(lst[0]);
        if (index > -1) {
          showCheckItems.splice(index, 1);
          lstCheck[id].lst.splice(index, 1);
        }
      }
    } catch (e) {
      console.log("unable to set checked item");
    }
    this.props.parentCallback(lst, id);
  };

  onClick = (e, i, id) => {
    var { checked } = this.state;
    const index = lstCheck[id].lst.indexOf(e);
    if (checked[i]) {
      checked[i] = false;
      if (index > -1) {
        lstCheck[id].lst.splice(index, 1);
      }
      for (var dups in lstCheck[id].lst + 1) {
        const index = lstCheck[id].lst.indexOf(e);
        if (index > -1) {
          lstCheck[id].lst.splice(index, 1);
        }
      }
    } else {
      checked[i] = true;
      if (index != 0) {
        lstCheck[id].lst.push(e);
      }
    }
    lstCheck[id].lst = removeDups(lstCheck[id].lst);
    this.setState({ checked: checked });
    this.props.parentCallback();
  };

  handleCallback = () => {
    this.props.parentCallback();
  };
  render() {
    var { checked } = this.state;
    var checkingitems = this.props.items.map((i, index) => (
      <ch.Button
        key={uuidv4()}
        onClick={(e) => this.onClick(i, index, this.props.id)}
      >
        <CustomCheckBox check={checked[index]} />
        {i}
      </ch.Button>
    ));
    return <>{checkingitems}</>;
  }
}

/*<div key={uuidv4()}>
        <OnlyCHeck item={i} parentCallback={this.handleCallback} />
      </div>*/

/*<input
          value={i}
          onClick={this.onClick}
          type="checkbox"
          id={"c" + index}
          name={"c" + index}
          checked
        />
        <label for={"c" + index}>{i}</label>*/

/*<Checkbox
        onClick={this.onClick}
        key={uuidv4()}
        defaultChecked={false}
        onChange={(e) =>
          this.setCheckedItems(this.props.id, [i, e.target.checked])
        }
        className={this.props.classes}
        key={uuidv4()}
        Button
        colorScheme={this.props.cs}
        size={this.props.size}
      >
        {i}
      </Checkbox>*/

export class SlidePanel extends React.Component {
  state = {
    isOpen: false,
    counter: 0,
  };

  componentDidMount() {
    if (!lstPanelIds.has(this.props.id)) {
      lstPanelIds.set(this.props.id);
      lstPanels.push(new objPanels(this.props.id));
    }
  }

  btnOpenDesc = () => {
    this.setState({ isOpen: true });
  };

  btnCloseDesc = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen, counter } = this.state;
    var title = this.props.title;
    var footer = this.props.footer;
    var scroll = this.props.scroll;
    var content = <div className="autoScrollDown">{this.props.content}</div>;
    if (!scroll) {
      content = this.props.content;
    }
    var testing = <></>;
    var lstTesting = <></>;
    if (this.props.testing) {
      testing = (
        <ch.Button
          onClick={() => {
            var c = counter + 1;
            lstPanels[this.props.id].lst.push(c);
            this.props.parentCallback();
            this.setState({ counter: c });
          }}
          colorScheme={this.props.btntcs}
          variant={this.props.btntv}
          leftIcon={this.props.btntli}
          rightIcon={this.props.btntri}
          spacing={this.props.btntspace}
          size={this.props.btntsize}
          height={this.props.btntheight}
          width={this.props.btntwidth}
          border={this.props.btntborder}
          borderColor={this.props.btntbc}
        >
          testing
        </ch.Button>
      );

      lstTesting = lstPanels.map((i) => <div key={uuidv4()}>{i.lst}</div>);
    }
    return (
      <div>
        <ch.Button
          onClick={() => this.btnOpenDesc()}
          colorScheme={this.props.btn1cs}
          variant={this.props.btn1v}
          leftIcon={this.props.btn1li}
          rightIcon={this.props.btn1ri}
          spacing={this.props.btn1space}
          size={this.props.btn1size}
          height={this.props.btn1height}
          width={this.props.btn1width}
          border={this.props.btn1border}
          borderColor={this.props.btn1bc}
        >
          {this.props.btn1content}
        </ch.Button>
        {testing}
        <ch.Drawer
          size={this.props.size}
          isOpen={isOpen}
          placement={this.props.side}
        >
          <ch.DrawerOverlay />
          <ch.DrawerContent>
            <ch.Button
              onClick={() => this.btnCloseDesc()}
              colorScheme={this.props.btn2cs}
              variant={this.props.btn2v}
              leftIcon={this.props.btn2li}
              rightIcon={this.props.btn2ri}
              spacing={this.props.btn2space}
              size={this.props.btn2size}
              height={this.props.btn2height}
              width={this.props.btn2width}
              border={this.props.btn2border}
              borderColor={this.props.btn2bc}
            >
              {this.props.btn2content}
            </ch.Button>
            <ch.DrawerHeader>{title}</ch.DrawerHeader>
            <ch.DrawerBody>
              {content}
              {lstTesting}
            </ch.DrawerBody>

            <ch.DrawerFooter>{footer}</ch.DrawerFooter>
          </ch.DrawerContent>
        </ch.Drawer>
      </div>
    );
  }
}
