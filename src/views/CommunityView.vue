<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import UserLayout from '@/components/UserLayout.vue'

interface Post {
  id: number
  title: string
  content: string
  author: string
  category: string
  tags: string[]
  views: number
  likes: number
  comments: number
  createdAt: Date
  isLiked?: boolean
}

interface Category {
  id: string
  name: string
  icon: string
  count: number
}

const posts = ref<Post[]>([
  {
    id: 1,
    title: '첫 아이 육아 팁 공유합니다',
    content: '첫 아이를 키우면서 배운 것들을 공유하고 싶어요. 특히 수면 관리와 이유식에 대해 도움이 되었던 방법들을 알려드릴게요.',
    author: '맘맘맘',
    category: 'experience',
    tags: ['첫아이', '수면관리', '이유식'],
    views: 245,
    likes: 18,
    comments: 12,
    createdAt: new Date('2024-01-15')
  },
  {
    id: 2,
    title: '어린이집 적응기간 어떻게 하셨나요?',
    content: '아이가 어린이집에 적응하는데 어려움을 겪고 있어요. 다른 부모님들은 어떻게 도와주셨는지 조언 부탁드려요.',
    author: '걱정맘',
    category: 'question',
    tags: ['어린이집', '적응', '분리불안'],
    views: 189,
    likes: 5,
    comments: 23,
    createdAt: new Date('2024-01-14')
  },
  {
    id: 3,
    title: '아이와 함께하는 요리 활동 추천',
    content: '아이와 함께 요리하는 것이 정말 좋은 활동이에요. 안전하고 재미있는 요리 활동들을 소개해드릴게요.',
    author: '요리맘',
    category: 'tip',
    tags: ['요리활동', '놀이', '창의력'],
    views: 156,
    likes: 25,
    comments: 8,
    createdAt: new Date('2024-01-13')
  },
  {
    id: 4,
    title: '우리 아이 발달상황 공유',
    content: '아이의 발달상황을 기록하고 공유하는 공간이었으면 좋겠어요. 월령별 발달 체크리스트도 함께 만들어보면 어떨까요?',
    author: '발달맘',
    category: 'free',
    tags: ['발달', '기록', '체크리스트'],
    views: 98,
    likes: 12,
    comments: 15,
    createdAt: new Date('2024-01-12')
  }
])

const categories: Category[] = [
  { id: 'all', name: '전체', icon: 'grid', count: posts.value.length },
  { id: 'question', name: '질문', icon: 'help-circle', count: posts.value.filter(p => p.category === 'question').length },
  { id: 'experience', name: '경험담', icon: 'book-open', count: posts.value.filter(p => p.category === 'experience').length },
  { id: 'tip', name: '육아팁', icon: 'lightbulb', count: posts.value.filter(p => p.category === 'tip').length },
  { id: 'review', name: '후기', icon: 'star', count: posts.value.filter(p => p.category === 'review').length },
  { id: 'free', name: '자유게시판', icon: 'message-circle', count: posts.value.filter(p => p.category === 'free').length }
]

const selectedCategory = ref('all')
const searchQuery = ref('')
const sortBy = ref('latest')
const showWriteModal = ref(false)
const showPostModal = ref(false)
const selectedPost = ref<Post | null>(null)

const newPost = reactive({
  category: '',
  title: '',
  content: '',
  tags: ''
})

const filteredPosts = computed(() => {
  let filtered = posts.value

  // 카테고리 필터링
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(post => post.category === selectedCategory.value)
  }

  // 검색 필터링
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // 정렬
  switch (sortBy.value) {
    case 'latest':
      filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      break
    case 'popular':
      filtered.sort((a, b) => b.likes - a.likes)
      break
    case 'views':
      filtered.sort((a, b) => b.views - a.views)
      break
    case 'comments':
      filtered.sort((a, b) => b.comments - a.comments)
      break
  }

  return filtered
})

const selectCategory = (categoryId: string) => {
  selectedCategory.value = categoryId
}

const toggleLike = (post: Post) => {
  if (post.isLiked) {
    post.likes--
    post.isLiked = false
  } else {
    post.likes++
    post.isLiked = true
  }
}

const openPostDetail = (post: Post) => {
  selectedPost.value = post
  showPostModal.value = true
}

const openWriteModal = () => {
  showWriteModal.value = true
}

const closeWriteModal = () => {
  showWriteModal.value = false
  // 폼 초기화
  Object.assign(newPost, {
    category: '',
    title: '',
    content: '',
    tags: ''
  })
}

const submitPost = () => {
  if (!newPost.category || !newPost.title || !newPost.content) {
    alert('필수 항목을 모두 입력해주세요.')
    return
  }

  const post: Post = {
    id: Date.now(),
    title: newPost.title,
    content: newPost.content,
    author: '사용자',
    category: newPost.category,
    tags: newPost.tags ? newPost.tags.split(',').map(tag => tag.trim()) : [],
    views: 0,
    likes: 0,
    comments: 0,
    createdAt: new Date()
  }

  posts.value.unshift(post)
  closeWriteModal()
}

const getCategoryName = (categoryId: string) => {
  const category = categories.find(c => c.id === categoryId)
  return category ? category.name : categoryId
}

