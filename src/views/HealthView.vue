<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import UserLayout from '@/components/UserLayout.vue'

interface Child {
  id: number
  name: string
  gender: 'MALE' | 'FEMALE'
  birthDate: string
  birthHeight: number
  birthWeight: number
  age: string
  currentHeight: number
  currentWeight: number
  lastRecord: string
}

interface HealthRecord {
  id: number
  childId: number
  recordType: string
  recordDate: string
  title: string
  content: string
  height?: number
  weight?: number
  attachment?: string
}

interface Hospital {
  id: number
  name: string
  address: string
  phone: string
  distance: number
  rating: number
  specialties: string[]
}

const selectedChild = ref<Child | null>(null)
const showAddChildModal = ref(false)
const showAddHealthRecordModal = ref(false)
const showViewHistoryModal = ref(false)

const children = ref<Child[]>([
  {
    id: 1,
    name: '김민수',
    gender: 'MALE',
    birthDate: '2022-03-15',
    birthHeight: 50.5,
    birthWeight: 3.2,
    age: '2세 5개월',
    currentHeight: 85.2,
    currentWeight: 12.5,
    lastRecord: '2024-08-06'
  },
  {
    id: 2,
    name: '이소영',
    gender: 'FEMALE',
    birthDate: '2023-07-22',
    birthHeight: 48.3,
    birthWeight: 2.9,
    age: '1세 1개월',
    currentHeight: 72.8,
    currentWeight: 8.3,
    lastRecord: '2024-08-05'
  }
])

const healthRecords = ref<HealthRecord[]>([
  {
    id: 1,
    childId: 1,
    recordType: 'HEIGHT',
    recordDate: '2024-08-06',
    title: '키 측정',
    content: '정기 키 측정 결과입니다.',
    height: 85.2
  },
  {
    id: 2,
    childId: 1,
    recordType: 'WEIGHT',
    recordDate: '2024-08-06',
    title: '몸무게 측정',
    content: '정기 몸무게 측정 결과입니다.',
    weight: 12.5
  },
  {
    id: 3,
    childId: 1,
    recordType: 'VACCINATION',
    recordDate: '2024-07-15',
    title: 'MMR 예방접종',
    content: 'MMR(홍역, 볼거리, 풍진) 예방접종을 완료했습니다.',
  },
  {
    id: 4,
    childId: 2,
    recordType: 'CHECKUP',
    recordDate: '2024-08-05',
    title: '1세 건강검진',
    content: '1세 건강검진을 완료했습니다. 모든 항목 정상입니다.',
    height: 72.8,
    weight: 8.3
  }
])

const nearbyHospitals = ref<Hospital[]>([
  {
    id: 1,
    name: '서울아동병원',
    address: '서울 강남구 테헤란로 123',
    phone: '02-1234-5678',
    distance: 0.8,
    rating: 4.8,
    specialties: ['소아과', '소아외과', '소아정신과']
  },
  {
    id: 2,
    name: '맘편한소아과',
    address: '서울 강남구 역삼동 456',
    phone: '02-2345-6789',
    distance: 1.2,
    rating: 4.6,
    specialties: ['소아과', '소아내과']
  },
  {
    id: 3,
    name: '행복한아이병원',
    address: '서울 강남구 삼성동 789',
    phone: '02-3456-7890',
    distance: 2.1,
    rating: 4.7,
    specialties: ['소아과', '소아외과', '소아정신과', '소아재활의학과']
  }
])

const addChildForm = reactive({
  name: '',
  gender: '',
  birthDate: '',
  birthHeight: '',
  birthWeight: ''
})

const addHealthRecordForm = reactive({
  recordType: '',
  recordDate: '',
  title: '',
  content: '',
  height: '',
  weight: '',
  attachment: null as File | null
})

const filteredRecords = computed(() => {
  if (!selectedChild.value) return []
  return healthRecords.value.filter(record => record.childId === selectedChild.value!.id)
})

const selectChild = (child: Child) => {
  selectedChild.value = child
}

const addChild = () => {
  const newChild: Child = {
    id: children.value.length + 1,
    name: addChildForm.name,
    gender: addChildForm.gender as 'MALE' | 'FEMALE',
    birthDate: addChildForm.birthDate,
    birthHeight: parseFloat(addChildForm.birthHeight),
    birthWeight: parseFloat(addChildForm.birthWeight),
    age: '0세 0개월', // 실제로는 계산 필요
    currentHeight: parseFloat(addChildForm.birthHeight),
    currentWeight: parseFloat(addChildForm.birthWeight),
    lastRecord: new Date().toISOString().split('T')[0]
  }
  
  children.value.push(newChild)
  selectedChild.value = newChild
  showAddChildModal.value = false
  
  // 폼 초기화
  Object.keys(addChildForm).forEach(key => {
    (addChildForm as any)[key] = ''
  })
}

