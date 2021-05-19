<template>
  <div>
    <div>
      <statistic />
    </div>
        <div>
      <linedata/>
    </div>
  </div>
</template>



<script>
import statistic from "./statistic/index";
import linedata from "./linedata/index";
export default {
  components: {
    statistic,
    linedata,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

