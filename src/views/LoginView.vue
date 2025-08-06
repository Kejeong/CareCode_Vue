<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div
          class="mx-auto h-12 w-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center"
        >
          <span class="text-white font-bold text-xl">맘</span>
        </div>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">맘편한</h2>
        <p class="mt-2 text-sm text-gray-600">육아 정보 플랫폼에 로그인하세요</p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">이메일</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="input-field mt-1"
              placeholder="이메일을 입력하세요"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">비밀번호</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="input-field mt-1"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.rememberMe"
              type="checkbox"
              class="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              로그인 상태 유지
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-pink-600 hover:text-pink-500">
              비밀번호를 잊으셨나요?
            </a>
          </div>
        </div>

        <div>
          <button type="submit" :disabled="loading" class="btn-primary w-full flex justify-center">
            <svg
              v-if="loading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ loading ? '로그인 중...' : '로그인' }}
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            계정이 없으신가요?
            <router-link to="/register" class="font-medium text-pink-600 hover:text-pink-500">
              회원가입
            </router-link>
          </p>
        </div>
      </form>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import UserLayout from '@/components/UserLayout.vue'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)

const form = reactive({
  email: '',
  password: '',
  rememberMe: false,
})

const handleLogin = async () => {
  loading.value = true

  try {
    await userStore.login(form.email, form.password)
    router.push('/')
  } catch (error) {
    console.error('로그인 실패:', error)
    alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.')
  } finally {
    loading.value = false
  }
}
</script>
