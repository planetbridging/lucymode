import { v4 as uuidv4 } from "uuid";
import React from "react";
import {
  Center,
  Box,
  Stack,
  Text,
  VStack,
  StackDivider,
  Button,
  ButtonGroup,
  Checkbox,
  Wrap,
  WrapItem,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Spacer,
} from "@chakra-ui/react";

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

export class OnlyCHeck extends React.Component {
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
    //console.log(lstCheck);
    //this.props.parentCallback(lst, id);
    this.props.parentCallback(lst, id);
  };

  onClick = (e) => {
    var { sel, clicked } = this.state;
    //this.setState({ location: !e.target.checked });
    //console.log(e.target.checked);
    //console.log(e.target.value);
    //this.props.parentCallback();
    console.log(e);
    clicked += 1;
    if (sel) {
      sel = false;
    } else {
      sel = true;
    }
    console.log(sel);
    console.log(clicked);
    this.setState({ sel: sel, clicked: clicked });
    this.props.parentCallback();
  };

  handleCallback = () => {
    this.props.parentCallback();
  };
  render() {
    var { sel } = this.state;
    var checkingitems = this.props.items.map((i, index) => (
      <Checkbox
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
        isChecked={true}
      >
        {i}
      </Checkbox>
    ));
    return (
      <>
        {checkingitems}
        <Button onClick={(e) => this.onClick("lol")}>
          <OnlyCHeck check={sel} />
          omg
        </Button>
      </>
    );
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
        <Button
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
        </Button>
      );

      lstTesting = lstPanels.map((i) => <div key={uuidv4()}>{i.lst}</div>);
    }
    return (
      <div>
        <Button
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
        </Button>
        {testing}
        <Drawer isOpen={isOpen} placement={this.props.side}>
          <DrawerOverlay />
          <DrawerContent>
            <Button
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
            </Button>
            <DrawerHeader>{title}</DrawerHeader>
            <DrawerBody>
              {content}
              {lstTesting}
            </DrawerBody>

            <DrawerFooter>{footer}</DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }
}
