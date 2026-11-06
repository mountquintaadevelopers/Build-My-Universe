// Every coordinate is measured from the design, inside a 510 x 350 drawing.

type Point = [number, number];

const towerFloors = 9;
const towerHeight = 163;
const towerColumns: Point[] = [
  [0.12, 0.26],
  [0.41, 0.56],
  [0.72, 0.86],
];

function toPoints(points: Point[]): string {
  return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
}

function getFaceWindow(
  faceOrigin: Point,
  faceRun: Point,
  columnStart: number,
  columnEnd: number,
  floor: number,
): string {
  const top = (0.03 + floor * 0.105) * towerHeight;
  const bottom = top + 0.07 * towerHeight;
  const pointAt = (along: number, down: number): Point => [
    faceOrigin[0] + faceRun[0] * along,
    faceOrigin[1] + faceRun[1] * along + down,
  ];

  return toPoints([
    pointAt(columnStart, top),
    pointAt(columnEnd, top),
    pointAt(columnEnd, bottom),
    pointAt(columnStart, bottom),
  ]);
}

// Listed from the ground floor up, because that is the order they are drawn.
function getTowerWindows(): string[] {
  const windows: string[] = [];

  for (let floor = towerFloors - 1; floor >= 0; floor -= 1) {
    towerColumns.forEach(([start, end]) => {
      windows.push(getFaceWindow([160, 48.5], [62.5, 35.5], start, end, floor));
      windows.push(getFaceWindow([222.5, 84], [62.5, -35.5], start, end, floor));
    });
  }

  return windows;
}

export const landingHeroBlueprint = {
  plot: '97.3,229 223,157.4 395,256.7 269.3,328.3',
  tower: {
    roof: '222.5,11 285,48.5 222.5,84 160,48.5',
    leftFace: '160,48.5 222.5,84 222.5,247 160,211.5',
    rightFace: '222.5,84 285,48.5 285,211.5 222.5,247',
    windows: getTowerWindows(),
    roofBase: '201,44 222.5,32.5 244,44 222.5,57.5',
    roofCubeTop: '206.5,31 222.5,22.5 238.5,31 222.5,40',
    roofCubeSides: 'M206.5 31V46L222.5 55L238.5 46V31M222.5 40V55',
  },
  house: {
    leftWall: '128.3,202.3 175.7,228.3 175.7,274 128.3,247.3',
    rightWall: '175.7,228.3 206.7,211 206.7,256 175.7,274',
    roof: '128.3,202.3 144,164 191,191.7 175.7,228.3',
    gable: '175.7,228.3 191,191.7 206.7,211',
    window: '137.3,220.7 153.7,230.7 153.7,243.7 137.3,233.3',
    door: '184.3,240 195.7,236 195.7,261.7 184.3,268.3',
  },
  commercial: {
    roof: '253.7,175 301,147.3 363.3,183.3 316.7,210.7',
    leftWall: '253.7,175 316.7,210.7 316.7,283.3 253.7,247.3',
    rightWall: '316.7,210.7 363.3,183.3 363.3,256.7 316.7,283.3',
    windows: [
      '259.3,189.3 272.7,198.3 272.7,216 259.3,207.3',
      '278.7,200 292,208.7 292,227.3 278.7,218.3',
      '297.7,211.3 311,220 311,238.3 297.7,229.3',
      '324.3,220 338.7,209.3 338.7,226.7 324.3,237.3',
      '343.3,206 357.7,198.3 357.7,216 343.3,226',
    ],
    glass: '260,223.3 311,252 311,279.3 260,250',
    glassBars: 'M273.3 230.8V257.5M285 237.4V264.1M298.3 244.9V271.6',
    awning: '256.7,215 313.3,247.3 301.7,259 246.7,226.7',
  },
  trees: [
    { x: 252.3, y: 298.7, radius: 8.3 },
    { x: 274.3, y: 302.7, radius: 8.7 },
  ],
  plotWidth: {
    line: 'M78.3 240.7L250 339.3M72 246L84 235M244 345L256 334',
    label: { x: 160, y: 298, angle: 30 },
  },
  plotDepth: {
    line: 'M288.3 341L415 266M285.3 335.8L291.3 346.2M412 260.8L418 271.2',
    label: { x: 357, y: 312, angle: -30 },
  },
  floors: {
    line: 'M137.5 35V198.3M131.5 35H143.5M131.5 198.3H143.5',
    label: { x: 126, y: 117 },
  },
  callouts: {
    homes: {
      label: { x: 28, y: 53 },
      line: 'M79 58.5H26L191 98.5',
      dot: { x: 191, y: 98.5 },
      hitArea: { x: 22, y: 42, width: 62, height: 20 },
    },
    plots: {
      label: { x: 22.5, y: 153 },
      line: 'M42.5 158.5H95L143.7 212.3',
      dot: { x: 143.7, y: 212.3 },
      hitArea: { x: 18, y: 142, width: 84, height: 20 },
    },
    commercial: {
      label: { x: 388.5, y: 101 },
      line: 'M389 106.5H442L285 207.3',
      dot: { x: 285, y: 207.3 },
      hitArea: { x: 384, y: 90, width: 68, height: 20 },
    },
  },
  plotLabel: { x: 52.7, y: 232 },
  compass: {
    x: 458,
    y: 44.5,
    radius: 18.5,
    innerRadius: 14,
    needleNorth: '458,26 463,44.5 458,52 453,44.5',
    needleSouth: '458,52 461,47 458,63 455,47',
  },
};
