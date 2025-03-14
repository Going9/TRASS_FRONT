<template>
  <v-app>
    <!-- 상단 네비게이션 -->
    <v-app-bar color="primary" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title @click="goHome" style="cursor: pointer"> TRASS AUTOMATION </v-toolbar-title>
    </v-app-bar>

    <!-- 네비게이션 서랍 -->
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item to="/" title="홈"></v-list-item>
        <v-list-item to="/provisional" title="잠정치 조회"></v-list-item>
        <v-list-item to="/detail" title="상세조회"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- 페이지 컨텐츠 -->
    <v-main>
      <!-- 컨텐츠를 감싸는 컨테이너 -->
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const drawer = ref(false)
const router = useRouter()

// TRASS AUTOMATION 클릭 시 홈으로 이동
const goHome = () => {
  router.push('/')
}
</script>

<style>
.v-application,
.v-main,
.v-main__wrap {
  max-width: 100% !important;
  width: 100% !important;
}
</style>
