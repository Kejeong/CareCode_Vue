<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import UserLayout from '@/components/UserLayout.vue'

interface ChatMessage {
  id: number
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

interface QuickQuestion {
  id: number
  text: string
  emoji: string
}

const messages = ref<ChatMessage[]>([
  {
    id: 1,
    type: 'bot',
    content: '안녕하세요! 맘편한 챗봇입니다. 육아 관련 궁금한 점이 있으시면 언제든 물어보세요. 건강, 정책, 시설, 교육 등 다양한 정보를 제공해드릴 수 있습니다.',
    timestamp: new Date()
  }
])

const newMessage = ref('')
const isTyping = ref(false)

const quickQuestions: QuickQuestion[] = [
  { id: 1, text: '안녕하세요', emoji: '👋' },
  { id: 2, text: '예방접종 일정 알려줘', emoji: '💉' },
  { id: 3, text: '어린이집 정보 알려줘', emoji: '🏫' },
  { id: 4, text: '육아 지원금 신청 방법', emoji: '💰' },
  { id: 5, text: '아이 발달 단계 알려줘', emoji: '📈' },
  { id: 6, text: '소아과 병원 추천해줘', emoji: '🏥' },
  { id: 7, text: '육아 교육 프로그램', emoji: '📚' },
  { id: 8, text: '감사합니다', emoji: '🙏' }
]

const features = [
  {
    icon: 'shield',
    title: '건강 관리',
    description: '예방접종, 병원, 의사, 약, 증상 등 건강 관련 정보',
    gradient: 'from-blue-400 to-cyan-500'
  },
  {
    icon: 'trending-up',
    title: '정책 정보',
    description: '지원, 보조금, 혜택, 신청, 지원금, 수당 등 정책 정보',
    gradient: 'from-green-400 to-teal-500'
  },
  {
    icon: 'home',
    title: '시설 정보',
    description: '어린이집, 유치원, 보육, 시설, 위치, 주소 등 시설 정보',
    gradient: 'from-purple-400 to-pink-500'
  },
  {
    icon: 'book-open',
    title: '교육 정보',
    description: '교육, 학습, 공부, 프로그램, 강의, 육아, 양육 등 교육 정보',
    gradient: 'from-orange-400 to-red-500'
  }
]

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  // 사용자 메시지 추가
  messages.value.push({
    id: Date.now(),
    type: 'user',
    content: newMessage.value,
    timestamp: new Date()
  })

  const userMessage = newMessage.value
  newMessage.value = ''
  isTyping.value = true

  // 챗봇 응답 시뮬레이션
  setTimeout(() => {
    const botResponse = generateBotResponse(userMessage)
    messages.value.push({
      id: Date.now(),
      type: 'bot',
      content: botResponse,
      timestamp: new Date()
    })
    isTyping.value = false
  }, 1000 + Math.random() * 2000)
}

const sendQuickQuestion = (question: QuickQuestion) => {
  newMessage.value = question.text
  sendMessage()
}

const generateBotResponse = (userMessage: string): string => {
  const responses = {
    '안녕하세요': '안녕하세요! 맘편한 챗봇입니다. 무엇을 도와드릴까요?',
    '예방접종': '예방접종은 아이의 건강을 위해 매우 중요합니다. 출생 후 2개월부터 시작하여 정기적으로 접종해야 합니다. 구체적인 일정은 소아과에서 확인하시는 것이 좋습니다.',
    '어린이집': '어린이집 정보는 시설 검색 페이지에서 확인하실 수 있습니다. 위치, 운영시간, 정원 등을 상세히 안내해드립니다.',
    '지원금': '육아 지원금은 지역마다 다를 수 있습니다. 정책 정보 페이지에서 최신 정보를 확인하시거나, 관할 구청에 문의하시기 바랍니다.',
    '발달': '아이의 발달은 개인차가 있습니다. 월령별 평균 발달 단계를 참고하되, 전문의와 상담하시는 것을 권장합니다.',
    '병원': '소아과 병원은 건강 관리 페이지에서 검색하실 수 있습니다. 위치, 진료시간, 전문 분야 등을 확인할 수 있습니다.',
    '교육': '육아 교육 프로그램은 다양한 기관에서 제공됩니다. 지역 아동센터, 공립 도서관, 문화센터 등을 확인해보세요.',
    '감사합니다': '도움이 되어 기쁩니다! 더 궁금한 점이 있으시면 언제든 물어보세요.'
  }

  for (const [key, response] of Object.entries(responses)) {
    if (userMessage.includes(key)) {
      return response
    }
  }

  return '죄송합니다. 해당 질문에 대한 답변을 준비 중입니다. 다른 질문이 있으시면 언제든 물어보세요!'
}