const addHealthRecord = () => {
  if (!selectedChild.value) return
  
  const newRecord: HealthRecord = {
    id: healthRecords.value.length + 1,
    childId: selectedChild.value.id,
    recordType: addHealthRecordForm.recordType,
    recordDate: addHealthRecordForm.recordDate,
    title: addHealthRecordForm.title,
    content: addHealthRecordForm.content,
    height: addHealthRecordForm.height ? parseFloat(addHealthRecordForm.height) : undefined,
    weight: addHealthRecordForm.weight ? parseFloat(addHealthRecordForm.weight) : undefined
  }
  
  healthRecords.value.push(newRecord)
  showAddHealthRecordModal.value = false
  
  // 폼 초기화
  Object.keys(addHealthRecordForm).forEach(key => {
    if (key !== 'attachment') {
      (addHealthRecordForm as any)[key] = ''
    }
  })
  addHealthRecordForm.attachment = null
}

const getRecordTypeName = (type: string) => {
  const typeMap: { [key: string]: string } = {
    'HEIGHT': '키',
    'WEIGHT': '몸무게',
    'VACCINATION': '예방접종',
    'CHECKUP': '건강검진',
    'ILLNESS': '질병',
    'MEDICATION': '투약',
    'OTHER': '기타'
  }
  return typeMap[type] || type
}

const getRecordTypeColor = (type: string) => {
  const colorMap: { [key: string]: string } = {
    'HEIGHT': 'bg-blue-100 text-blue-800',
    'WEIGHT': 'bg-green-100 text-green-800',
    'VACCINATION': 'bg-yellow-100 text-yellow-800',
    'CHECKUP': 'bg-purple-100 text-purple-800',
    'ILLNESS': 'bg-red-100 text-red-800',
    'MEDICATION': 'bg-orange-100 text-orange-800',
    'OTHER': 'bg-gray-100 text-gray-800'
  }
  return colorMap[type] || 'bg-gray-100 text-gray-800'
}

onMounted(() => {
  if (children.value.length > 0) {
    selectedChild.value = children.value[0]
  }
})
</script>

