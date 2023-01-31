import { markRaw, ref } from "vue";
import { defineStore } from "pinia";
import {
  getFieldByPosition,
  getRowByPosition,
  getSectionByPosition,
} from "@/helpers/shared/getters";
import { generateEmptyFormData } from "@/helpers/shared/generators";

import type { FormData } from "@/shared/models/FormData";
import type { FieldExactPosition } from "@/shared/models/FieldExactPosition";
import type { Field } from "@/shared/models/Field";
import type { Form } from "@/shared/models/Form";
import TextField from "@/components/shared/form/fields/TextField.vue";
import DateField from "@/components/shared/form/fields/DateField.vue";

export const useFormStore = defineStore("form", () => {
  const editable = ref<boolean>(true);
  const form = ref<Form | null>(null);
  const formData = ref<FormData[]>([]);
  const fieldComponents = markRaw({
    TextField,
    DateField,
  });

  const fetchForm = async (formId: string) => {
    const response = await fetch(`http://localhost:3000/forms/${formId}`);
    const data = await response.json();
    if (!data) {
      throw new Error("Form not found");
    }

    form.value = data;
    formData.value = generateEmptyFormData(data);
  };

  const saveForm = async () => {
    if (!form.value) {
      throw new Error("Form is not available");
    }

    await fetch(`http://localhost:3000/forms/${form.value._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.value),
    });
  };

  const createField = async (
    { stepId, sectionId, rowId, fieldId }: FieldExactPosition,
    field: Field
  ) => {
    if (!form.value) {
      throw new Error("Form is not available");
    }

    getRowByPosition(form.value, stepId, sectionId, rowId)?.fields.push({
      ...field,
      id: fieldId,
    });

    await saveForm();
  };

  const editField = (fieldExactPosition: FieldExactPosition) => {
    if (!form.value) {
      throw new Error("Form is not available");
    }

    getFieldByPosition(
      form.value,
      fieldExactPosition.stepId,
      fieldExactPosition.sectionId,
      fieldExactPosition.rowId,
      fieldExactPosition.fieldId
    );
  };

  const removeField = async (
    stepId: number,
    sectionId: number,
    rowId: number,
    fieldId: number
  ) => {
    if (!form.value) {
      throw new Error("Form is not available");
    }

    const row = getRowByPosition(form.value, stepId, sectionId, rowId);
    if (row) {
      row.fields = row.fields
        .filter((field) => field.id !== fieldId)
        .map((field, index) => ({ ...field, id: index }));
      await saveForm();
    }
  };

  const getThemeForField = (fieldComponentName: string): object => {
    if (!form.value) {
      throw new Error("Form is not available");
    }

    return (
      form.value.theme.fields.find(
        (field) => fieldComponentName === field.component
      ) || {}
    );
  };

  return {
    editable,
    form,
    formData,
    fieldComponents,
    fetchForm,
    createField,
    editField,
    removeField,
    getThemeForField,
    updateForm: saveForm,
  };
});
