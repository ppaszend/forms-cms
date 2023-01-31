<template>
  <main>
    <div>
      <button @click="formStore.editable = !formStore.editable">
        Turn {{ formStore.editable ? "off" : "on" }} edit mode
      </button>
    </div>
    <form-component />
  </main>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import FormComponent from "@/components/shared/form/FormComponent.vue";
import { useFormStore } from "@/stores/form";

const route = useRoute();
const formStore = useFormStore();
formStore.fetchForm(
  typeof route.params.id === "string" ? route.params.id : route.params.id[0]
);
</script>
<script lang="ts">
export default {
  name: "EditFormView",
};
</script>

<style scoped></style>
