<template>
  <v-card class="pa-3 ma-2">
    <v-card-title>조회 조건</v-card-title>
    <v-card-text>
      <v-text-field v-model="inputData.itemCode" label="품목코드" placeholder="ex) 901890" />
      <v-text-field v-model="inputData.year" label="연도" placeholder="ex) 2025" />
      <v-text-field v-model="inputData.month" label="월" placeholder="ex) 12" />
      <v-text-field v-model="inputData.domesticRegion" label="국내 지역" placeholder="ex) 금천구" />
    </v-card-text>

    <v-card-actions>
      <!-- 개별 카드에서 직접 조회 -->
      <!-- 로딩 중에는 버튼 비활성화 -->
      <v-btn color="primary" @click="fetchData" :disabled="loading"> 조회 </v-btn>

      <!-- 개별 카드 삭제 -->
      <v-btn color="error" @click="removeThisCard"> 삭제 </v-btn>
    </v-card-actions>

    <!-- 조회 결과 표시 영역 -->
    <v-card-subtitle class="mt-3">
      <!-- 로딩 중 표시 -->
      <div v-if="loading" class="d-flex align-center">
        <!-- 로딩 스피너 (Vuetify) -->
        <v-progress-circular indeterminate size="24" class="mr-2" />
        <span>로딩 중...</span>
      </div>

      <!-- 로딩이 끝나고, 응답이 없으면 아무것도 표시 안함 (또는 "결과 없음" 메시지) -->
      <div v-else-if="responseData">
        <strong>응답 결과:</strong><br />
        코드: {{ responseData.itemCode }} <br />
        연도/월: {{ responseData.year }} / {{ responseData.month }} <br />
        지역: {{ responseData.domesticRegionDollars?.domesticRegion }} <br />
        금액: {{ responseData.domesticRegionDollars?.dollar }} <br />
      </div>
    </v-card-subtitle>
  </v-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  cardId: {
    type: Number,
    required: true,
  },
})
const emits = defineEmits(['removeCard'])

// 이 카드의 입력 값 (로컬 상태)
const inputData = reactive({
  itemCode: '',
  year: '',
  month: '',
  domesticRegion: '',
})

// 개별 카드의 API 응답 데이터
const responseData = ref(null)
// 로딩 상태
const loading = ref(false)

/**
 * 이 카드만 API 호출
 */
const fetchData = async () => {
  loading.value = true
  responseData.value = null

  try {
    const body = {
      itemCode: inputData.itemCode,
      year: inputData.year,
      month: inputData.month,
      domesticRegions: [inputData.domesticRegion],
    }
    const res = await axios.post('http://61.109.146.231/api/detail-value', body)
    const detail = res.data.detailValueOfTwoItemsResponseList?.[0]
    if (detail) {
      responseData.value = detail
    }
  } catch (error) {
    console.error('API 요청 중 오류:', error)
    // 필요하다면 에러 메시지를 표시하는 로직 추가
  } finally {
    loading.value = false
  }
}

/**
 * 부모에게 "removeCard" 이벤트 emit
 */
const removeThisCard = () => {
  emits('removeCard', props.cardId)
}
</script>
