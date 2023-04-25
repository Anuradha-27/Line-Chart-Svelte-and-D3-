<script>
  import LineChart from "./components/LineChart.svelte";
  import data from "./data/data";
  import data1 from "./data/data1";
  import data2 from "./data/data2";
</script>

<section>
  <div class="container mb-5">
    <LineChart {data} />
  </div>
  <div class="container mb-5">
    <LineChart data={data1} />
  </div>
  <div class="container mb-5">
    <LineChart data={data2} />
  </div>
</section>

<style>
  .container {
    border: 1px solid black;
  }
</style>
