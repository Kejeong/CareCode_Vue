<script setup lang="ts">
import AdminLayout from '@/components/AdminLayout.vue'
</script>

<template>
  <AdminLayout>
    <h1 class="text-4xl font-bold mb-10 text-blue-300 flex items-center">
      <svg class="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
      </svg>
      커뮤니티 관리
    </h1>
    <div class="card p-8">
      <div class="text-center">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
        </svg>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">커뮤니티 관리 기능</h3>
        <p class="text-gray-600">곧 업데이트될 예정입니다.</p>
      </div>
    </div>
  </AdminLayout>
</template>
