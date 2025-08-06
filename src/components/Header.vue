<template>
  <header class="header text-white">
    <div class="container mx-auto px-4 py-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span class="text-pink-600 font-bold text-lg">맘</span>
            </div>
            <span class="text-xl font-bold">맘편한</span>
          </router-link>
          <p class="text-xs opacity-90">육아 정보 플랫폼</p>
        </div>

        <nav class="hidden md:flex items-center space-x-8">
          <router-link
            to="/facilities"
            class="nav-item"
            :class="{ active: $route.path === '/facilities' }"
          >
            육아시설
          </router-link>
          <router-link
            to="/community"
            class="nav-item"
            :class="{ active: $route.path === '/community' }"
          >
            커뮤니티
          </router-link>
          <router-link to="/health" class="nav-item" :class="{ active: $route.path === '/health' }">
            건강관리
          </router-link>
          <router-link
            to="/policies"
            class="nav-item"
            :class="{ active: $route.path === '/policies' }"
          >
            정책정보
          </router-link>
          <router-link
            to="/chatbot"
            class="nav-item"
            :class="{ active: $route.path === '/chatbot' }"
          >
            챗봇
          </router-link>
        </nav>

        <div class="flex items-center space-x-4">
          <div v-if="userStore.isLoggedIn" class="flex items-center space-x-2">
            <span class="text-sm">{{ userStore.user?.name || '사용자' }}</span>
            <button
              @click="logout"
              class="btn-secondary text-white border-white hover:bg-white hover:text-red-500"
            >
              로그아웃
            </button>
          </div>
          <div v-else class="flex items-center space-x-2">
            <button
              @click="showLoginModal = true"
              class="btn-secondary text-white border-white hover:bg-white hover:text-pink-500"
            >
              로그인
            </button>
            <button @click="showRegisterModal = true" class="btn-primary">회원가입</button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- 로그인 모달 -->
  <div
    v-if="showLoginModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-xl p-8 w-full max-w-md">
      <h3 class="text-2xl font-bold mb-6 text-center">로그인</h3>
      <form @submit.prevent="login">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">이메일</label>
            <input v-model="loginForm.email" type="email" class="input-field" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
            <input v-model="loginForm.password" type="password" class="input-field" required />
          </div>
          <button type="submit" class="btn-primary w-full">로그인</button>
        </div>
      </form>
      <button @click="showLoginModal = false" class="mt-4 text-gray-500 hover:text-gray-700">
        취소
      </button>
    </div>
  </div>

  <!-- 회원가입 모달 -->
  <div
    v-if="showRegisterModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-xl p-8 w-full max-w-md">
      <h3 class="text-2xl font-bold mb-6 text-center">회원가입</h3>
      <form @submit.prevent="register">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">이름</label>
            <input v-model="registerForm.name" type="text" class="input-field" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">이메일</label>
            <input v-model="registerForm.email" type="email" class="input-field" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
            <input v-model="registerForm.password" type="password" class="input-field" required />
          </div>
          <button type="submit" class="btn-primary w-full">회원가입</button>
        </div>
      </form>
      <button @click="showRegisterModal = false" class="mt-4 text-gray-500 hover:text-gray-700">
        취소
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const showLoginModal = ref(false)
const showRegisterModal = ref(false)

const loginForm = reactive({
  email: '',
  password: '',
})

const registerForm = reactive({
  name: '',
  email: '',
  password: '',
})

const login = async () => {
  try {
    await userStore.login(loginForm.email, loginForm.password)
    showLoginModal.value = false
    loginForm.email = ''
    loginForm.password = ''
  } catch (error) {
    console.error('로그인 실패:', error)
  }
}

const register = async () => {
  try {
    await userStore.register(registerForm.name, registerForm.email, registerForm.password)
    showRegisterModal.value = false
    registerForm.name = ''
    registerForm.email = ''
    registerForm.password = ''
  } catch (error) {
    console.error('회원가입 실패:', error)
  }
}

const logout = () => {
  userStore.logout()
}
</script>
