<template>
  <div
    class="modal-wrapper"
    v-if="$props.visibility"
    @click.exact="$emit('update:visibility', false)"
  >
    <div class="modal">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  visibility: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);
</script>
<script lang="ts">
export default {
  name: "modalWithOverlay",
};
</script>

<style lang="scss" scoped>
.modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparentize(#000, 0.3);

  .modal {
    background-color: #fff;
    width: 100%;
    max-width: 400px;
    padding: 24px;
    display: flex;
    flex-direction: column;
  }
}
</style>