const clearHistory = () => {
  messages.value = [messages.value[0]] // 초기 메시지만 남김
}
</script>

<template>
  <UserLayout>
      <!-- 페이지 헤더 -->
      <div class="mb-8">
        <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 mb-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-800">육아 챗봇</h1>
              <p class="text-gray-600">육아 관련 궁금증을 언제든 물어보세요. AI가 도와드립니다</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-500 mb-1">24시간</div>
              <div class="text-sm text-gray-600">대응</div>
            </div>
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-pink-500 mb-1">AI 답변</div>
              <div class="text-sm text-gray-600">정확한 정보</div>
            </div>
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-500 mb-1">음성 지원</div>
              <div class="text-sm text-gray-600">편리한 대화</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 챗봇 인터페이스 -->
      <div class="max-w-4xl mx-auto">
        <!-- 챗봇 카드 -->
        <div class="card p-6 mb-6">
          <div class="flex items-center space-x-4 mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold">맘편한 챗봇</h3>
              <p class="text-sm text-gray-500">육아 전문 AI 어시스턴트</p>
            </div>
            <div class="ml-auto">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                온라인
              </span>
            </div>
          </div>

          <!-- 대화 영역 -->
          <div class="space-y-4 mb-6 max-h-96 overflow-y-auto">
            <div v-for="message in messages" :key="message.id" class="flex items-start space-x-3">
              <div v-if="message.type === 'bot'" class="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <div v-if="message.type === 'user'" class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div :class="[
                'rounded-lg p-3 max-w-xs',
                message.type === 'bot' ? 'bg-gray-100' : 'bg-blue-500 text-white ml-auto'
              ]">
                <p class="text-sm">{{ message.content }}</p>
              </div>
            </div>
            
            <!-- 타이핑 인디케이터 -->
            <div v-if="isTyping" class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <div class="bg-gray-100 rounded-lg p-3">
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- 빠른 질문 버튼들 -->
          <div class="mb-4">
            <p class="text-sm text-gray-600 mb-3">자주 묻는 질문:</p>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="question in quickQuestions" 
                :key="question.id"
                @click="sendQuickQuestion(question)"
                class="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
              >
                {{ question.emoji }} {{ question.text }}
              </button>
            </div>
          </div>

          <!-- 입력 영역 -->
          <div class="flex space-x-3">
            <div class="flex-1 relative">
              <input 
                v-model="newMessage"
                @keyup.enter="sendMessage"
                type="text" 
                placeholder="메시지를 입력하세요..." 
                class="input-field w-full pr-12"
              >
              <button @click="sendMessage" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-pink-500">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </button>
            </div>
            <button class="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- 챗봇 기능 소개 -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div v-for="feature in features" :key="feature.title" class="card p-6 text-center">
            <div :class="`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-4`">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="feature.icon === 'shield'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                <path v-else-if="feature.icon === 'trending-up'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                <path v-else-if="feature.icon === 'home'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                <path v-else-if="feature.icon === 'book-open'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h4 class="text-lg font-semibold mb-2">{{ feature.title }}</h4>
            <p class="text-sm text-gray-600">{{ feature.description }}</p>
          </div>
        </div>

        <!-- 대화 히스토리 -->
        <div class="card p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">대화 히스토리</h3>
            <button @click="clearHistory" class="btn-secondary text-sm">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              전체 삭제
            </button>
          </div>
          <div class="space-y-3">
            <div v-for="message in messages.slice(1)" :key="message.id" class="p-3 bg-gray-50 rounded-lg">
              <div class="flex justify-between items-start">
                <p class="text-sm text-gray-700">{{ message.content }}</p>
                <span class="text-xs text-gray-500">{{ message.timestamp.toLocaleTimeString() }}</span>
              </div>
            </div>
          </div>
        </div>
              </div>
  </UserLayout>
</template>
