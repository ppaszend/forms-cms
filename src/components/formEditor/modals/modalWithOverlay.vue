<template>
  <div
    class="modal-wrapper"
    v-if="$props.visibility"
    @click.self="$emit('update:visibility', false)"
  >
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title" v-if="title">
          {{ title }}
        </div>
        <div class="modal-buttons">
          <button
            class="modal-button"
            @click="$emit('update:visibility', false)"
          >
            <font-awesome-icon icon="fa-solid fa-xmark"></font-awesome-icon>
          </button>
        </div>
      </div>
      <div class="modal-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

defineProps({
  visibility: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: false,
  },
});

defineEmits(["update:visibility"]);
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
  background-color: transparentize(#000, 0.1);

  .modal {
    background-color: #fff;
    width: calc(100% - 24px);
    max-width: 800px;
    display: flex;
    flex-direction: column;
    border-radius: 2px;

    .modal-header {
      display: flex;
      align-items: center;
      padding: 16px;
      background-color: #eeeeee;

      .modal-title {
        font-size: 1.5em;
        font-weight: 500;
        padding-top: 6px;
      }

      .modal-buttons {
        margin-left: auto;

        .modal-button {
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
          height: 36px;
          width: 36px;
          border-radius: 18px;
          font-size: 24px;
          cursor: pointer;
        }
      }
    }

    .modal-content {
      display: flex;
      flex-direction: column;
      padding: 24px;
    }
  }
}
</style>
