<template>
  <div>
    <ranklist  :date="date" :selectdate="selectdate" />
  </div>
</template>





<script>
import ranklist from "./ranklist";
export default {
  components: {
    ranklist,
  },
  data() {
    return {};
  },
  computed: {

  },
  methods: {},
  props:["date","selectdate"]
};
</script>
