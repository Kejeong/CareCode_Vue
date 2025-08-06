# Vercel 배포 가이드

이 문서는 맘편한 Vue.js 3 프론트엔드를 Vercel에 배포하는 방법을 설명합니다.

## 🚀 빠른 배포

### 1. Vercel CLI 설치
```bash
npm install -g vercel
```

### 2. 로그인
```bash
vercel login
```

### 3. 배포
```bash
npm run deploy
```

## 📋 상세 배포 과정

### 1. 사전 준비

#### 필수 요구사항
- Node.js 18+ 설치
- npm 또는 yarn 설치
- Vercel 계정 (무료)

#### 프로젝트 빌드 테스트
```bash
# 의존성 설치
npm install

# 빌드 테스트
npm run build

# 로컬에서 빌드 결과 확인
npm run preview
```

### 2. Vercel CLI 배포

#### 첫 번째 배포
```bash
# 프로젝트 디렉토리에서
vercel

# 질문에 답변:
# - Set up and deploy? → Y
# - Which scope? → [계정 선택]
# - Link to existing project? → N
# - What's your project's name? → mompyun-frontend
# - In which directory is your code located? → ./
# - Want to override the settings? → N
```

#### 프로덕션 배포
```bash
vercel --prod
```

### 3. GitHub 연동 자동 배포

#### GitHub 저장소 설정
1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. "New Project" 클릭
3. GitHub 저장소 선택
4. 프로젝트 설정 확인

#### 빌드 설정
```
Framework Preset: Vite
Root Directory: frontend (프로젝트 구조에 따라)
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 4. 환경 변수 설정

#### 필요한 환경 변수
```bash
# API URL (백엔드 연동 시)
VITE_API_URL=https://your-api-domain.com

# 기타 환경 변수
VITE_APP_TITLE=맘편한
```

#### Vercel Dashboard에서 설정
1. Project Settings → Environment Variables
2. 환경 변수 추가
3. Production, Preview, Development 환경 선택

### 5. 커스텀 도메인 설정

#### 도메인 추가
1. Vercel Dashboard → Project Settings → Domains
2. "Add Domain" 클릭
3. 도메인 입력

#### DNS 설정
```
Type: CNAME
Name: @ 또는 www
Value: cname.vercel-dns.com
TTL: 3600
```

### 6. 배포 확인

#### 배포 URL
- **프로덕션**: `https://your-project-name.vercel.app`
- **Preview**: `https://your-project-name-git-branch-username.vercel.app`

#### 배포 상태 확인
- Vercel Dashboard → Deployments
- 배포 로그 및 상태 확인

## 🔧 고급 설정

### 1. vercel.json 설정

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 2. SPA 라우팅 설정

Vue Router의 History Mode를 사용하는 경우, 모든 라우트를 index.html로 리다이렉트해야 합니다.

### 3. 캐싱 설정

#### 정적 자산 캐싱
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 🚨 문제 해결

### 1. 빌드 오류

#### TypeScript 오류
```bash
# 타입 체크
npm run type-check

# 린팅
npm run lint
```

#### 의존성 오류
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

### 2. 배포 실패

#### 로그 확인
```bash
# 배포 로그 확인
vercel logs

# 특정 배포 로그 확인
vercel logs [deployment-url]
```

#### 재배포
```bash
# 강제 재배포
vercel --force

# 특정 브랜치 배포
vercel --prod --target production
```

### 3. 라우팅 문제

#### 404 오류 해결
- vercel.json에 rewrites 설정 확인
- 모든 라우트가 index.html로 리다이렉트되는지 확인

## 📊 모니터링

### 1. 성능 모니터링
- Vercel Analytics 활성화
- Core Web Vitals 모니터링

### 2. 에러 추적
- Vercel Functions 로그 확인
- 클라이언트 사이드 에러 추적

## 🔄 CI/CD 파이프라인

### GitHub Actions 예시
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📝 배포 체크리스트

- [ ] 로컬 빌드 테스트 통과
- [ ] TypeScript 오류 없음
- [ ] 환경 변수 설정 완료
- [ ] 커스텀 도메인 설정 (필요시)
- [ ] 라우팅 테스트 완료
- [ ] 성능 최적화 확인
- [ ] 모바일 반응형 테스트
- [ ] 브라우저 호환성 확인

## 🆘 지원

- **Vercel 문서**: [vercel.com/docs](https://vercel.com/docs)
- **Vue.js 배포 가이드**: [vuejs.org/guide/deployment](https://vuejs.org/guide/deployment)
- **Vite 배포 가이드**: [vitejs.dev/guide/static-deploy](https://vitejs.dev/guide/static-deploy) 