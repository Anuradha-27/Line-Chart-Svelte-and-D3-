<script>
  import LineChart from "./components/LineChart.svelte";
  import ScatterPlot from "./components/ScatterPlot.svelte";
  import BarChart from "./components/BarChart.svelte";
  import dataConfig from "./components/config/dataConfig";
  import dataConfig1 from "./components/config/dataConfig"
  import dataConfig2 from "./components/config/dataConfig2";
</script>

<section>
  <div class="container mb-5">
    <ScatterPlot  {dataConfig} />
  </div>
  <div class="container mb-5">
    <BarChart  {dataConfig1} />
  </div>
  <div class="container mb-5">
    <LineChart  dataConfig={dataConfig2} />
  </div>
</section>

<style>
  .container {
    border: 1px solid black;
  }
</style>
