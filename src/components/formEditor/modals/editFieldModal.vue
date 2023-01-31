<template>
  <fade-transition>
    <modal-with-overlay
      :visibility="editFieldModalStore.visibility"
      @update:visibility="editFieldModalStore.visibility = $event"
      v-if="editedField"
      title="Edit Field"
    >
      <label class="preview-label">Edited Field Preview</label>
      <div class="preview">
        <component
          v-if="editedField"
          :is="formStore.fieldComponents[editedField.component]"
          v-bind="{
            ...editedField.props,
            ...{
              ...formStore.getThemeForField(editedField.component),
              ...editedField.styles,
            },
            editable: false,
          }"
          v-model="
            formStore.formData.find(
              ({ name }) => editedField?.props.name === name
            ).value
          "
        ></component>
      </div>

      <form-editor-form-row label="Label">
        <form-editor-text-input v-model="editedField.props.label" />
      </form-editor-form-row>

      <form-editor-form-row label="Default Value">
        <form-editor-text-input v-model="editedField.props.defaultValue" />
      </form-editor-form-row>

      <form-editor-form-row label="Input Type">
        <form-editor-select-input
          v-model="editedField.props.type"
          :options="textFieldTypes"
        />
      </form-editor-form-row>

      <form-editor-button @click="save">
        {{ savingInProgress ? "Saving" : "Save Changes" }}
      </form-editor-button>
    </modal-with-overlay>
  </fade-transition>
</template>

<script lang="ts" setup>
import ModalWithOverlay from "@/components/formEditor/modals/modalWithOverlay.vue";
import FormEditorTextInput from "@/components/formEditor/fields/formEditorTextInput.vue";
import FormEditorFormRow from "@/components/formEditor/fields/formEditorFormRow.vue";
import FormEditorSelectInput from "@/components/formEditor/fields/formEditorSelectInput.vue";
import FormEditorButton from "@/components/formEditor/fields/formEditorButton.vue";
import { useEditFieldModalStore } from "@/stores/editFieldModal";
import { getFieldByPosition } from "@/helpers/shared/getters";
import { useFormStore } from "@/stores/form";
import { ref, watch } from "vue";
import type { Field } from "@/shared/models/Field";
import FadeTransition from "@/transitions/fadeTransition.vue";

const editFieldModalStore = useEditFieldModalStore();
const formStore = useFormStore();
const editedField = ref<Field | undefined>(undefined);
const savingInProgress = ref(false);

defineEmits(["update:visibility"]);

defineProps({
  visibility: {
    type: Boolean,
    default: false,
  },
});

const textFieldTypes = ref([
  {
    label: "Text",
    value: "text",
  },
  {
    label: "Email",
    value: "email",
  },
]);

watch(
  () => editFieldModalStore.target,
  () => {
    if (formStore.form && editFieldModalStore.target) {
      editedField.value = getFieldByPosition(
        formStore.form,
        editFieldModalStore.target.stepId,
        editFieldModalStore.target.sectionId,
        editFieldModalStore.target.rowId,
        editFieldModalStore.target.fieldId
      );
    }
  }
);

const save = async () => {
  savingInProgress.value = true;
  await editFieldModalStore.saveChanges();
  savingInProgress.value = false;
};
</script>
<script lang="ts">
export default {
  name: "editFieldModal",
};
</script>

<style lang="scss" scoped>
.preview {
  display: flex;
  flex-direction: column;
  padding: 12px;
  background-color: #eeeeee;
  border-radius: 2px;
}

.preview-label {
  font-size: 1.25em;
  margin-bottom: 8px;
}
</style>
