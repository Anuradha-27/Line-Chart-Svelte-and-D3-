<script>
  import * as d3 from "d3";
  import { scaleLinear } from "d3-scale";
  import { max } from "d3-array";
  import XAxis from "./XAxis.svelte";
  import YAxis from "./YAxis.svelte";
  import Header from "./shared/Header.svelte";
  import Tooltip from "./Tooltip.svelte";
  import data1 from "../data/data1";
  export let config
  export let data;
  let width = config.chart.width;
  let height = config.chart.height;
  let hoveredData;
  $: console.log(hoveredData);
  let path = d3
    .line()
    .x((d) => xScale(d.grade))
    .y((d) => yScale(d.hours))
    .curve(d3.curveLinear);
  const margin = {
    top: config.margin.top,
    right: config.margin.right,
    left: config.margin.left,
    bottom: config.margin.bottom,
  };
  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.grade)])
    .range([0, width - margin.left - margin.right]);
  const yScale = scaleLinear()
    .domain([0, max(data, (d) => d.hours)])
    .range([height - margin.top - margin.bottom, 0]);
  let xTicks = xScale.ticks(config.range.xTicks);
  let yTicks = yScale.ticks(config.range.yTicks);
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
      <text transform={`translate(${-8},${innerHeight / 1.5}) rotate(-90)`}
        >{config.labels.yAxis}
      </text>
      
      {#each data.sort((a, b) => a.grade - b.grade) as student}
        <rect
          x={xScale(student.grade)}
          y={yScale(student.hours)}
          width=10 height={yScale(0)-yScale(student.hours)}
          fill="purple"
          stroke="black"
          on:mouseover={() => {
            hoveredData = student;
          }}
          on:focus={() => {
            hoveredData = student;
          }}
          tabIndex="0"
        />
      {/each}
      <text x={innerWidth / 1.5} y={innerHeight + 40}
        >{config.labels.xAxis}</text
      >
    </g>
  </svg>
  {#if hoveredData}
    <Tooltip data={hoveredData} {xScale} {yScale} />
  {/if}
</div>

<style>
    .bars rect {
		justify-content: space-evenly;
		opacity: 0.65;
	}
</style>
