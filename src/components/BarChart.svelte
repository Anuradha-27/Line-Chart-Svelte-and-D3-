<script>
  import * as d3 from "d3";
  import { scaleLinear } from "d3-scale";
  import { max } from "d3-array";
  import XAxis from "./shared/XAxis.svelte";
  import YAxis from "./shared/YAxis.svelte";
  import Header from "./shared/Header.svelte";
  import Tooltip from "./Tooltip.svelte";
  export let dataConfig1;
  let data=dataConfig1.data;
  let width = dataConfig1.chart.width;
  let height = dataConfig1.chart.height;
  let hoveredData;
  $: console.log(hoveredData);
  for (let i = 0; i < data.length; i++) {
    
    data[i].xKey=data[i][`${dataConfig1.xKey}`]
    data[i].yKey=data[i][`${dataConfig1.yKey}`]
  }
  const margin = {
    top: dataConfig1.margin.top,
    right: dataConfig1.margin.right,
    left: dataConfig1.margin.left,
    bottom: dataConfig1.margin.bottom,
  };
  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.xKey)])
    .range([0, width - margin.left - margin.right]);
  const yScale = scaleLinear()
    .domain([0, max(data, (d) => d.yKey)])
    .range([height - margin.top - margin.bottom, 0]);
  let xTicks = xScale.ticks(dataConfig1.range.xTicks);
  let yTicks = yScale.ticks(dataConfig1.range.yTicks);
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
    <g class="rect" transform="translate({margin.left} {margin.top})">
      <text
        transform={`translate(${dataConfig1.text.translate},${
          innerHeight / dataConfig1.text.height
        }) rotate(-90)`}
        >{dataConfig1.labels.yAxis}
      </text>

      {#each data.sort((a, b) => a.xKey - b.xKey) as data}
        <rect
          x={xScale(data.xKey)}
          y={yScale(data.yKey)}
          width={dataConfig1.bar.width}
          height={yScale(0) - yScale(data.yKey)}
          fill={dataConfig1.chart.fill}
          stroke={dataConfig1.chart.stroke}
          on:mouseover={() => {
            hoveredData = data;
          }}
          on:focus={() => {
            hoveredData = data;
          }}
          tabIndex={dataConfig1.scatter.tabIndex}
        />
      {/each}
      <text
        x={innerWidth / dataConfig1.text.height}
        y={innerHeight + dataConfig1.text.height1}>{dataConfig1.labels.xAxis}</text
      >
    </g>
  </svg>
  {#if hoveredData}
    <Tooltip data={hoveredData} {xScale} {yScale} />
  {/if}
</div>

<style>
</style>
