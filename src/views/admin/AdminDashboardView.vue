<template>
  <AdminLayout>
      <h1 class="text-4xl font-bold mb-10 text-blue-300 flex items-center">
        <svg class="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
        </svg>
        관리자 대시보드
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div
          class="bg-gradient-to-br from-blue-700 to-blue-500 rounded-xl p-6 shadow text-center transform hover:scale-105 transition duration-200"
        >
          <div class="flex justify-center mb-2">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="text-lg font-semibold text-gray-200">사용자</div>
          <div class="text-4xl font-bold text-white animate-pulse">{{ dashboard.userCount }}</div>
        </div>

        <div
          class="bg-gradient-to-br from-green-700 to-green-500 rounded-xl p-6 shadow text-center transform hover:scale-105 transition duration-200"
        >
          <div class="flex justify-center mb-2">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="text-lg font-semibold text-gray-200">병원</div>
          <div class="text-4xl font-bold text-white animate-pulse">
            {{ dashboard.hospitalCount }}
          </div>
        </div>

        <div
          class="bg-gradient-to-br from-purple-700 to-purple-500 rounded-xl p-6 shadow text-center transform hover:scale-105 transition duration-200"
        >
          <div class="flex justify-center mb-2">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="text-lg font-semibold text-gray-200">정책</div>
          <div class="text-4xl font-bold text-white animate-pulse">{{ dashboard.policyCount }}</div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- 최근 활동 -->
        <div class="bg-gray-800 rounded-lg p-6 shadow">
          <div class="flex items-center mb-4">
            <svg class="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-lg font-bold">최근 활동</span>
          </div>
          <ul class="divide-y divide-gray-700">
            <li
              v-for="activity in dashboard.recentActivities"
              :key="activity.id"
              class="py-2 flex items-center"
            >
              <svg
                :class="getActivityIconClass(activity.type)"
                class="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  v-if="activity.type === 'user'"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  v-else-if="activity.type === 'hospital'"
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                />
                <path
                  v-else-if="activity.type === 'policy'"
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clip-rule="evenodd"
                />
                <path
                  v-else
                  d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                />
              </svg>
              <span class="flex-1">{{ activity.desc }}</span>
              <span class="text-xs text-gray-400">{{ activity.time }}</span>
            </li>
            <li v-if="dashboard.recentActivities.length === 0" class="py-2 text-gray-400">
              최근 활동 내역이 없습니다.
            </li>
          </ul>
        </div>

        <!-- 통계/그래프 예시 -->
        <div class="bg-gray-800 rounded-lg p-6 shadow">
          <div class="flex items-center mb-4">
            <svg class="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-lg font-bold">가입자 추이</span>
          </div>
          <div class="h-32 flex items-end justify-between">
            <div
              v-for="(data, index) in dashboard.userTrendData"
              :key="index"
              class="flex flex-col items-center"
            >
              <div
                class="w-8 bg-blue-400 rounded-t"
                :style="{ height: `${(data / Math.max(...dashboard.userTrendData)) * 100}px` }"
              ></div>
              <span class="text-xs text-gray-400 mt-1">{{ dashboard.userTrendLabels[index] }}</span>
            </div>
          </div>
        </div>
      </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/components/AdminLayout.vue'

interface Activity {
  id: number
  type: string
  desc: string
  time: string
}

interface Dashboard {
  userCount: number
  hospitalCount: number
  policyCount: number
  recentActivities: Activity[]
  userTrendLabels: string[]
  userTrendData: number[]
}

const dashboard = ref<Dashboard>({
  userCount: 0,
  hospitalCount: 0,
  policyCount: 0,
  recentActivities: [],
  userTrendLabels: [],
  userTrendData: [],
})

const getActivityIconClass = (type: string) => {
  switch (type) {
    case 'user':
      return 'text-green-400'
    case 'hospital':
      return 'text-blue-400'
    case 'policy':
      return 'text-purple-400'
    default:
      return 'text-yellow-400'
  }
}

onMounted(() => {
  // Mock 데이터 로드
  dashboard.value = {
    userCount: 1250,
    hospitalCount: 45,
    policyCount: 89,
    recentActivities: [
      {
        id: 1,
        type: 'user',
        desc: '새로운 사용자가 가입했습니다.',
        time: '5분 전',
      },
      {
        id: 2,
        type: 'hospital',
        desc: '새로운 병원이 등록되었습니다.',
        time: '10분 전',
      },
      {
        id: 3,
        type: 'policy',
        desc: '새로운 정책이 업데이트되었습니다.',
        time: '30분 전',
      },
      {
        id: 4,
        type: 'user',
        desc: '사용자 정보가 수정되었습니다.',
        time: '1시간 전',
      },
    ],
    userTrendLabels: ['1월', '2월', '3월', '4월', '5월', '6월'],
    userTrendData: [120, 150, 180, 220, 280, 320],
  }
})
</script>
