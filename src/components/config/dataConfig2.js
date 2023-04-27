import data from "../../data/data2";
const lineChart = {
  data:data,
  xKey:"grade",
  yKey:"hours",
  chart: {
    width: 850,
    height: 400,
    fillNone: "none",
    fill: "purple",
    strokeWidth: 1,
    stroke: "black",
  },
  margin: {
    top: 30,
    right: 20,
    left: 20,
    bottom: 40,
  },
  range: {
    xTicks: 10,
    yTicks: 10,
  },
  labels: {
    xAxis: "Grades",
    yAxis: "Number of hours studied",
  },
  padding: {
    top: 20,
    right: 10,
    left: 10,
    bottom: 20,
  },
  scatter: {
    beforeHovered: 8,
    onHovered: 5,
    opacity: 1,
    opacityOnHovered: 0.3,
    tabIndex: 0,
  },
  text: {
    translate: -8,
    height: 1.5,
    height1: 40,
  },
  bar: {
    width: 10,
  },
};

export default lineChart;
