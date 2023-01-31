<template>
  <select class="input" v-model="inputValue">
    <option
      v-for="(option, index) of $props.options"
      :value="option.value"
      :key="index"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: String,
  },
  options: {
    type: Array,
    default: () => [],
  },
});

const inputValue = ref(props.modelValue);

watch(inputValue, (value) => {
  emit("update:modelValue", value);
});

watch(
  () => props.modelValue,
  (value) => {
    inputValue.value = value;
  }
);
</script>
<script lang="ts">
export default {
  name: "formEditorSelectInput",
};
</script>

<style lang="scss" scoped>
.input {
  height: 36px;
}
</style>
