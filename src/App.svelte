<script>
  import LineChart from "./components/LineChart.svelte";
  import data from "./data/data";
  import data1 from "./data/data1";
  import data2 from "./data/data2";
</script>

<section>
  <LineChart {data} />
  <LineChart data={data1} />
  <LineChart data={data2} />
</section>
 