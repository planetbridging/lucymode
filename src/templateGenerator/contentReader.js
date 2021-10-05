import * as sc from "./staticContent";
import * as dc from "./dynamicContent";
import * as ch from "@chakra-ui/react";
import * as ic from "@chakra-ui/icons";

import ReactDOM from "react-dom";
import React, { component, createElement } from "react";

var lstItems = new Map();
lstItems.set("text");
lstItems.set("box");

export class contentManager {
  constructor(j) {
    this.j = j;
    this.lst = [];
    this.contentReader(this.j);
  }
  contentReader(obj) {
    var keys = Object.keys(obj);
    for (var prop in obj) {
      if (lstItems.has(prop)) {
        console.log("omg");
        console.log(typeof obj[prop]);
        console.log(obj[prop]);
        console.log(Array.isArray(obj[prop]));
        if (Array.isArray(obj[prop])) {
          if (obj[prop].length > 0) {
            if (prop == "text") {
              var settings = findSettings(["fontSize", "cssClass"], obj[prop]);
              this.lst.push(
                <ch.Text fontSize={settings[0]} className={settings[1]}>
                  {obj[prop][0]}
                </ch.Text>
              );
            } else if ("box") {
            }

            if (typeof obj[prop][0] != "object") {
            }
          }
        }
      }

      if (typeof obj[prop] == "object") {
        // object
        //contentReader(obj[prop[i]]);
        //contentReader(obj[prop]);
        console.log("---");
        console.log(prop);
        console.log("---");

        var keys = Object.keys(obj);

        console.log("111");
        console.log(keys);
        console.log("111");

        // this.contentReader(obj[prop]);
      } else if (typeof obj[prop] == "string") {
        return obj[prop];
      } else {
        // something else
        console.log("===");
        console.log("The value of " + prop + " is " + obj[prop] + ".");
        console.log("===");
        console.log(typeof obj[prop]);
      }
    }
  }
}

export function contentReader(json) {
  var lst = [];
  try {
    var j = json["content"];
    for (var r in j) {
      lst.push(getTemplate(j[r]));
    }
  } catch (err) {
    console.log("wrong data");
  }

  return lst;

  return lst;
}

function sortItemType(item, insert) {
  var subitem = item["content"];

  if (typeof item["content"] == "object") {
    if (Array.isArray(item["content"])) {
      var lst = [];
      for (var i in item["content"]) {
        lst.push(getTemplate(item["content"][i]));
      }
      subitem = lst;
    } else {
      subitem = getTemplate(item["content"]);
    }

    if (React.isValidElement(subitem)) {
      //console.log("no working");
      //return ReactDOM.render(subitem);
      return subitem;
    }
  } else if (insert != null) {
    subitem = insert;
  } else if (Array.isArray(subitem)) {
    console.log("load array");
  }
  return subitem;
}

