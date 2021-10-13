import * as ch from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import React from "react";

export class objText extends React.Component {
  render() {
    return (
      <ch.Text className={this.props.className} fontSize={this.props.fontSize}>
        {this.props.content}
      </ch.Text>
    );
  }
}

export class objBox extends React.Component {
  render() {
    return (
      <ch.Box
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
      </ch.Box>
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
    <ch.WrapItem key={uuidv4()}>
      <ch.Center w={cwidth} h={cheight}>
        <ch.Box
          border={boxb}
          borderColor={boxbc}
          rounded={boxr}
          w={bw}
          h={bh}
          p={bp}
          m={bm}
        >
          <ch.VStack spacing={vsspace} align={vsalign}>
            {i}
          </ch.VStack>
        </ch.Box>
      </ch.Center>
    </ch.WrapItem>
  ));
  return (
    <div className="autoRow">
      <ch.Wrap spacing={wspace} justify={wjust} w={wwidth}>
        {listItems}
      </ch.Wrap>
    </div>
  );
}

export function getSelected(items, color, cwidth, wimargin) {
  const listItems = items.map((i) => (
    <ch.WrapItem key={uuidv4()} m={wimargin}>
      <ch.Center w={cwidth} bg={color}>
        {i}
      </ch.Center>
    </ch.WrapItem>
  ));
  return <div className="autoRow">{listItems}</div>;
}

export function getBox(item, bthick, bcolor, rsize, w, p, m, bg, c, bs) {
  return (
    <ch.Box
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
    </ch.Box>
  );
}

export function getTiles(items) {
  const listItems = items.map((i) => <div key={uuidv4()}>{i}</div>);
  return <div className="autoRow">{listItems}</div>;
}

export function getSpace() {
  return <ch.Spacer />;
}

export function getFlex(items, a, j) {
  return (
    <ch.Flex align={a} justify={j}>
      {items}
    </ch.Flex>
  );
}

export function getTable(subitems, colorScheme, variant) {
  return (
    <ch.Table colorScheme={colorScheme} variant={variant}>
      {subitems}
    </ch.Table>
  );
}

export function getTableHead(subitems) {
  const lst = subitems.map(function (i) {
    return <ch.Th key={uuidv4()}>{i}</ch.Th>;
  });
  return (
    <ch.Thead>
      <ch.Tr>{lst}</ch.Tr>
    </ch.Thead>
  );
}

export function getTr(subitems) {
  const lst = subitems.map(function (i) {
    return <ch.Td key={uuidv4()}>{i}</ch.Td>;
  });
  return <ch.Tr>{lst}</ch.Tr>;
}

export function getTbody(subitems) {
  return <ch.Tbody>{subitems}</ch.Tbody>;
}
