import * as sc from "./staticContent";
import * as cd from "./dynamicContent";
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
                <Text fontSize={settings[0]} className={settings[1]}>
                  {obj[prop][0]}
                </Text>
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
  /*if (["lol", "lol"] instanceof Array) {
    console.log("lol");
  }

  */
  return lst;
  /*console.log("loaded");
  for (var prop in obj) {
    var inner = [];
    console.log(prop);
    var keys = Object.keys(obj[prop]);
    console.log("aaa");
    console.log(keys);
    console.log("aaa");
    if (keys.includes("content")) {
      var stuff = obj[prop]["content"];
      for (var c in stuff) {
        if (typeof stuff[c] == "string") {
          inner.push(stuff[c]);
          console.log(stuff[c]);
        } else if (typeof stuff[c] == "object") {
          console.log("ooo");
          console.log(stuff[c]);
          console.log("ooo");
          contentReader(lst, stuff[c]);
          //lst.push(contentReader(lst, stuff[c]));
        }
      }
    }

    switch (prop) {
      case "box":
        console.log(obj[prop]);
        lst.push(
          <Box border="1px" borderColor="gray.200">
            {inner}
          </Box>
        );
        return lst;

      case "space":
        return <Spacer />;
    }

    if (typeof obj[prop] == "object") {
      console.log(obj[prop]);
    }
  }*/
  /*for (var prop in obj) {
    if (typeof obj[prop] == "object") {
      // object
      //contentReader(obj[prop[i]]);
      //contentReader(obj[prop]);
      console.log("---");
      console.log(obj[prop]);
      console.log("---");
      var keys = Object.keys(obj);

      console.log("111");
      console.log(keys);
      console.log("111");
      console.log(typeof obj[prop][keys]);
      contentReader(obj[prop]);
    } else {
      // something else
      console.log("===");
      console.log("The value of " + prop + " is " + obj[prop] + ".");
      console.log("===");
    }
  }*/
  /*try {
    var count = 0;
    for (var r in j) {
      for (var i in j[r]) {
        try {
          var keys = Object.keys(j[r][i]);
          if (typeof j[r][i][keys[0]] == "object") {
            console.log(j[r][i][keys[0]]);
          } else {
            lst.push(getTemplatedItem(keys[0], j[r][i][keys[0]]));
          }
        } catch {
          lst.push(<p>problem with line: " {count}</p>);
        }
        count += 1;
      }
    }
  } catch (err) {
    console.log("wrong data");
  }*/
  return lst;
}

export function getTemplate(item) {
  if (typeof item == "object") {
    //var keys = Object.keys(item);

    //console.log(keys);
    switch (item["i"]) {
      case "text":
        return (
          <Text fontSize={item["fontSize"]} className={item["className"]}>
            {item["content"]}
          </Text>
        );
      case "box":
        var subitem = item["content"];
        if (typeof item["content"] == "object") {
          subitem = getTemplate(item["content"]);
        }
        return (
          <Box border={item["border"]} borderColor={item["borderColor"]}>
            {subitem}
          </Box>
        );
    }
  }
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
          <Text fontSize={fontSize} className={cssClass}>
            {item[0]}
          </Text>
        );

      case "box":
        var lst = [];
        if (typeof item[0] == "object") {
          console.log("obj");
        }
        lst.push(
          <Box
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
          </Box>
        );
        return lst;

      case "space":
        return <Spacer />;
    }
    return item[0];
  } catch (e) {
    return <p>broke</p>;
  }

  return <p>no idea</p>;
}