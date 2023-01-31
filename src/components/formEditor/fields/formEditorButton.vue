<template>
  <button class="button" @click="$emit('click')"><slot /></button>
</template>

<script lang="ts" setup>
defineEmits(["click"]);
</script>
<script lang="ts">
export default {
  name: "formEditorButton",
};
</script>

<style lang="scss" scoped>
.button {
  height: 44px;
  background-color: #42a5f5;
  border: 0;
  color: #ffffff;
  font-size: 1.075em;
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 2px;
  cursor: pointer;
}
</style>
