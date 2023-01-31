<template>
  <div class="form-row">
    <label class="form-row__label">{{ $props.label }}</label>
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    required: true,
    validator: (value: string) => value.length > 0,
  },
});
</script>
<script lang="ts">
export default {
  name: "formEditorFormRow",
};
</script>

<style lang="scss" scoped>
.form-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 0;

  .form-row__label {
    font-size: 1.125em;
  }
}
</style>
