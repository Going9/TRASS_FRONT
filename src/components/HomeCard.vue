<template>
  <v-card class="mx-auto d-flex flex-column" max-width="344" height="100%">
    <v-card-text class="flex-grow-1">
      <div class="mb-2 text-h6">TRASS AUTOMATION</div>

      <p class="text-h4 font-weight-black mb-3">{{ title }}</p>

      <div class="text-medium-emphasis">
        {{ description }}
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn :to="to" color="deep-purple-accent-4" text="시작하기" variant="text"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  to: String,
})
</script>
