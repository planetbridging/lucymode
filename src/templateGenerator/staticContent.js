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

export function getText(content, cname, fsize, as) {
  return (
    <Text as={as} className={cname} fontSize={fsize}>
      {content}
    </Text>
  );
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
