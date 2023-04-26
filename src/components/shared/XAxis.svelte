<script>
  export let height, xScale, margin;
  export let xTicks;
</script>

<g>
  {#each xTicks as tick}
    <text
      x={xScale(tick)}
      y={height - margin.bottom}
      dy="6"
      dominant-baseline="hanging">{tick}%</text
    >
  {/each}
</g>

<style>
</style>
