<template>
  <button :class="`button button-${$props.type}`" @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineEmits(["click"]);

defineProps({
  type: {
    type: String,
    default: "primary",
    validator: (value: string) =>
      ["primary", "success", "danger"].includes(value),
  },
});
</script>
<script lang="ts">
export default {
  name: "TextButton",
};
</script>

<style lang="scss" scoped>
.button {
  height: 40px;
  padding: 0 24px;
  background-color: transparent;
  border: 0;
  font-size: 1.075em;
  border-radius: 2px;
  cursor: pointer;

  &.button-primary {
    background-color: #42a5f5;
    color: #ffffff;
  }

  &.button-success {
    background-color: #66bb6a;
    color: #ffffff;
  }

  &.button-danger {
    background-color: #ef5350;
    color: #ffffff;
  }
}
</style>
