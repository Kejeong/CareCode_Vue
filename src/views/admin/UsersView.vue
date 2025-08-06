<template>
  <AdminLayout>
      <h1 class="text-4xl font-bold mb-10 text-blue-300 flex items-center">
        <svg class="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        사용자 관리
      </h1>

      <div class="bg-gray-800 rounded-lg p-6 shadow">
        <div class="text-center">
          <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-semibold text-gray-200 mb-2">사용자 관리 기능</h3>
          <p class="text-gray-400">곧 업데이트될 예정입니다.</p>
        </div>
      </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '@/components/AdminLayout.vue'
</script>
