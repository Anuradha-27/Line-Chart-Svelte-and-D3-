<script>
  import * as d3 from "d3";
  import { scaleLinear } from "d3-scale";
  import { max } from "d3-array";
  import XAxis from "./shared/XAxis.svelte";
  import YAxis from "./shared/YAxis.svelte";
  import Header from "./shared/Header.svelte";
  import Tooltip from "./Tooltip.svelte";
  export let dataConfig;
  let data=dataConfig.data;
  let width = dataConfig.chart.width;
  let height = dataConfig.chart.height;
  let hoveredData;
  $: console.log(hoveredData);
  for (let i = 0; i < data.length; i++) {
    data[i].xKey=data[i][`${dataConfig.xKey}`]
    data[i].yKey=data[i][`${dataConfig.yKey}`]
  }
  const margin = {
    top: dataConfig.margin.top,
    right: dataConfig.margin.right,
    left: dataConfig.margin.left,
    bottom: dataConfig.margin.bottom,
  };
  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.xKey)])
    .range([0, width - margin.left - margin.right]);
  const yScale = scaleLinear()
    .domain([0, max(data, (d) => d.yKey)])
    .range([height - margin.top - margin.bottom, 0]);
  let xTicks = xScale.ticks(dataConfig.range.xTicks);
  let yTicks = yScale.ticks(dataConfig.range.yTicks);
  let innerHeight = height - margin.top - margin.bottom;
  let innerWidth = width - margin.left - margin.right;
</script>

<Header />
<div
  class="chart-container"
  bind:clientWidth={width}
  on:mouseleave={() => {
    hoveredData = null;
  }}
>
  <svg {width} {height}>
    <XAxis {height} {xScale} {margin} {xTicks} />
    <YAxis {height} {yScale} {width} {margin} {yTicks} />
    <g class="circles" transform="translate({margin.left} {margin.top})">
      <text
        transform={`translate(${dataConfig.text.translate},${
          innerHeight / dataConfig.text.height
        }) rotate(-90)`}
        >{dataConfig.labels.yAxis}
      </text>

      {#each data.sort((a, b) => a.xKey - b.xKey) as data}
        <circle
          cx={xScale(data.xKey)}
          cy={yScale(data.yKey)}
          r={hoveredData && hoveredData == data
            ? dataConfig.scatter.beforeHovered
            : dataConfig.scatter.onHovered}
          opacity={hoveredData
            ? hoveredData == data
              ? dataConfig.scatter.opacity
              : dataConfig.scatter.opacityOnHovered
            : dataConfig.scatter.opacity}
          fill={dataConfig.chart.fill}
          stroke={dataConfig.chart.stroke}
          on:mouseover={() => {
            hoveredData = data;
          }}
          on:focus={() => {
            hoveredData = data;
          }}
          tabIndex={dataConfig.scatter.tabIndex}
        />
      {/each}
      <text
        x={innerWidth / dataConfig.text.height}
        y={innerHeight + dataConfig.text.height1}>{dataConfig.labels.xAxis}</text
      >
    </g>
  </svg>
  {#if hoveredData}
    <Tooltip data={hoveredData} {xScale} {yScale} />
  {/if}
</div>

<style>
</style>
