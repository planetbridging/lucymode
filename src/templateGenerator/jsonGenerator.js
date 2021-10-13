export function getLstOfUniq(items, type) {
  var lst = [];
  for (var i in items) {
    lst.push({ i: type, content: items[i] });
  }
  return lst;
}

export function getLstOfBadges(items, ml, variant, colorScheme) {
  var lst = [];
  for (var i in items) {
    lst.push({
      i: "badge",
      content: items[i],
      ml: ml,
      variant: variant,
      colorScheme: colorScheme,
    });
  }
  return lst;
}
