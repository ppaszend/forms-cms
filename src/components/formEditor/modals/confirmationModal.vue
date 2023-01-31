<template>
  <modal-with-overlay
    v-model:visibility="$props.visibility"
    title="Are you sure"
  >
    <p>You are deleting this field and it cannot be undone</p>
    <div class="modal-buttons">
      <button class="button-danger" @click="$emit('clickNo')">No</button>
      <button class="button-success" @click="$emit('clickYes')">Yes</button>
    </div>
  </modal-with-overlay>
</template>

<script lang="ts" setup>
import ModalWithOverlay from "@/components/formEditor/modals/modalWithOverlay.vue";

defineEmits(["update:visibility", "clickYes", "clickNo"]);

defineProps({
  visibility: {
    type: Boolean,
    default: false,
  },
});
</script>
<script lang="ts">
export default {
  name: "confirmationModal",
};
</script>

<style lang="scss" scoped>
.modal-buttons {
  display: flex;
  gap: 10px;
}
</style>
