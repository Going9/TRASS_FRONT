<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6">
        <HomeCard
          title="잠정치 조회"
          description="품목코드, 국가로 잠정치 조회를 시작합니다."
          to="/provisional"
        />
      </v-col>
      <v-col cols="12" sm="6">
        <HomeCard
          title="상세조회"
          description="품목코드, 년월, 국내지역으로 상세 조회를 시작합니다."
          to="/detail"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import HomeCard from '@/components/HomeCard.vue'
</script>
