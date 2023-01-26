<template>
  <modal-with-overlay v-model:visibility="addNewFieldModal">
    <button
      @click="
        addNewField(target, {
          component: 'TextField',
          cols: 12,
          props: { label: 'To kurwa działa' },
          styles: {},
        })
      "
    >
      <text-field model-value=""></text-field>
    </button>
  </modal-with-overlay>
</template>

<script lang="ts" setup>
const emit = defineEmits(["updateForm"]);
</script>
<script lang="ts">
export default {
  name: "addNewFieldModal",
};
</script>

<style scoped></style>
