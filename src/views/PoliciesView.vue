<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import UserLayout from '@/components/UserLayout.vue'

interface Policy {
  id: number
  title: string
  description: string
  category: string
  eligibility: string
  amount: string
  deadline: string
  status: 'available' | 'closed' | 'upcoming'
  tags: string[]
  views: number
  isBookmarked?: boolean
}

interface Category {
  id: string
  name: string
  icon: string
  count: number
}

const policies = ref<Policy[]>([
  {
    id: 1,
    title: '육아수당 신청',
    description: '만 6세 이하 자녀를 양육하는 가정에 월 10만원의 육아수당을 지원합니다.',
    category: 'support',
    eligibility: '만 6세 이하 자녀를 양육하는 가정',
    amount: '월 10만원',
    deadline: '2024년 12월 31일',
    status: 'available',
    tags: ['육아수당', '지원금', '가정'],
    views: 1250
  },
  {
    id: 2,
    title: '어린이집 이용료 지원',
    description: '어린이집 이용료의 일부를 지원하여 부모님의 경제적 부담을 줄여드립니다.',
    category: 'facility',
    eligibility: '어린이집을 이용하는 만 0-5세 자녀 가정',
    amount: '이용료의 50-80%',
    deadline: '상시 신청 가능',
    status: 'available',
    tags: ['어린이집', '이용료', '지원'],
    views: 890
  },
  {
    id: 3,
    title: '다자녀 가정 지원',
    description: '3자녀 이상을 양육하는 가정에 대한 다양한 지원 혜택을 제공합니다.',
    category: 'family',
    eligibility: '3자녀 이상을 양육하는 가정',
    amount: '다양한 혜택',
    deadline: '2024년 6월 30일',
    status: 'available',
    tags: ['다자녀', '가정', '지원'],
    views: 567
  },
  {
    id: 4,
    title: '장애아동 양육 지원',
    description: '장애아동을 양육하는 가정에 대한 특별 지원 프로그램입니다.',
    category: 'special',
    eligibility: '장애아동을 양육하는 가정',
    amount: '월 15만원',
    deadline: '2024년 9월 30일',
    status: 'upcoming',
    tags: ['장애아동', '양육', '지원'],
    views: 234
  },
  {
    id: 5,
    title: '한부모 가정 지원',
    description: '한부모 가정에 대한 종합적인 지원 서비스를 제공합니다.',
    category: 'family',
    eligibility: '한부모 가정',
    amount: '다양한 지원',
    deadline: '상시 신청 가능',
    status: 'available',
    tags: ['한부모', '가정', '지원'],
    views: 678
  }
])

const categories: Category[] = [
  { id: 'all', name: '전체', icon: 'grid', count: policies.value.length },
  { id: 'support', name: '지원금', icon: 'gift', count: policies.value.filter(p => p.category === 'support').length },
  { id: 'facility', name: '시설', icon: 'home', count: policies.value.filter(p => p.category === 'facility').length },
  { id: 'family', name: '가정', icon: 'users', count: policies.value.filter(p => p.category === 'family').length },
  { id: 'special', name: '특별지원', icon: 'heart', count: policies.value.filter(p => p.category === 'special').length }
]

const selectedCategory = ref('all')
const searchQuery = ref('')
const sortBy = ref('latest')
const showPolicyModal = ref(false)
const selectedPolicy = ref<Policy | null>(null)

const filteredPolicies = computed(() => {
  let filtered = policies.value

  // 카테고리 필터링
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(policy => policy.category === selectedCategory.value)
  }

  // 검색 필터링
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(policy => 
      policy.title.toLowerCase().includes(query) ||
      policy.description.toLowerCase().includes(query) ||
      policy.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // 정렬
  switch (sortBy.value) {
    case 'latest':
      filtered.sort((a, b) => b.id - a.id)
      break
    case 'popular':
      filtered.sort((a, b) => b.views - a.views)
      break
    case 'deadline':
      filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      break
  }

  return filtered
})

const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId
}

const toggleBookmark = (policy: Policy) => {
  policy.isBookmarked = !policy.isBookmarked
}

const openPolicyDetail = (policy: Policy) => {
  selectedPolicy.value = policy
  showPolicyModal.value = true
}

const getCategoryName = (categoryId: string) => {
  const category = categories.find(c => c.id === categoryId)
  return category ? category.name : categoryId
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'bg-green-100 text-green-800'
    case 'closed':
      return 'bg-red-100 text-red-800'
    case 'upcoming':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'available':
      return '신청 가능'
    case 'closed':
      return '신청 마감'
    case 'upcoming':
      return '신청 예정'
    default:
      return '알 수 없음'
  }
}

const stats = computed(() => ({
  total: policies.value.length,
  available: policies.value.filter(p => p.status === 'available').length,
  upcoming: policies.value.filter(p => p.status === 'upcoming').length,
  closed: policies.value.filter(p => p.status === 'closed').length
}))
</script>

