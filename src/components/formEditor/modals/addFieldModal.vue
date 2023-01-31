<template>
  <modal-with-overlay
    :visibility="$props.visibility"
    @update:visibility="$emit('update:visibility', $event)"
    title="Add New Field"
  >
    Select Field Type

    <div>
      <div v-for="field in formStore.fieldComponents" :key="field.name">
        <form-row>
          <form-column>
            <input
              type="radio"
              :value="field.name"
              v-model="selectedFieldComponent"
            />
            <component
              :is="formStore.fieldComponents[field.name]"
              v-bind="{
                ...formStore.getThemeForField(field.name),
                label: field.name,
                name: field.name,
                editable: false,
                readonly: true,
              }"
            />
          </form-column>
        </form-row>
      </div>
      <text-button>add</text-button>
    </div>
  </modal-with-overlay>
</template>

<script lang="ts" setup>
import ModalWithOverlay from "@/components/formEditor/modals/modalWithOverlay.vue";
import { useFormStore } from "@/stores/form";
import FormRow from "@/components/shared/form/FormRow.vue";
import FormColumn from "@/components/shared/form/FormColumn.vue";
import { ref } from "vue";
import TextButton from "@/components/formEditor/buttons/TextButton.vue";

defineProps({
  visibility: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:visibility"]);

const formStore = useFormStore();

const selectedFieldComponent = ref<string | null>(null);
</script>
<script lang="ts">
export default {
  name: "addFieldModal",
};
</script>

<style scoped></style>
