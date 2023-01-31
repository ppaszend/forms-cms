<template>
  <input class="form-row__input" type="text" v-model="fieldValue" />
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const fieldValue = ref(props.modelValue);

watch(fieldValue, (value) => {
  emit("update:modelValue", value);
});

watch(
  () => props.modelValue,
  (value) => {
    fieldValue.value = value;
  }
);
</script>
<script lang="ts">
export default {
  name: "formEditorTextInput",
};
</script>

<style lang="scss" scoped>
.form-row__input {
  height: 36px;
}
</style>
