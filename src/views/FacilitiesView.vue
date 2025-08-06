<template>
  <UserLayout>
      <!-- 페이지 헤더 -->
      <div class="mb-8">
        <div class="bg-gradient-to-r from-pink-50 to-blue-50 rounded-2xl p-8 mb-6">
          <div class="flex items-center mb-4">
            <div
              class="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mr-4"
            >
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-800">육아시설 찾기</h1>
              <p class="text-gray-600">근처 육아시설을 찾고 예약하세요</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-pink-500 mb-1">500+</div>
              <div class="text-sm text-gray-600">등록된 시설</div>
            </div>
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-500 mb-1">4.8</div>
              <div class="text-sm text-gray-600">평균 평점</div>
            </div>
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-500 mb-1">24시간</div>
              <div class="text-sm text-gray-600">실시간 예약</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 검색 필터 -->
      <div class="card p-8 mb-8">
        <div class="flex items-center mb-6">
          <svg class="w-5 h-5 text-pink-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clip-rule="evenodd"
            />
          </svg>
          <h3 class="text-xl font-semibold text-gray-800">검색 조건</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 flex items-center">
              <svg class="w-4 h-4 mr-1 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                />
              </svg>
              지역
            </label>
            <select v-model="filters.location" class="input-field">
              <option value="">전체 지역</option>
              <option value="서울">서울</option>
              <option value="부산">부산</option>
              <option value="대구">대구</option>
              <option value="인천">인천</option>
              <option value="광주">광주</option>
              <option value="대전">대전</option>
              <option value="울산">울산</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 flex items-center">
              <svg class="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              시설 유형
            </label>
            <select v-model="filters.type" class="input-field">
              <option value="">전체 유형</option>
              <option value="어린이집">어린이집</option>
              <option value="유치원">유치원</option>
              <option value="놀이방">놀이방</option>
              <option value="육아지원센터">육아지원센터</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 flex items-center">
              <svg class="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              평점
            </label>
            <select v-model="filters.rating" class="input-field">
              <option value="">전체 평점</option>
              <option value="4.5">4.5점 이상</option>
              <option value="4.0">4.0점 이상</option>
              <option value="3.5">3.5점 이상</option>
              <option value="3.0">3.0점 이상</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 flex items-center">
              <svg class="w-4 h-4 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                />
              </svg>
              운영시간
            </label>
            <select v-model="filters.operatingHours" class="input-field">
              <option value="">전체 시간</option>
              <option value="full">종일반</option>
              <option value="half">반일반</option>
              <option value="extended">연장반</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end mt-6">
          <button @click="resetFilters" class="btn-secondary mr-4">초기화</button>
          <button @click="searchFacilities" class="btn-primary">검색</button>
        </div>
      </div>

      <!-- 검색 결과 -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-gray-800">
            검색 결과 ({{ filteredFacilities.length }}개)
          </h3>
          <div class="flex items-center space-x-4">
            <select v-model="sortBy" class="input-field w-48">
              <option value="rating">평점순</option>
              <option value="distance">거리순</option>
              <option value="name">이름순</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="facility in filteredFacilities"
            :key="facility.id"
            class="card p-6 transform hover:scale-105 transition-all duration-200 cursor-pointer"
            @click="showFacilityDetail(facility)"
          >
            <div class="relative mb-4">
              <div
                class="w-full h-48 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center"
              >
                <svg class="w-16 h-16 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div
                class="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-semibold text-pink-600"
              >
                {{ facility.type }}
              </div>
            </div>

            <h4 class="text-xl font-semibold mb-2">{{ facility.name }}</h4>
            <p class="text-gray-600 mb-3">{{ facility.address }}</p>

            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <div class="flex text-yellow-400">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    class="w-4 h-4"
                    :class="i <= facility.rating ? 'text-yellow-400' : 'text-gray-300'"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
                <span class="ml-2 text-sm text-gray-600">{{ facility.rating }}/5</span>
              </div>
              <span class="text-sm text-gray-500">{{ facility.distance }}km</span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">{{ facility.operatingHours }}</span>
              <button class="btn-primary text-sm px-4 py-2">예약하기</button>
            </div>
          </div>
        </div>
      </div>
    <!-- 시설 상세 모달 -->
    <div
      v-if="selectedFacility"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-start mb-6">
          <h3 class="text-2xl font-bold">{{ selectedFacility.name }}</h3>
          <button @click="selectedFacility = null" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div class="space-y-6">
          <div>
            <h4 class="font-semibold mb-2">기본 정보</h4>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-500">주소:</span>
                <p>{{ selectedFacility.address }}</p>
              </div>
              <div>
                <span class="text-gray-500">전화번호:</span>
                <p>{{ selectedFacility.phone }}</p>
              </div>
              <div>
                <span class="text-gray-500">운영시간:</span>
                <p>{{ selectedFacility.operatingHours }}</p>
              </div>
              <div>
                <span class="text-gray-500">시설 유형:</span>
                <p>{{ selectedFacility.type }}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 class="font-semibold mb-2">평점 및 리뷰</h4>
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400 mr-2">
                <svg
                  v-for="i in 5"
                  :key="i"
                  class="w-5 h-5"
                  :class="i <= selectedFacility.rating ? 'text-yellow-400' : 'text-gray-300'"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
              <span class="text-lg font-semibold">{{ selectedFacility.rating }}/5</span>
              <span class="text-gray-500 ml-2">({{ selectedFacility.reviewCount }}개 리뷰)</span>
            </div>
          </div>

          <div>
            <h4 class="font-semibold mb-2">시설 특징</h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="feature in selectedFacility.features"
                :key="feature"
                class="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm"
              >
                {{ feature }}
              </span>
            </div>
          </div>

          <div class="flex space-x-4">
            <button class="btn-primary flex-1">예약하기</button>
            <button class="btn-secondary flex-1">문의하기</button>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import UserLayout from '@/components/UserLayout.vue'

