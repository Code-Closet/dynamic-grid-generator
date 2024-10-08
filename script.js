const themes = {
  theme1: ["#DDE392", "#AFBE8F", "#7D8570", "#646F58", "#504B3A"],
  theme2: ["#403F4C", "#2C2B3C", "#1B2432", "#121420", "#B76D68"],
  theme3: ["#916953", "#CF8E80", "#FCB5B5", "#FCDDF2", "#FAF6F6"],
  theme4: ["#F46036", "#2E294E", "#1B998B", "#E71D36", "#C5D86D"],
  theme5: ["#D4E4BC", "#96ACB7", "#36558F", "#40376E", "#48233C"],
};

let gridCoordinates = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];
const gridSize = 5;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const calculateSpan = (row, col) => {
  let rowSpan = getRandomInt(1, 2);
  let colSpan = getRandomInt(1, 2);
  rowSpan = rowSpan + row > gridSize + 1 ? 1 : rowSpan;
  colSpan =
    colSpan + col > gridSize + 1 ||
    gridCoordinates[row - 1][col + colSpan - 1] === 1
      ? 1
      : colSpan;
  return [+(row + rowSpan), +(col + colSpan)];
};

const markBusyCoordinates = (rowStart, colStart, rowEnd, colEnd) => {
  for (var i = 0; i < rowEnd - rowStart; i++) {
    for (var j = 0; j < colEnd - colStart; j++) {
      gridCoordinates[rowStart - 1 + i][colStart - 1 + j] = 1;
    }
  }
};

const createElement = (row) => {
  let rowSpacing = gridCoordinates[row - 1];
  let colFreeIndex = rowSpacing.findIndex((i) => i === 0) + 1;
  let area = null;
  if (colFreeIndex !== 0) {
    let spans = calculateSpan(row, colFreeIndex);
    area = `${row} / ${colFreeIndex} / ${spans[0]} / ${spans[1]}`;
    markBusyCoordinates(row, colFreeIndex, spans[0], spans[1]);
  }
  return area;
};

const generateGridPattern = () => {
  let rowIndex = 1;
  let gridLayout = [];
  let theme = themes[`theme${getRandomInt(1, 5)}`];

  while (rowIndex < gridSize + 1) {
    let data = {};
    data.content = `${rowIndex}`;
    data.area = createElement(rowIndex);
    data.background = theme[Math.floor(Math.random() * theme.length)];
    if (data.area !== null) gridLayout.push(data);
    else rowIndex++;
  }
  console.log(gridLayout);
  return gridLayout;
};

const gridContainer = document.getElementById("grid-container");

// Dynamically create grid items
generateGridPattern().forEach((item) => {
  const div = document.createElement("div");
  div.className = "grid-item";
  div.style.gridArea = item.area;
  div.style.backgroundColor = item.background;
  div.innerText = item.content;
  gridContainer.appendChild(div);
});
