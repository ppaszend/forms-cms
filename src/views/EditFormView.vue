<template>
  <main>
    <div>
      <button @click="formStore.editable = !formStore.editable">
        Turn {{ formStore.editable ? "off" : "on" }} edit mode
      </button>
    </div>
    <form-component
      v-if="formStore.form"
      :form="formStore.form"
      :editable="true"
    />
  </main>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import FormComponent from "@/components/shared/form/FormComponent.vue";
import { useFormStore } from "@/stores/form";

const route = useRoute();
const formStore = useFormStore();
formStore.fetchForm(route.params.id);
</script>
<script lang="ts">
export default {
  name: "EditFormView",
};
</script>

<style scoped></style>