interface Facility {
  id: number
  name: string
  type: string
  address: string
  phone: string
  rating: number
  distance: number
  operatingHours: string
  reviewCount: number
  features: string[]
}

const facilities = ref<Facility[]>([])
const selectedFacility = ref<Facility | null>(null)
const sortBy = ref('rating')

const filters = reactive({
  location: '',
  type: '',
  rating: '',
  operatingHours: '',
})

// Mock 데이터
const mockFacilities: Facility[] = [
  {
    id: 1,
    name: '행복한 어린이집',
    type: '어린이집',
    address: '서울 강남구 테헤란로 123',
    phone: '02-1234-5678',
    rating: 4.8,
    distance: 0.5,
    operatingHours: '07:30-18:30',
    reviewCount: 45,
    features: ['야외놀이터', '영어교육', '미술교육', '음악교육'],
  },
  {
    id: 2,
    name: '사랑나무 유치원',
    type: '유치원',
    address: '서울 서초구 서초대로 456',
    phone: '02-2345-6789',
    rating: 4.6,
    distance: 1.2,
    operatingHours: '09:00-17:00',
    reviewCount: 32,
    features: ['자연친화', '체육교육', '독서교육'],
  },
  {
    id: 3,
    name: '꿈나무 놀이방',
    type: '놀이방',
    address: '서울 송파구 올림픽로 789',
    phone: '02-3456-7890',
    rating: 4.4,
    distance: 2.1,
    operatingHours: '10:00-19:00',
    reviewCount: 28,
    features: ['실내놀이터', '창작활동', '사회성발달'],
  },
  {
    id: 4,
    name: '미래의 아이들',
    type: '어린이집',
    address: '서울 마포구 홍대로 321',
    phone: '02-4567-8901',
    rating: 4.9,
    distance: 0.8,
    operatingHours: '07:00-19:00',
    reviewCount: 67,
    features: ['영양관리', '안전교육', '창의교육', '다문화교육'],
  },
  {
    id: 5,
    name: '자연친화 유치원',
    type: '유치원',
    address: '서울 성동구 왕십리로 654',
    phone: '02-5678-9012',
    rating: 4.7,
    distance: 1.5,
    operatingHours: '08:30-17:30',
    reviewCount: 41,
    features: ['자연체험', '생태교육', '농작물재배'],
  },
  {
    id: 6,
    name: '창의력 놀이방',
    type: '놀이방',
    address: '서울 강서구 화곡로 987',
    phone: '02-6789-0123',
    rating: 4.3,
    distance: 3.2,
    operatingHours: '09:30-18:30',
    reviewCount: 23,
    features: ['창작활동', '과학실험', '예술교육'],
  },
]

const filteredFacilities = computed(() => {
  let filtered = [...facilities.value]

  if (filters.location) {
    filtered = filtered.filter((f) => f.address.includes(filters.location))
  }

  if (filters.type) {
    filtered = filtered.filter((f) => f.type === filters.type)
  }

  if (filters.rating) {
    filtered = filtered.filter((f) => f.rating >= parseFloat(filters.rating))
  }

  if (filters.operatingHours) {
    filtered = filtered.filter((f) => {
      if (filters.operatingHours === 'full')
        return f.operatingHours.includes('07') || f.operatingHours.includes('08')
      if (filters.operatingHours === 'half') return f.operatingHours.includes('09')
      if (filters.operatingHours === 'extended') return f.operatingHours.includes('19')
      return true
    })
  }

  // 정렬
  filtered.sort((a, b) => {
    if (sortBy.value === 'rating') return b.rating - a.rating
    if (sortBy.value === 'distance') return a.distance - b.distance
    if (sortBy.value === 'name') return a.name.localeCompare(b.name)
    return 0
  })

  return filtered
})

const searchFacilities = () => {
  // 실제로는 API 호출을 해야 하지만, 여기서는 Mock 데이터를 사용
  console.log('검색 조건:', filters)
}

const resetFilters = () => {
  filters.location = ''
  filters.type = ''
  filters.rating = ''
  filters.operatingHours = ''
}

const showFacilityDetail = (facility: Facility) => {
  selectedFacility.value = facility
}

onMounted(() => {
  facilities.value = mockFacilities
})
</script>