const getCategoryIcon = (categoryId: string) => {
  const category = categories.find(c => c.id === categoryId)
  return category ? category.icon : 'file'
}
</script>

<template>
  <UserLayout>
      <!-- 페이지 헤더 -->
      <div class="mb-8">
        <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 mb-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-800">육아 커뮤니티</h1>
              <p class="text-gray-600">다른 부모님들과 정보를 나누고 소통하세요</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-500 mb-1">10,000+</div>
              <div class="text-sm text-gray-600">활성 회원</div>
            </div>
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-cyan-500 mb-1">50,000+</div>
              <div class="text-sm text-gray-600">게시글</div>
            </div>
            <div class="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-500 mb-1">실시간</div>
              <div class="text-sm text-gray-600">소통</div>
            </div>
          </div>
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
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="category.icon === 'grid'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              <path v-else-if="category.icon === 'help-circle'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              <path v-else-if="category.icon === 'book-open'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              <path v-else-if="category.icon === 'lightbulb'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              <path v-else-if="category.icon === 'star'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              <path v-else-if="category.icon === 'message-circle'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
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
              placeholder="검색어를 입력하세요..." 
              class="input-field pl-10 pr-4 w-64"
            >
            <svg class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <select v-model="sortBy" class="input-field">
            <option value="latest">최신순</option>
            <option value="popular">인기순</option>
            <option value="views">조회순</option>
            <option value="comments">댓글순</option>
          </select>
        </div>
        <button @click="openWriteModal" class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          글쓰기
        </button>
      </div>

      <!-- 게시글 목록 -->
      <div class="space-y-4">
        <div v-for="post in filteredPosts" :key="post.id" class="card p-6 hover:shadow-lg transition-shadow cursor-pointer" @click="openPostDetail(post)">
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                <span class="text-white font-semibold text-sm">{{ post.author.charAt(0) }}</span>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ post.title }}</h3>
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{{ post.author }}</span>
                  <span>{{ post.createdAt.toLocaleDateString() }}</span>
                  <span class="px-2 py-1 bg-gray-100 rounded-full text-xs">{{ getCategoryName(post.category) }}</span>
                </div>
              </div>
            </div>
            <button @click.stop="toggleLike(post)" class="flex items-center space-x-1 text-gray-500 hover:text-red-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span :class="post.isLiked ? 'text-red-500' : ''">{{ post.likes }}</span>
            </button>
          </div>
          
          <p class="text-gray-600 mb-4 line-clamp-2">{{ post.content }}</p>
          
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4 text-sm text-gray-500">
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                {{ post.views }}
              </span>
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                {{ post.comments }}
              </span>
            </div>
            <div class="flex flex-wrap gap-1">
              <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                #{{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 게시글이 없을 때 -->
      <div v-if="filteredPosts.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">게시글이 없습니다</h3>
        <p class="text-gray-500">첫 번째 게시글을 작성해보세요!</p>
      </div>

    <!-- 글쓰기 모달 -->
    <div v-if="showWriteModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" @click="closeWriteModal">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-bold">새 글 작성</h3>
              <button @click="closeWriteModal" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <form @submit.prevent="submitPost" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                <select v-model="newPost.category" class="input-field w-full" required>
                  <option value="">카테고리 선택</option>
                  <option value="question">질문</option>
                  <option value="experience">경험담</option>
                  <option value="tip">육아팁</option>
                  <option value="review">후기</option>
                  <option value="free">자유게시판</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">제목</label>
                <input v-model="newPost.title" type="text" class="input-field w-full" placeholder="제목을 입력하세요" required>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">내용</label>
                <textarea v-model="newPost.content" class="input-field w-full" rows="10" placeholder="내용을 입력하세요" required></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">태그</label>
                <input v-model="newPost.tags" type="text" class="input-field w-full" placeholder="태그를 쉼표로 구분하여 입력하세요 (예: 육아, 질문, 팁)">
              </div>
              
              <div class="flex space-x-4">
                <button type="submit" class="btn-primary">등록하기</button>
                <button type="button" @click="closeWriteModal" class="btn-secondary">취소</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- 게시글 상세 모달 -->
    <div v-if="showPostModal && selectedPost" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" @click="showPostModal = false">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex justify-between items-start mb-6">
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-gray-800 mb-2">{{ selectedPost.title }}</h3>
                <div class="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span>{{ selectedPost.author }}</span>
                  <span>{{ selectedPost.createdAt.toLocaleDateString() }}</span>
                  <span class="px-2 py-1 bg-gray-100 rounded-full">{{ getCategoryName(selectedPost.category) }}</span>
                </div>
              </div>
              <button @click="showPostModal = false" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div class="prose max-w-none mb-6">
              <p class="text-gray-700 leading-relaxed">{{ selectedPost.content }}</p>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  {{ selectedPost.views }}
                </span>
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  {{ selectedPost.likes }}
                </span>
                <span class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                  {{ selectedPost.comments }}
                </span>
              </div>
              <div class="flex flex-wrap gap-1">
                <span v-for="tag in selectedPost.tags" :key="tag" class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  #{{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserLayout>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
