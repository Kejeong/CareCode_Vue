<template>
  <aside class="w-64 bg-gray-800 flex flex-col p-6 min-h-screen fixed top-16 left-0 h-full z-0">
    <nav class="flex-1">
      <ul class="space-y-4">
        <li>
          <router-link
            to="/admin"
            class="block py-2 px-4 rounded hover:bg-gray-700 font-semibold"
            :class="$route.path === '/admin' ? 'text-blue-400' : 'text-gray-300'"
          >
            <svg class="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            대시보드
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/users"
            class="block py-2 px-4 rounded hover:bg-gray-700"
            :class="$route.path === '/admin/users' ? 'text-blue-400' : 'text-gray-300'"
          >
            <svg class="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            사용자 관리
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/hospitals"
            class="block py-2 px-4 rounded hover:bg-gray-700"
            :class="$route.path === '/admin/hospitals' ? 'text-blue-400' : 'text-gray-300'"
          >
            <svg class="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            병원 관리
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/facilities"
            class="block py-2 px-4 rounded hover:bg-gray-700"
            :class="$route.path === '/admin/facilities' ? 'text-blue-400' : 'text-gray-300'"
          >
            <svg class="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              />
            </svg>
            육아 시설 예약
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/policies"
            class="block py-2 px-4 rounded hover:bg-gray-700"
            :class="$route.path === '/admin/policies' ? 'text-blue-400' : 'text-gray-300'"
          >
            <svg class="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clip-rule="evenodd"
              />
            </svg>
            정책 관리
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/community"
            class="block py-2 px-4 rounded hover:bg-gray-700"
            :class="$route.path === '/admin/community' ? 'text-blue-400' : 'text-gray-300'"
          >
            <svg class="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clip-rule="evenodd"
              />
            </svg>
            커뮤니티 관리
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/health"
            class="block py-2 px-4 rounded hover:bg-gray-700"
            :class="$route.path === '/admin/health' ? 'text-blue-400' : 'text-gray-300'"
          >
            <svg class="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              />
            </svg>
            건강 관리
          </router-link>
        </li>
        <li>
          <router-link
            to="/admin/notifications"
            class="block py-2 px-4 rounded hover:bg-gray-700"
            :class="$route.path === '/admin/notifications' ? 'text-blue-400' : 'text-gray-300'"
          >
            <svg class="w-5 h-5 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
              />
            </svg>
            알림 관리
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>