<template>
  <UserLayout>
    <!-- 페이지 헤더 -->
    <div class="mb-8">
      <div class="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8 mb-6">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mr-4">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-800">건강 관리</h1>
            <p class="text-gray-600">아이의 건강 정보를 체계적으로 관리하고 성장을 추적해보세요</p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-green-500 mb-1">건강 기록</div>
            <div class="text-sm text-gray-600">체계적 관리</div>
          </div>
          <div class="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-teal-500 mb-1">성장 추적</div>
            <div class="text-sm text-gray-600">발달 과정</div>
          </div>
          <div class="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-purple-500 mb-1">병원 정보</div>
            <div class="text-sm text-gray-600">근처 병원</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 대시보드 섹션 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- 아이 선택 카드 -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold mb-4">아이 선택</h3>
        <select v-model="selectedChild" class="input-field w-full mb-4" @change="selectedChild && selectChild(selectedChild)">
          <option :value="null">아이를 선택하세요</option>
          <option v-for="child in children" :key="child.id" :value="child">
            {{ child.name }} ({{ child.age }})
          </option>
        </select>
        <button @click="showAddChildModal = true" class="btn-primary w-full">
          <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          아이 추가
        </button>
      </div>

      <!-- 건강 요약 카드 -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold mb-4">건강 요약</h3>
        <div v-if="selectedChild" class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">나이</span>
            <span class="font-semibold">{{ selectedChild.age }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">키</span>
            <span class="font-semibold">{{ selectedChild.currentHeight }}cm</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">몸무게</span>
            <span class="font-semibold">{{ selectedChild.currentWeight }}kg</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">최근 기록</span>
            <span class="font-semibold">{{ selectedChild.lastRecord }}</span>
          </div>
        </div>
        <div v-else class="text-center text-gray-500 py-4">
          아이를 선택해주세요
        </div>
      </div>

      <!-- 빠른 액션 카드 -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold mb-4">빠른 액션</h3>
        <div class="space-y-3">
          <button @click="showAddHealthRecordModal = true" class="btn-primary w-full" :disabled="!selectedChild">
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            건강 기록 추가
          </button>
          <button @click="showAddHealthRecordModal = true" class="btn-secondary w-full" :disabled="!selectedChild">
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>
            </svg>
            성장 기록 추가
          </button>
          <button @click="showViewHistoryModal = true" class="btn-secondary w-full" :disabled="!selectedChild">
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            기록 히스토리
          </button>
        </div>
      </div>
    </div>

    <!-- 차트 섹션 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- 성장 차트 -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold mb-4">성장 추이</h3>
        <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div class="text-center text-gray-500">
            <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <p>차트 기능은 곧 업데이트될 예정입니다</p>
          </div>
        </div>
      </div>

      <!-- 건강 기록 차트 -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold mb-4">건강 기록</h3>
        <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div class="text-center text-gray-500">
            <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <p>차트 기능은 곧 업데이트될 예정입니다</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 최근 기록 섹션 -->
    <div class="card p-6 mb-8">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold">최근 건강 기록</h3>
        <button @click="showViewHistoryModal = true" class="btn-secondary" :disabled="!selectedChild">
          전체 보기
        </button>
      </div>
      <div v-if="selectedChild && filteredRecords.length > 0" class="space-y-4">
        <div v-for="record in filteredRecords.slice(0, 5)" :key="record.id" class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center space-x-2">
              <span :class="`px-2 py-1 rounded-full text-xs font-medium ${getRecordTypeColor(record.recordType)}`">
                {{ getRecordTypeName(record.recordType) }}
              </span>
              <span class="text-sm text-gray-500">{{ record.recordDate }}</span>
            </div>
            <div class="flex items-center space-x-2 text-sm text-gray-500">
              <span v-if="record.height">{{ record.height }}cm</span>
              <span v-if="record.weight">{{ record.weight }}kg</span>
            </div>
          </div>
          <h4 class="font-semibold text-gray-800 mb-1">{{ record.title }}</h4>
          <p class="text-gray-600 text-sm">{{ record.content }}</p>
        </div>
      </div>
      <div v-else-if="selectedChild" class="text-center py-8 text-gray-500">
        <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <p>아직 건강 기록이 없습니다</p>
      </div>
      <div v-else class="text-center py-8 text-gray-500">
        <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
        <p>아이를 선택해주세요</p>
      </div>
    </div>

    <!-- 병원 정보 섹션 -->
    <div class="card p-6 mb-8">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold">근처 병원</h3>
        <button class="btn-primary">
          <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          병원 찾기
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="hospital in nearbyHospitals" :key="hospital.id" class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-2">
            <h4 class="font-semibold text-gray-800">{{ hospital.name }}</h4>
            <div class="flex items-center space-x-1">
              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span class="text-sm font-medium">{{ hospital.rating }}</span>
            </div>
          </div>
          <p class="text-sm text-gray-600 mb-2">{{ hospital.address }}</p>
          <p class="text-sm text-gray-500 mb-3">{{ hospital.phone }}</p>
          <div class="flex items-center justify-between">
            <div class="flex flex-wrap gap-1">
              <span v-for="specialty in hospital.specialties.slice(0, 2)" :key="specialty" class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {{ specialty }}
              </span>
            </div>
            <span class="text-sm text-gray-500">{{ hospital.distance }}km</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 아이 추가 모달 -->
    <div v-if="showAddChildModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" @click="showAddChildModal = false">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-bold">아이 추가</h3>
              <button @click="showAddChildModal = false" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <form @submit.prevent="addChild" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">이름</label>
                <input v-model="addChildForm.name" type="text" class="input-field w-full" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">성별</label>
                <select v-model="addChildForm.gender" class="input-field w-full" required>
                  <option value="">성별 선택</option>
                  <option value="MALE">남자</option>
                  <option value="FEMALE">여자</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">생년월일</label>
                <input v-model="addChildForm.birthDate" type="date" class="input-field w-full" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">출생 시 키 (cm)</label>
                <input v-model="addChildForm.birthHeight" type="number" class="input-field w-full" step="0.1">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">출생 시 몸무게 (kg)</label>
                <input v-model="addChildForm.birthWeight" type="number" class="input-field w-full" step="0.1">
              </div>
              <div class="flex space-x-4">
                <button type="submit" class="btn-primary flex-1">추가하기</button>
                <button type="button" @click="showAddChildModal = false" class="btn-secondary flex-1">취소</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- 건강 기록 추가 모달 -->
    <div v-if="showAddHealthRecordModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" @click="showAddHealthRecordModal = false">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-bold">건강 기록 추가</h3>
              <button @click="showAddHealthRecordModal = false" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <form @submit.prevent="addHealthRecord" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">기록 유형</label>
                  <select v-model="addHealthRecordForm.recordType" class="input-field w-full" required>
                    <option value="">유형 선택</option>
                    <option value="HEIGHT">키</option>
                    <option value="WEIGHT">몸무게</option>
                    <option value="VACCINATION">예방접종</option>
                    <option value="CHECKUP">건강검진</option>
                    <option value="ILLNESS">질병</option>
                    <option value="MEDICATION">투약</option>
                    <option value="OTHER">기타</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">기록 날짜</label>
                  <input v-model="addHealthRecordForm.recordDate" type="date" class="input-field w-full" required>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">키 (cm)</label>
                  <input v-model="addHealthRecordForm.height" type="number" class="input-field w-full" step="0.1">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">몸무게 (kg)</label>
                  <input v-model="addHealthRecordForm.weight" type="number" class="input-field w-full" step="0.1">
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">제목</label>
                <input v-model="addHealthRecordForm.title" type="text" class="input-field w-full" required>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">내용</label>
                <textarea v-model="addHealthRecordForm.content" class="input-field w-full" rows="4" required></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">첨부 파일</label>
                <input type="file" class="input-field w-full" accept="image/*,.pdf">
              </div>
              
              <div class="flex space-x-4">
                <button type="submit" class="btn-primary">등록하기</button>
                <button type="button" @click="showAddHealthRecordModal = false" class="btn-secondary">취소</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>
