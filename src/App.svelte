<script>
  import LineChart from "./components/LineChart.svelte";
  import ScatterPlot from "./components/ScatterPlot.svelte";
  import BarChart from "./components/BarChart.svelte";
  import config from "./components/config/config";
  import data from "./data/data";
  import data1 from "./data/data1";
  import data2 from "./data/data2";
</script>

<section>
  <div class="container mb-5">
    <ScatterPlot {data} {config}/>
  </div>
  <div class="container mb-5">
    <BarChart {data} {config} />
  </div>
  <div class="container mb-5">
    <LineChart {data} {config} />
  </div>
</section>

<style>
  .container {
    border: 1px solid black;
  }
</style>
