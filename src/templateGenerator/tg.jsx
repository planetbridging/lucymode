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
} from "@chakra-ui/react";

import * as sc from "./staticContent";

class TG extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
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
      </div>
    );
  }
}

export default TG;
