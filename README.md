# 기술 생활 기록

IT 제품 리뷰와 Ubuntu, Python, Codex 활용 글을 게시하기 위한 Astro 정적 블로그입니다. TypeScript, Astro Content Collections, Markdown/MDX를 사용하며 Cloudflare Pages에 배포하도록 구성되어 있습니다.

## 요구 환경

- Node.js 22
- npm 10 이상

저장소의 `.nvmrc`를 지원하는 환경에서는 다음 명령으로 Node 버전을 맞출 수 있습니다.

```bash
nvm use
```

## 로컬 실행

저장소를 복제한 뒤 의존성을 설치합니다.

```bash
git clone https://github.com/USER/REPOSITORY.git
cd REPOSITORY
npm ci
```

환경 변수 예제를 복사하고 실제 로컬 값으로 수정합니다.

```bash
cp .env.example .env
```

개발 서버를 시작합니다.

```bash
npm run dev
```

기본 주소는 `http://localhost:4321`입니다.

## 환경 변수

| 이름 | 필수 | 용도 | 예시 |
|---|---:|---|---|
| `SITE_URL` | 배포 시 필수 | canonical, Open Graph, RSS, sitemap, robots에 사용하는 공개 원점 URL | `https://myblog-cloudflare.pages.dev` |
| `CONTACT_EMAIL` | 배포 시 필수 | 소개 페이지에 공개할 연락 이메일 | `dpnzdy@gmail.com` |

- `SITE_URL`에는 경로를 붙이지 않은 HTTPS 원점만 입력합니다.
- 값 끝에는 `/`를 붙이지 않는 것을 권장합니다.
- 두 값은 비밀키가 아니며 빌드된 정적 HTML에 공개됩니다.
- `.env`는 Git에 포함되지 않습니다. 실제 값은 Cloudflare Pages의 Production과 Preview 환경에 각각 등록합니다.
- 미리보기 배포에도 프로덕션 `SITE_URL`을 사용하면 canonical이 임시 `pages.dev` 주소로 바뀌는 것을 막을 수 있습니다.

## 콘텐츠 작성

게시물은 `src/content/posts`에 Markdown 또는 MDX로 추가합니다. 메타데이터 규칙은 `src/content.config.ts`에서 검증합니다.

- `draft: true`인 글은 페이지, RSS, sitemap에서 제외됩니다.
- 미래 날짜의 글도 공개 빌드에서 제외됩니다.
- 카테고리는 `reviews`, `ubuntu`, `python`, `codex` 중 하나를 사용합니다.

## 검사와 프로덕션 빌드

타입과 Astro 진단만 실행합니다.

```bash
npm run check
```

Cloudflare Pages와 동일한 프로덕션 빌드를 실행합니다.

```bash
npm run build
```

빌드 명령은 먼저 `astro check`를 실행하며 오류가 있으면 정적 출력을 만들지 않습니다. 성공한 결과는 `dist`에 생성됩니다.

빌드 결과를 로컬에서 확인합니다.

```bash
npm run preview
```

## GitHub에 올리기

새 GitHub 저장소를 만든 뒤 프로젝트 루트에서 다음과 같이 연결합니다. 기존 저장소라면 초기화 단계는 생략합니다.

```bash
git init
git add .
git commit -m "Initial Astro blog"
git branch -M main
git remote add origin https://github.com/USER/REPOSITORY.git
git push -u origin main
```

커밋 전에 `.env`, `node_modules`, `.astro`, `dist`가 포함되지 않았는지 `git status --short`로 확인합니다.

## Cloudflare Pages 배포

Cloudflare 대시보드에서 다음 순서로 GitHub 저장소를 연결합니다.

1. **Workers & Pages**에서 애플리케이션 생성을 선택합니다.
2. **Pages**에서 기존 Git 저장소 가져오기를 선택합니다.
3. GitHub 저장소를 선택하고 빌드 설정을 입력합니다.
4. Production과 Preview 환경 변수를 등록합니다.
5. 저장 후 첫 배포를 실행합니다.

