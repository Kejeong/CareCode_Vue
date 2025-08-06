<script setup lang="ts">
import UserLayout from '@/components/UserLayout.vue'
</script>

<template>
  <UserLayout>
      <!-- 히어로 섹션 -->
      <section class="text-center mb-16 fade-in relative overflow-hidden">
        <!-- 배경 장식 -->
        <div class="absolute inset-0">
          <div
            class="absolute top-10 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-30 animate-bounce"
          ></div>
          <div
            class="absolute top-20 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-40 animate-pulse"
          ></div>
          <div
            class="absolute bottom-10 left-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-50 animate-spin"
          ></div>
        </div>

        <div class="relative z-10">
          <div class="mb-8">
            <div
              class="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-6 shadow-lg"
            >
              <svg class="w-5 h-5 text-pink-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-sm font-medium text-gray-700">맘편한 서비스</span>
            </div>
          </div>

          <h2 class="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            맘편한으로<br />
            <span
              class="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
            >
              육아 걱정을 해결하세요
            </span>
          </h2>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            육아 시설 찾기부터 건강 관리, 커뮤니티까지<br />
            모든 육아 정보를 한 곳에서 확인하세요<br />
            <span class="text-pink-500 font-medium">맘편한</span>이 함께하는 행복한 육아 생활
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <router-link
              to="/facilities"
              class="btn-primary text-lg px-10 py-4 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clip-rule="evenodd"
                />
              </svg>
              시작하기
            </router-link>
            <button
              class="btn-secondary text-lg px-10 py-4 transform hover:scale-105 transition-all duration-200"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
              더 알아보기
            </button>
          </div>

          <!-- 통계 카드 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div
              class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-200"
            >
              <div class="text-3xl font-bold text-pink-500 mb-2">500+</div>
              <div class="text-gray-600">등록된 육아시설</div>
            </div>
            <div
              class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-200"
            >
              <div class="text-3xl font-bold text-blue-500 mb-2">10,000+</div>
              <div class="text-gray-600">가입한 부모님</div>
            </div>
            <div
              class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-200"
            >
              <div class="text-3xl font-bold text-purple-500 mb-2">4.8</div>
              <div class="text-gray-600">평균 만족도</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 서비스 소개 섹션 -->
      <section class="mb-16">
        <h3 class="text-3xl font-bold text-center mb-12 text-gray-800">주요 서비스</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="card p-6 text-center transform hover:scale-105 transition-all duration-200">
            <div
              class="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h4 class="text-xl font-semibold mb-2">육아시설 찾기</h4>
            <p class="text-gray-600">근처 육아시설을 찾고 예약하세요</p>
          </div>

          <div class="card p-6 text-center transform hover:scale-105 transition-all duration-200">
            <div
              class="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h4 class="text-xl font-semibold mb-2">커뮤니티</h4>
            <p class="text-gray-600">다른 부모님들과 정보를 공유하세요</p>
          </div>

          <div class="card p-6 text-center transform hover:scale-105 transition-all duration-200">
            <div
              class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h4 class="text-xl font-semibold mb-2">건강관리</h4>
            <p class="text-gray-600">아이의 건강을 체계적으로 관리하세요</p>
          </div>

          <div class="card p-6 text-center transform hover:scale-105 transition-all duration-200">
            <div
              class="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h4 class="text-xl font-semibold mb-2">정책정보</h4>
            <p class="text-gray-600">육아 관련 정책 정보를 확인하세요</p>
          </div>
        </div>
      </section>

      <!-- 최근 활동 섹션 -->
      <section class="mb-16">
        <h3 class="text-3xl font-bold text-center mb-12 text-gray-800">최근 활동</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="card p-6">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold">새로운 육아시설 등록</h4>
                <p class="text-sm text-gray-500">서울 강남구에 새로운 어린이집이 등록되었습니다.</p>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold">커뮤니티 활성화</h4>
                <p class="text-sm text-gray-500">오늘 50명의 새로운 회원이 가입했습니다.</p>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center mb-4">
              <div
                class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3"
              >
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold">건강 체크업</h4>
                <p class="text-sm text-gray-500">
                  이번 주 200명의 아이들이 건강 체크업을 받았습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  </UserLayout>
</template>
