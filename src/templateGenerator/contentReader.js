import * as sc from "./staticContent";
import * as cd from "./dynamicContent";

export function contentReader(j) {
  var lst = [];
  try {
    var count = 0;
    for (var r in j) {
      for (var i in j[r]) {
        try {
          var keys = Object.keys(j[r][i]);
          lst.push(getTemplatedItem(keys[0], j[r][i][keys[0]]));
        } catch {
          lst.push(<p>problem with line: " {count}</p>);
        }
        count += 1;
      }
    }
  } catch (err) {
    console.log("wrong data");
  }
  return lst;
}

export function getTemplatedItem(key, item) {
  console.log(key);
  console.log(item);
  switch (key) {
    case "text":
      console.log(item);
      //return getText(item[0], "", item[1]);
      break;
  }
  return <p>no idea</p>;
}
