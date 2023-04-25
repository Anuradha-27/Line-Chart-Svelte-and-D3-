<script>
  import * as d3 from "d3";
  import { scaleLinear } from "d3-scale";
  import { max } from "d3-array";
  import XAxis from "./XAxis.svelte";
  import YAxis from "./YAxis.svelte";
  import Header from "./shared/Header.svelte";
  import Tooltip from "./Tooltip.svelte";
  import config from "./config/config";
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
    <g class="circles" transform="translate({margin.left} {margin.top})">
      <text transform={`translate(${-8},${innerHeight / 1.5}) rotate(-90)`}
        >Number of hours
      </text>
      <path
        d={path(data.sort((a, b) => a.grade - b.grade))}
        fill="none"
        stroke="black"
        stroke-width="1"
      />
      {#each data.sort((a, b) => a.grade - b.grade) as student}
        <circle
          cx={xScale(student.grade)}
          cy={yScale(student.hours)}
          r={hoveredData && hoveredData == student ? "8" : "5"}
          opacity={hoveredData ? (hoveredData == student ? "1" : ".3") : "1"}
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
      <text x={innerWidth / 1.5} y={innerHeight + 40}>Grades</text>
    </g>
  </svg>
  {#if hoveredData}
    <Tooltip data={hoveredData} {xScale} {yScale} />
  {/if}
</div>

<style>
</style>