<template>
  <UserLayout>
      <!-- 페이지 헤더 -->
      <div class="mb-8">
        <div class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 mb-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-800">정책 정보</h1>
              <p class="text-gray-600">육아 관련 정책과 지원 정보를 확인하고 신청할 수 있습니다</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-yellow-500 mb-1">최신 정책</div>
              <div class="text-sm text-gray-600">실시간 업데이트</div>
            </div>
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-orange-500 mb-1">지원 정보</div>
              <div class="text-sm text-gray-600">다양한 혜택</div>
            </div>
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-500 mb-1">신청 가이드</div>
              <div class="text-sm text-gray-600">쉬운 신청</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 정책 요약 카드 -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card p-6 text-center">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <div class="text-2xl font-bold text-blue-500 mb-2">{{ stats.total }}</div>
          <div class="text-gray-600">전체 정책</div>
        </div>
        <div class="card p-6 text-center">
          <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="text-2xl font-bold text-green-500 mb-2">{{ stats.available }}</div>
          <div class="text-gray-600">신청 가능</div>
        </div>
        <div class="card p-6 text-center">
          <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="text-2xl font-bold text-yellow-500 mb-2">{{ stats.upcoming }}</div>
          <div class="text-gray-600">신청 예정</div>
        </div>
        <div class="card p-6 text-center">
          <div class="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <div class="text-2xl font-bold text-red-500 mb-2">{{ stats.closed }}</div>
          <div class="text-gray-600">신청 마감</div>
        </div>
      </div>

      <!-- 카테고리 탭 -->
      <div class="card p-6 mb-8">
        <div class="flex flex-wrap gap-3">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="selectCategory(category.id)"
            :class="[
              'flex items-center px-4 py-2 rounded-lg transition-all duration-200',
              selectedCategory === category.id 
                ? 'bg-yellow-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="category.icon === 'grid'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              <path v-else-if="category.icon === 'gift'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
              <path v-else-if="category.icon === 'home'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              <path v-else-if="category.icon === 'users'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              <path v-else-if="category.icon === 'heart'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            {{ category.name }}
            <span class="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">{{ category.count }}</span>
          </button>
        </div>
      </div>

      <!-- 검색 및 정렬 -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="정책을 검색하세요..." 
              class="input-field pl-10 pr-4 w-64"
            >
            <svg class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <select v-model="sortBy" class="input-field">
            <option value="latest">최신순</option>
            <option value="popular">인기순</option>
            <option value="deadline">마감순</option>
          </select>
        </div>
      </div>

      <!-- 정책 목록 -->
      <div class="space-y-4">
        <div v-for="policy in filteredPolicies" :key="policy.id" class="card p-6 hover:shadow-lg transition-shadow cursor-pointer" @click="openPolicyDetail(policy)">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <h3 class="text-lg font-semibold text-gray-800">{{ policy.title }}</h3>
                <span :class="`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`">
                  {{ getStatusText(policy.status) }}
                </span>
              </div>
              <p class="text-gray-600 mb-3">{{ policy.description }}</p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span class="font-medium text-gray-700">지원 대상:</span>
                  <p class="text-gray-600">{{ policy.eligibility }}</p>
                </div>
                <div>
                  <span class="font-medium text-gray-700">지원 금액:</span>
                  <p class="text-gray-600">{{ policy.amount }}</p>
                </div>
                <div>
                  <span class="font-medium text-gray-700">신청 마감:</span>
                  <p class="text-gray-600">{{ policy.deadline }}</p>
                </div>
              </div>
            </div>
            <button @click.stop="toggleBookmark(policy)" class="flex items-center space-x-1 text-gray-500 hover:text-yellow-500 ml-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
              </svg>
            </button>
          </div>
          
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4 text-sm text-gray-500">
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                {{ policy.views }}
              </span>
            </div>
            <div class="flex flex-wrap gap-1">
              <span v-for="tag in policy.tags.slice(0, 3)" :key="tag" class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                #{{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 정책이 없을 때 -->
      <div v-if="filteredPolicies.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">해당하는 정책이 없습니다</h3>
        <p class="text-gray-500">다른 검색어나 카테고리를 시도해보세요.</p>
      </div>

    <!-- 정책 상세 모달 -->
    <div v-if="showPolicyModal && selectedPolicy" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" @click="showPolicyModal = false">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex justify-between items-start mb-6">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="text-2xl font-bold text-gray-800">{{ selectedPolicy.title }}</h3>
                  <span :class="`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedPolicy.status)}`">
                    {{ getStatusText(selectedPolicy.status) }}
                  </span>
                </div>
                <p class="text-gray-600 text-lg mb-4">{{ selectedPolicy.description }}</p>
              </div>
              <button @click="showPolicyModal = false" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="font-semibold text-gray-800 mb-2">지원 대상</h4>
                <p class="text-gray-600">{{ selectedPolicy.eligibility }}</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="font-semibold text-gray-800 mb-2">지원 금액</h4>
                <p class="text-gray-600">{{ selectedPolicy.amount }}</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="font-semibold text-gray-800 mb-2">신청 마감</h4>
                <p class="text-gray-600">{{ selectedPolicy.deadline }}</p>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="font-semibold text-gray-800 mb-2">조회수</h4>
                <p class="text-gray-600">{{ selectedPolicy.views }}회</p>
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in selectedPolicy.tags" :key="tag" class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                  #{{ tag }}
                </span>
              </div>
              <button class="btn-primary">
                신청하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
