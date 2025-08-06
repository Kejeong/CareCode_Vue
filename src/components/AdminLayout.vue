<script setup lang="ts">
import AdminHeader from '@/components/AdminHeader.vue'
import AdminSidebar from '@/components/AdminSidebar.vue'

// 슬롯을 통해 각 관리자 페이지의 콘텐츠를 받습니다
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <AdminHeader />
    <div class="flex">
      <AdminSidebar />
      <main class="flex-1 p-8">
        <slot />
      </main>
    </div>
  </div>
</template> 