<template>
  <v-card class="pa-3 ma-2">
    <v-card-title>조회 조건</v-card-title>
    <v-card-text>
      <!-- 입력 필드들 -->
      <v-text-field v-model="inputData.itemCode" label="품목코드" />
      <v-text-field v-model="inputData.year" label="연도" />
      <v-text-field v-model="inputData.month" label="월" />
      <v-text-field
        v-model="regionInput"
        label="국내 지역 (쉼표 구분)"
        placeholder="예) 송파구, 금천구"
      />
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" @click="fetchData" :disabled="loading"> 조회 </v-btn>
      <v-btn color="error" @click="removeThisCard">삭제</v-btn>
    </v-card-actions>

    <!-- 로딩 표시 -->
    <v-card-subtitle class="mt-3">
      <div v-if="loading" class="d-flex align-center">
        <v-progress-circular indeterminate size="24" class="mr-2" />
        로딩 중...
      </div>
      <!-- 응답 표시 -->
      <div v-else>
        <div v-for="(detail, idx) in responseList" :key="idx" class="mt-2">
          <strong>{{ detail.domesticRegionDollars.domesticRegion }}</strong>
          <br />
          금액: {{ detail.domesticRegionDollars.dollar }}
          <hr v-if="idx < responseList.length - 1" />
        </div>
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

const inputData = reactive({
  itemCode: '',
  year: '',
  month: '',
})

// 국내 지역 복수 입력을 위해, 쉼표(,)로 구분해 입력
const regionInput = ref('') // "송파구, 금천구" 등으로 입력
const responseList = ref([]) // 여러 지역 결과
const loading = ref(false)

/** 조회 함수 */
const fetchData = async () => {
  loading.value = true
  responseList.value = []

  try {
    // 쉼표 구분된 문자열 => 배열
    const regions = regionInput.value
      .split(',')
      .map((str) => str.trim())
      .filter((r) => r.length > 0)

    const body = {
      itemCode: inputData.itemCode,
      year: inputData.year,
      month: inputData.month,
      domesticRegions: regions,
    }
    const res = await axios.post('http://61.109.146.231/api/detail-value', body)

    // detailValueOfTwoItemsResponseList가 여러 객체를 반환
    const details = res.data.detailValueOfTwoItemsResponseList
    if (Array.isArray(details)) {
      responseList.value = details
    }
  } catch (error) {
    console.error('API 요청 중 오류:', error)
  } finally {
    loading.value = false
  }
}

const removeThisCard = () => {
  emits('removeCard', props.cardId)
}
</script>
