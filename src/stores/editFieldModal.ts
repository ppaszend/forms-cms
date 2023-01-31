import { defineStore } from "pinia";
import { ref } from "vue";
import type { FieldExactPosition } from "@/shared/models/FieldExactPosition";
import { useFormStore } from "@/stores/form";

export const useEditFieldModalStore = defineStore("editFieldModal", () => {
  const visibility = ref(false);
  const target = ref<FieldExactPosition | null>(null);

  const formStore = useFormStore();

  const saveChanges = async () => {
    await formStore.updateForm();
    visibility.value = false;
  };

  return { visibility, target, saveChanges };
});
