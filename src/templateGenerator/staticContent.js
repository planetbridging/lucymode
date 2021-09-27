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
import { v4 as uuidv4 } from "uuid";
import React from "react";

export class objText extends React.Component {
  render() {
    return (
      <Text className={this.props.className} fontSize={this.props.fontSize}>
        {this.props.content}
      </Text>
    );
  }
}

export class objBox extends React.Component {
  render() {
    return (
      <Box
        bg={this.props.background}
        border={this.props.border}
        borderColor={this.props.borderColor}
        rounded={this.props.rounded}
        w={this.props.width}
        p={this.props.padding}
        m={this.props.margin}
        color={this.props.color}
        boxShadow={this.props.boxShadow}
      >
        {this.props.content}
      </Box>
    );
  }
}

export function getResults(
  items,
  cwidth,
  cheight,
  boxb,
  boxbc,
  boxr,
  bw,
  bh,
  bp,
  bm,
  vsalign,
  vsspace,
  wspace,
  wjust,
  wwidth
) {
  const listItems = items.map((i) => (
    <WrapItem key={uuidv4()}>
      <Center w={cwidth} h={cheight}>
        <Box
          border={boxb}
          borderColor={boxbc}
          rounded={boxr}
          w={bw}
          h={bh}
          p={bp}
          m={bm}
        >
          <VStack spacing={vsspace} align={vsalign}>
            {i}
          </VStack>
        </Box>
      </Center>
    </WrapItem>
  ));
  return (
    <div className="autoRow">
      <Wrap spacing={wspace} justify={wjust} w={wwidth}>
        {listItems}
      </Wrap>
    </div>
  );
}

export function getSelected(items, color, cwidth, wimargin) {
  const listItems = items.map((i) => (
    <WrapItem key={uuidv4()} m={wimargin}>
      <Center w={cwidth} bg={color}>
        {i}
      </Center>
    </WrapItem>
  ));
  return <div className="autoRow">{listItems}</div>;
}

export function getBox(item, bthick, bcolor, rsize, w, p, m, bg, c, bs) {
  return (
    <Box
      bg={bg}
      border={bthick}
      borderColor={bcolor}
      rounded={rsize}
      w={w}
      p={p}
      m={m}
      color={c}
      boxShadow={bs}
    >
      {item}
    </Box>
  );
}

export function getTiles(items) {
  const listItems = items.map((i) => <div key={uuidv4()}>{i}</div>);
  return <div className="autoRow">{listItems}</div>;
}

export function getSpace() {
  return <Spacer />;
}

export function getFlex(items, a, j) {
  return (
    <Flex align={a} justify={j}>
      {items}
    </Flex>
  );
}