빌드 설정:

| 설정 | 값 |
|---|---|
| Production branch | `main` |
| Framework preset | `Astro` |
| Root directory | `/` 또는 비워 둠 |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | `.nvmrc`의 `22` |

환경 변수는 Pages 프로젝트의 **Settings → Variables and Secrets**에서 추가합니다.

```text
SITE_URL=https://myblog-cloudflare.pages.dev
CONTACT_EMAIL=dpnzdy@gmail.com
```

환경 변수를 변경한 뒤에는 새 배포를 실행해야 정적 HTML에 반영됩니다. `main`에 push하면 프로덕션이 자동 배포되고, 다른 브랜치와 Pull Request는 미리보기 배포로 확인할 수 있습니다.

Cloudflare 공식 문서:

- [Astro를 Cloudflare Pages에 배포](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)
- [GitHub 연동](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/)
- [빌드 설정](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [환경 변수와 바인딩](https://developers.cloudflare.com/pages/functions/bindings/)

## 배포 후 체크리스트

### 페이지와 라우팅

- [ ] 홈, 전체 글, 글 상세, 카테고리, 태그, 소개, 검색이 200으로 열린다.
- [ ] 존재하지 않는 URL이 사용자 정의 404 화면과 HTTP 404 상태를 반환한다.
- [ ] 모바일 메뉴와 검색을 터치 및 키보드로 사용할 수 있다.
- [ ] 내부 링크와 코드 블록, 표가 모바일 화면을 넘지 않는다.

### 도메인과 HTTPS

- [ ] 사용자 정의 도메인이 연결되고 HTTPS 인증서가 활성화되었다.
- [ ] `www` 사용 여부와 대표 호스트 리디렉션이 일관적이다.
- [ ] `SITE_URL`이 실제 대표 HTTPS 도메인과 정확히 일치한다.

### 검색 및 피드

- [ ] 페이지 소스의 title, description, canonical이 실제 도메인을 사용한다.
- [ ] Open Graph와 Twitter 이미지가 공유 미리보기에서 표시된다.
- [ ] 게시물의 Article 및 BreadcrumbList JSON-LD가 검증된다.
- [ ] `/sitemap.xml`이 열리고 공개 canonical 페이지만 포함한다.
- [ ] `/robots.txt`가 실제 도메인의 sitemap을 가리킨다.
- [ ] `/rss.xml`이 열리고 최신 공개 글을 포함한다.
- [ ] Google Search Console에 실제 도메인을 등록하고 sitemap을 제출했다.

### 콘텐츠와 운영

- [ ] 초안과 미래 발행 글이 공개되지 않았다.
- [ ] 소개 페이지의 연락처가 실제 이메일이다.
- [ ] 협찬·제휴 글의 고지가 표시된다.
- [ ] Cloudflare의 프로덕션 브랜치가 `main`으로 설정되어 있다.
- [ ] Pull Request 미리보기와 프로덕션 배포가 구분된다.
- [ ] 이전 정상 배포로 롤백하는 방법을 확인했다.

### 품질

- [ ] 모바일 Lighthouse에서 Performance, Accessibility, Best Practices, SEO를 확인했다.
- [ ] 실제 Android Chrome 또는 iOS Safari에서 대표 페이지를 확인했다.
- [ ] 브라우저 콘솔 오류와 깨진 외부 링크가 없다.
- [ ] 배포 후 canonical, RSS, sitemap이 `myblog-cloudflare.pages.dev`를 사용한다.

## 프로젝트 구조

```text
src/
├── components/       공통 UI
├── config/           사이트 설정
├── content/posts/    Markdown/MDX 게시물
├── layouts/          공통 HTML 및 SEO 레이아웃
├── pages/            정적 페이지와 XML/TXT 엔드포인트
└── styles/           모바일 우선 전역 스타일
public/               그대로 배포할 정적 자산
docs/                 요구사항과 개발 문서
```
