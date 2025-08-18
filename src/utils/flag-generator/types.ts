const backgroundTypes = [
  {
    name: "solid",
    modifierChance: { emblem: 0.7, canton: 0.5, chevron: 0.35 }
  },
  {
    name: "stripes",
    orientations: ["horizontal", "vertical"],
    minStripes: 2,
    maxStripes: 8,
    modifierChance: { emblem: 0.5, canton: 0.45, chevron: 0.25 }
  },
  {
    name: "weighted-stripes",
    orientations: ["horizontal", "vertical", "outlined-horizontal"],
    stripes: 3,
    modifierChance: { emblem: 0.55, canton: 0.3, chevron: 0.35 }
  },
  {
    name: "cross",
    styles: ["regular", "nordic-left", "nordic-right", "xshape"],
    modifierChance: { emblem: 0, canton: 0, chevron: 0 }
  },
  {
    name: "checkerboard",
    minRowsCols: 2,
    maxRowsCols: 10,
    modifierChance: { emblem: 0.45, canton: 0.35, chevron: 0 }
  }
];


const modifierTypes = [
  {
    name: "canton",
    positions: ["top-left", "top-right"],
    defaultColor: "blue",
    allowsEmblems: true
  },
  {
    name: "chevron",
    directions: ["left", "right"],
    defaultColor: "yellow",
    widthRatio: 0.3
  },
  {
    name: "emblem",
    types: ["star", "circle", "triangle"],
    positions: ["top-left", "top-right", "bottom-left", "bottom-right", "center"],
    cantonPositions: ["top-left", "top-right"],
    chevronPositions: ["center-left", "center-right"],
    defaultColor: "white",
    sizeRatio: 0.1
  }
];

export { backgroundTypes, modifierTypes };