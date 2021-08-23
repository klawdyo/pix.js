<template>
  <div class="flex">
    <span
      class="
        text-sm
        border border-2
        rounded-l
        px-4
        py-2
        w-1/2
        text-gray-900
        bg-gray-300
        whitespace-no-wrap
      "
      >{{ label }}</span
    >
    <input
      v-bind="$attrs"
      v-model="temp"
      class="border border-2 rounded-r text-gray-900 px-4 py-2 w-full"
      type="text"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    value: String,
  },
  data() {
    return {
      temp: '',
    };
  },
  watch: {
    temp(v) {
      this.$emit('input', v);
    },
  },

  methods: {
    // onInput() {
    //   console.log('onInput');
    //   this.$emit('input', this.value);
    // },
  },
  mounted() {
    this.temp = this.value;
  },
};
</script>

<style lang="scss" scoped>
</style>
