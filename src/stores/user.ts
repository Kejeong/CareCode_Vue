import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: number
  name: string
  email: string
  role: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = ref(false)

  // Mock 로그인 함수
  const login = async (email: string, password: string) => {
    // 실제로는 API 호출을 해야 하지만, 여기서는 Mock 데이터를 사용
    if (email === 'test@example.com' && password === 'password') {
      user.value = {
        id: 1,
        name: '테스트 사용자',
        email: email,
        role: 'USER',
      }
      isLoggedIn.value = true
      localStorage.setItem('user', JSON.stringify(user.value))
    } else {
      throw new Error('로그인 정보가 올바르지 않습니다.')
    }
  }

  // Mock 회원가입 함수
  const register = async (name: string, email: string, password: string) => {
    // 실제로는 API 호출을 해야 하지만, 여기서는 Mock 데이터를 사용
    user.value = {
      id: Date.now(),
      name: name,
      email: email,
      role: 'USER',
    }
    isLoggedIn.value = true
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  // 로그아웃 함수
  const logout = () => {
    user.value = null
    isLoggedIn.value = false
    localStorage.removeItem('user')
  }

  // 페이지 로드 시 저장된 사용자 정보 복원
  const initializeUser = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
      isLoggedIn.value = true
    }
  }

  return {
    user,
    isLoggedIn,
    login,
    register,
    logout,
    initializeUser,
  }
})