export function getTemplate(item, insert) {
  if (Array.isArray(item)) {
    var lst = [];
    for (var i in item) {
      lst.push(getTemplate(item[i], insert));
    }
    return lst;
  }
  if (typeof item == "object") {
    //var keys = Object.keys(item);

    //console.log(keys);

    var subitem = sortItemType(item, insert);

    switch (item["i"]) {
      case "spacer ":
        return <ch.Spacer />;
      case "flex ":
        return <ch.Flex color={item["color"]}>{subitem}</ch.Flex>;
      case "button":
        var btn1 = getTemplate(item["content"], insert);
        return (
          <ch.Button
            colorScheme={item["colorScheme"]}
            size={item["size"]}
            onClick={item["onClick"]}
          >
            {btn1}
          </ch.Button>
        );
      case "text":
        return (
          <ch.Text
            color={item["color"]}
            fontSize={item["fontSize"]}
            className={item["className"]}
            bg={item["bg"]}
          >
            {subitem}
          </ch.Text>
        );
      case "box":
        return (
          <ch.Box
            flex={item["flex"]}
            bg={item["bg"]}
            border={item["border"]}
            borderColor={item["borderColor"]}
            w={item["w"]}
            p={item["p"]}
            color={item["color"]}
            h={item["h"]}
            boxShadow={item["boxShadow"]}
          >
            {subitem}
          </ch.Box>
        );
      case "center":
        return (
          <ch.Center w={item["w"]} h={item["h"]} bg={item["bg"]}>
            {subitem}
          </ch.Center>
        );
      case "wrapitem":
        return <ch.WrapItem p={item["p"]}>{subitem}</ch.WrapItem>;
      case "wrap":
        return (
          <ch.Wrap w={item["w"]} h={item["h"]} spacing={item["spacing"]}>
            {subitem}
          </ch.Wrap>
        );
      case "slidepanel":
        var btn1 = getTemplate(item["btn1content"], insert);
        return (
          <dc.SlidePanel
            id={item["id"]}
            side={item["side"]}
            content={subitem}
            size={item["size"]}
            btn1content={btn1}
            btn1width={item["btn1width"]}
            btn1height={item["btn1height"]}
            btn1cs={item["btn1colorScheme"]}
            btn2content={item["btn2content"]}
            btn2width={item["btn2width"]}
            btn2height={item["btn2height"]}
            btn2cs={item["btn2colorScheme"]}
          />
        );
      case "flex":
        return <ch.Flex>{subitem}</ch.Flex>;
      case "hstack":
        return <ch.HStack spacing={item["spacing"]}>{subitem}</ch.HStack>;
      case "vstack":
        return <ch.VStack spacing={item["spacing"]}>{subitem}</ch.VStack>;
      case "grid":
        return (
          <ch.Grid
            h={item["h"]}
            w={item["w"]}
            templateColumns={item["templateColumns"]}
            gap={item["gap"]}
            bg={item["bg"]}
          >
            {subitem}
          </ch.Grid>
        );
      case "griditem":
        return (
          <ch.GridItem
            rowSpan={item["rowSpan"]}
            colSpan={item["colSpan"]}
            bg={item["bg"]}
            colStart={item["colStart"]}
            colEnd={item["colEnd"]}
          >
            {subitem}
          </ch.GridItem>
        );
      case "link":
        return (
          <ch.Link href={item["href"]} color={item["color"]}>
            {subitem}
          </ch.Link>
        );
      case "WarningIcon":
        return (
          <ic.WarningIcon w={item["w"]} h={item["h"]} color={item["color"]} />
        );
      case "HamburgerIcon":
        return (
          <ic.HamburgerIcon w={item["w"]} h={item["h"]} color={item["color"]} />
        );
      case "ViewIcon":
        return (
          <ic.ViewIcon w={item["w"]} h={item["h"]} color={item["color"]} />
        );
      case "DragHandleIcon":
        return (
          <ic.DragHandleIcon
            w={item["w"]}
            h={item["h"]}
            color={item["color"]}
          />
        );
      case "DragHandleIcon":
        return (
          <ic.DragHandleIcon
            w={item["w"]}
            h={item["h"]}
            color={item["color"]}
          />
        );
      case "EditIcon":
        return (
          <ic.EditIcon w={item["w"]} h={item["h"]} color={item["color"]} />
        );
      case "RepeatClockIcon":
        return (
          <ic.RepeatClockIcon
            w={item["w"]}
            h={item["h"]}
            color={item["color"]}
          />
        );
      case "TriangleUpIcon":
        return (
          <ic.TriangleUpIcon
            w={item["w"]}
            h={item["h"]}
            color={item["color"]}
          />
        );
      case "Search2Icon":
        return (
          <ic.Search2Icon w={item["w"]} h={item["h"]} color={item["color"]} />
        );

      case "AddIcon":
        return <ic.AddIcon w={item["w"]} h={item["h"]} color={item["color"]} />;
    }
  }
  return item;
  console.log(item);
  console.log("bugger");
}

function findSettings(find, items) {
  var lst = [];
  for (var f in find) {
    var found = -1;
    for (var i in items) {
      if (items[i][0] == find[f]) {
        found = i;
        break;
      }
    }
    if (found != -1) {
      lst.push(items[found][1]);
    } else {
      lst.push("");
    }
  }
  return lst;
}

export function getTemplatedItem(key, item) {
  try {
    var size = "";
    var cssClass = "";
    var fontSize = "";
    var as = "";
    var subItems = [];
    var border = "";
    var borderColor = "";
    var background = "";
    var rounded = "";
    var height = "";
    var width = "";
    var padding = "";
    var margin = "";
    var color = "";
    var boxShadow = "";
    for (var i in item) {
      if (item[i].length > 1) {
        switch (item[i][0]) {
          case "size":
            size = item[i][1];
            break;
          case "fontSize":
            fontSize = item[i][1];
            break;
          case "as":
            as = item[i][1];
            break;
          case "cssClass":
            cssClass = item[i][1];
            break;
        }
      }
    }

    switch (key) {
      case "text":
        return (
          <ch.Text fontSize={fontSize} className={cssClass}>
            {item[0]}
          </ch.Text>
        );

      case "box":
        var lst = [];
        if (typeof item[0] == "object") {
          console.log("obj");
        }
        lst.push(
          <ch.Box
            as={as}
            content={item[0]}
            border={border}
            boderColor={borderColor}
            rounded={rounded}
            width={width}
            height={height}
            margin={margin}
            padding={padding}
            color={color}
            boxShadow={boxShadow}
            background={background}
          >
            {item[0]}
          </ch.Box>
        );
        return lst;

      case "space":
        return <ch.Spacer />;
    }
    return item[0];
  } catch (e) {
    return <p>broke</p>;
  }

  return <p>no idea</p>;
}
