<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

// 슬롯을 통해 각 페이지의 콘텐츠를 받습니다
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
    <Footer />
  </div>
</template> 