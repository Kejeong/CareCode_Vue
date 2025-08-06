# 맘편한 - Vue.js 3 프론트엔드

CareCode 프로젝트의 Vue.js 3 기반 프론트엔드 애플리케이션입니다.

## 🚀 기술 스택

- **Vue.js 3** - Composition API 기반
- **TypeScript** - 타입 안정성
- **Vue Router** - 클라이언트 사이드 라우팅
- **Pinia** - 상태 관리
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **Vite** - 빠른 개발 서버 및 빌드 도구

## 📁 프로젝트 구조

```
frontend/
├── src/
│   ├── components/          # 공통 컴포넌트
│   │   ├── Header.vue      # 사용자 페이지 헤더
│   │   ├── AdminHeader.vue # 관리자 페이지 헤더
│   │   └── AdminSidebar.vue # 관리자 사이드바
│   ├── views/              # 페이지 컴포넌트
│   │   ├── HomeView.vue    # 홈페이지
│   │   ├── FacilitiesView.vue # 육아시설 페이지
│   │   ├── LoginView.vue   # 로그인 페이지
│   │   └── admin/          # 관리자 페이지들
│   ├── stores/             # Pinia 스토어
│   │   └── user.ts         # 사용자 상태 관리
│   ├── router/             # 라우터 설정
│   └── assets/             # 정적 자산
├── public/                 # 공개 자산
└── package.json           # 의존성 관리
```

## 🎨 주요 기능

### 사용자 페이지
- **홈페이지**: 서비스 소개 및 통계
- **육아시설**: 시설 검색, 필터링, 상세 정보
- **커뮤니티**: 부모님들과의 정보 공유
- **건강관리**: 아이 건강 체계적 관리
- **정책정보**: 육아 관련 정책 확인
- **챗봇**: 육아 관련 질문 답변

### 관리자 페이지
- **대시보드**: 통계 및 최근 활동
- **사용자 관리**: 회원 관리
- **병원 관리**: 병원 정보 관리
- **육아시설 예약**: 예약 현황 관리
- **정책 관리**: 정책 정보 관리
- **커뮤니티 관리**: 게시글 관리
- **건강 관리**: 건강 정보 관리
- **알림 관리**: 알림 설정 관리

## 🛠️ 개발 환경 설정

### 필수 요구사항
- Node.js 18+ 
- npm 또는 yarn

### 설치 및 실행

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **개발 서버 실행**
   ```bash
   npm run dev
   ```

3. **빌드**
   ```bash
   npm run build
   ```

4. **코드 포맷팅**
   ```bash
   npm run format
   ```

5. **린팅**
   ```bash
   npm run lint
   ```

## 🎯 주요 컴포넌트

### Header.vue
- 사용자 페이지용 헤더
- 로그인/회원가입 모달
- 네비게이션 메뉴

### FacilitiesView.vue
- 육아시설 검색 및 필터링
- 시설 상세 정보 모달
- Mock 데이터 기반 UI

### AdminDashboardView.vue
- 관리자 대시보드
- 통계 카드 및 차트
- 최근 활동 목록

## 🔧 Mock 데이터

현재 프로젝트는 Mock 데이터를 사용하여 UI/UX를 구현했습니다:

- **사용자 인증**: test@example.com / password
- **육아시설**: 6개의 Mock 시설 데이터
- **관리자 대시보드**: Mock 통계 및 활동 데이터

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: Pink 계열 (#ec4899)
- **Secondary**: Blue 계열 (#3b82f6)
- **Gray**: 다양한 회색 톤

### 컴포넌트 클래스
- `.btn-primary`: 주요 버튼 스타일
- `.btn-secondary`: 보조 버튼 스타일
- `.card`: 카드 컨테이너
- `.input-field`: 입력 필드

## 📱 반응형 디자인

- **Mobile First** 접근법
- **Tailwind CSS** 유틸리티 클래스 활용
- **Flexbox** 및 **Grid** 레이아웃

## 🔄 상태 관리

### Pinia 스토어
- **user.ts**: 사용자 인증 상태 관리
- **localStorage**: 로그인 상태 유지

## 🚀 배포

### 개발 환경
```bash
npm run dev
```

### 프로덕션 빌드
```bash
npm run build
```

### Vercel 배포

#### 1. Vercel CLI 설치
```bash
npm install -g vercel
```

#### 2. Vercel 로그인
```bash
vercel login
```

#### 3. 프로젝트 배포
```bash
# 현재 디렉토리에서 배포
vercel

# 또는 특정 옵션으로 배포
vercel --prod
```

#### 4. 자동 배포 설정 (GitHub 연동)

1. **GitHub 저장소 연결**
   - [Vercel Dashboard](https://vercel.com/dashboard)에 접속
   - "New Project" 클릭
   - GitHub 저장소 선택
   - 프로젝트 설정 확인

2. **빌드 설정**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **환경 변수 설정 (필요시)**
   - Vercel Dashboard → Project Settings → Environment Variables
   - 필요한 환경 변수 추가

#### 5. 커스텀 도메인 설정

1. **도메인 추가**
   - Vercel Dashboard → Project Settings → Domains
   - "Add Domain" 클릭
   - 도메인 입력 및 DNS 설정

2. **DNS 설정**
   ```
   Type: CNAME
   Name: @ 또는 www
   Value: cname.vercel-dns.com
   ```

#### 6. 배포 확인

- **배포 URL**: `https://your-project-name.vercel.app`
- **GitHub 연동**: main 브랜치에 push 시 자동 배포
- **Preview 배포**: PR 생성 시 자동으로 preview URL 생성

#### 7. 배포 스크립트 (package.json)

```json
{
  "scripts": {
    "deploy": "npm run build && vercel --prod",
    "deploy:preview": "npm run build && vercel"
  }
}
```

#### 8. 환경별 배포

```bash
# 프로덕션 배포
npm run deploy

# Preview 배포
npm run deploy:preview

# 특정 브랜치 배포
vercel --prod --target production
```

## 📝 개발 노트

1. **타입 안정성**: TypeScript를 활용한 타입 정의
2. **컴포넌트 재사용**: 공통 컴포넌트 분리
3. **반응형 디자인**: 모바일 우선 접근법
4. **접근성**: ARIA 라벨 및 키보드 네비게이션 고려

## 🔮 향후 계획

- [ ] 실제 API 연동
- [ ] 이미지 업로드 기능
- [ ] 실시간 채팅 기능
- [ ] PWA 지원
- [ ] 다국어 지원
- [ ] 테스트 코드 작성

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
