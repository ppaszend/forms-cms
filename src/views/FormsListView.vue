<template>
  <div>
    <ul>
      <li v-for="form of forms" :key="form._id">
        <router-link :to="{ name: 'edit-form', params: { id: form._id } }">{{
          form.name
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const forms = ref([]);
fetch("http://localhost:3000/forms/")
  .then((resp) => resp.json())
  .then((data) => {
    forms.value = data;
  });
</script>
<script lang="ts">
export default {
  name: "FormsListView",
};
</script>

<style scoped></style>
