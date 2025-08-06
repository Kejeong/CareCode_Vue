<template>
  <header class="bg-gray-800 shadow flex items-center justify-between px-8 py-4 fixed w-full z-10">
    <div class="flex items-center space-x-4">
      <span class="text-2xl font-bold text-blue-400">CareCode Admin</span>
    </div>
    <div class="flex items-center space-x-4">
      <span class="text-gray-300">admin@carecode.com</span>
      <button
        @click="logout"
        class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center"
      >
        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
            clip-rule="evenodd"
          />
        </svg>
        로그아웃
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const logout = () => {
  // 로그아웃 로직
  console.log('로그아웃')
}
</script>
