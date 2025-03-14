<template>
  <v-container>
    <v-card class="mb-4">
      <v-card-title>상세 조회</v-card-title>
      <v-card-text>
        카드마다 독립적으로 API 조회를 할 수 있습니다.<br />
        "품목 추가" 버튼으로 입력 카드를 늘리고, 각 카드 안에서 "조회" 버튼을 누르면 해당 카드만
        요청이 수행됩니다.
      </v-card-text>
    </v-card>

    <!-- 여러 DetailCard를 관리 -->
    <v-row>
      <v-col v-for="(card, index) in cards" :key="card.id" cols="12" md="4">
        <DetailCard :card-id="card.id" @removeCard="removeCard" />
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-4">
      <v-btn color="primary" @click="addCard"> 품목 추가 </v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import DetailCard from '@/components/DetailCard.vue'

let nextId = 1
// cards 목록: 여러 DetailCard를 렌더링하기 위한 배열
const cards = ref([{ id: nextId++ }])

/**
 * 새 카드 추가
 */
const addCard = () => {
  cards.value.push({ id: nextId++ })
}

/**
 * 특정 카드 삭제
 */
const removeCard = (cardId) => {
  const idx = cards.value.findIndex((card) => card.id === cardId)
  if (idx !== -1) {
    cards.value.splice(idx, 1)
  }
}
</script>
