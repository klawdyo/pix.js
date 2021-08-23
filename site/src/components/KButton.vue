<template>
  <button
    v-bind="$attrs"
    @click="$emit('click')"
    class="
      bg-blue-500
      rounded-full
      font-bold
      text-white
      px-4
      py-3
      transition
      duration-300
      ease-in-out
      hover:bg-blue-600
      mr-6
    "
  >
    <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>
