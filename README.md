# ZinniaShark Note 블로그

Astro와 Markdown으로 만든 Windows 문서·노트 가이드입니다. 한국어, 영어, 독일어, 스페인어, 프랑스어, 일본어로 홈, 글 목록, 주제별 목록, 앱 소개를 제공합니다.

## 로컬 실행

Node.js 24를 기준으로 합니다.

```powershell
npm ci
npm run dev
```

시작 주소는 `http://localhost:4321/ko/`입니다. `npm run check`로 타입을 확인하고, `npm run build`로 `dist/`를 생성합니다. `npm run preview`로 빌드 결과를 확인할 수 있습니다.

## GitHub와 Cloudflare Pages

1. 이 프로젝트의 소스와 `package-lock.json`을 블로그용 GitHub 저장소의 `main` 브랜치에 올립니다.
2. Cloudflare에서 **Workers & Pages → Create application → Pages → Connect to Git**을 선택하고 해당 저장소를 연결합니다.
3. 아래 설정으로 배포합니다.

| Cloudflare Pages 설정 | 값 |
| --- | --- |
| Production branch | `main` |
| Root directory | 저장소 루트 |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js | `24` · 저장소의 `.node-version`에도 지정 |
| Production 환경 변수 | 커스텀 도메인을 사용하면 `SITE_URL`에 실제 HTTPS 공개 주소 입력 |

`SITE_URL`에는 경로 없이 최종 공개 주소를 넣습니다. 비워 두면 Cloudflare Pages의 `main` 배포에서는 프로젝트의 기본 `*.pages.dev` 주소가 사용됩니다. 주소를 바꾼 뒤에는 다시 빌드합니다. 공개 주소가 없거나 배포 브랜치가 `main`이 아닌 빌드에는 `noindex`가 적용됩니다.

[Cloudflare Pages의 Astro 배포 안내](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/) · [Cloudflare Pages Git 연동](https://developers.cloudflare.com/pages/get-started/git-integration/)

## 검색 도구 연결

현재 공개 주소는 `https://myblog-cloudflare.pages.dev/`입니다. Google Search Console에서는 이 주소를 URL 접두어 속성으로 추가합니다. Bing과 네이버도 같은 호스트를 사용합니다. 이 주소의 공개 인증 태그 값은 `search-verification.mjs`에 관리합니다. 값을 바꾸려면 해당 파일을 수정하거나 Cloudflare Pages 프로젝트의 **Production** 환경 변수에 발급된 태그의 `content` 값을 넣습니다.

| 검색 도구 | 환경 변수 | HTML 메타태그 이름 |
| --- | --- | --- |
| Google Search Console | `GOOGLE_SITE_VERIFICATION` | `google-site-verification` |
| Bing Webmaster Tools | `BING_SITE_VERIFICATION` | `msvalidate.01` |
| 네이버 서치어드바이저 | `NAVER_SITE_VERIFICATION` | `naver-site-verification` |

설정한 태그는 공개 빌드의 언어별 홈에 렌더링됩니다. 환경 변수는 파일의 값보다 우선합니다. 값이 비어 있는 도구와 미리보기 빌드에는 태그가 출력되지 않습니다. 공개 주소를 바꾸면 새 주소에 맞는 인증값을 설정합니다.

1. 인증값을 추가하거나 변경한 뒤 프로덕션을 다시 배포합니다.
2. 블로그 루트가 연결되는 [영어 홈](https://myblog-cloudflare.pages.dev/en/)의 HTML 소스에서 발급된 태그를 확인하고, 각 도구에서 소유권 확인을 완료합니다.
3. [공개 사이트맵](https://myblog-cloudflare.pages.dev/sitemap.xml)을 제출하고, 처리 상태와 발견된 URL을 확인합니다.
4. Search Console의 URL 검사에 [RTF 글](https://myblog-cloudflare.pages.dev/ko/blog/open-rtf-windows-11/), [오프라인 백업 글](https://myblog-cloudflare.pages.dev/en/blog/offline-notes-backup/), [문서 암호 글](https://myblog-cloudflare.pages.dev/ko/blog/password-protect-personal-notes/) 등 대표 주소를 넣습니다. 실제 URL 테스트에서 가져오기 상태를, URL 검사 결과에서 Google이 선택한 대표 주소와 색인 여부를 확인합니다.

[Google 소유권 확인](https://support.google.com/webmasters/answer/9008080?hl=ko) · [Google 사이트맵 보고서](https://support.google.com/webmasters/answer/7451001?hl=ko) · [Bing 소유권 확인](https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b) · [네이버 소유권 확인](https://searchadvisor.naver.com/guide/faq-start-register)

### 등록 기록 · 2026-11-25 (KST)

세 도구에서 블로그 소유권을 확인하고, 공개 URL 52개가 담긴 사이트맵을 제출했습니다. 아래는 제출 당시 확인한 상태입니다.

| 검색 도구 | 사이트맵 상태 |
| --- | --- |
| Google Search Console | 제출 접수. 보고서에 ‘가져올 수 없음’이 표시됐으며, 사이트맵 XML의 실제 URL 테스트에서는 가져오기에 성공했습니다. |
| Bing Webmaster Tools | 제출 목록에 등록돼 `Processing`으로 표시됐습니다. |
| 네이버 서치어드바이저 | 브라우저에서 보안문자 확인 후 소유권 확인을 완료했습니다. 제출 목록에서 `sitemap.xml`과 등록일을 확인했습니다. |

## 글 발행

원고는 `src/content/blog/<언어>/<원고명>.md`에 있습니다. 개별 글은 검수가 끝난 언어부터 발행할 수 있습니다.

- 같은 글의 번역본에는 동일한 `translationKey`를 사용합니다. `slug`는 언어별 URL입니다. 이미 공개한 주소는 유지하고, 변경할 때는 `public/_redirects`에 기존 주소의 리디렉션을 추가합니다.
- `category`는 `windows-editing`, `offline-privacy`, `note-workflows` 중 하나를 사용합니다. `published`와 선택값 `updated`는 `YYYY-MM-DD`로 적습니다.
- 검수 중인 파일은 `draft: true`로 저장합니다. 발행한 글만 목록, 사이트맵 및 번역 링크에 포함됩니다.
- `image`와 `imageAlt`를 기입합니다. 새 표지가 필요하면 `public/images/`에 이미지를 두고 `src/content.config.ts`의 이미지 키와 `src/lib/posts.ts`의 이미지 목록을 갱신합니다.
- 해당 글에서 앱을 실제로 활용할 수 있다면 `showApp: true`로 앱 소개 링크를 표시합니다.
- 주 2~3개 주제를 기준으로 작성합니다. 검색 질문의 답부터 쓰고, 비교에는 동일한 샘플 파일과 조건을 적용합니다. 한국어와 영어를 먼저 작성하고 나머지는 검색 반응과 편집 여건에 따라 번역합니다.

## 클릭 측정

기본 설정에서는 방문 분석 스크립트를 불러오지 않습니다. 운영 중 Umami를 사용한다면 Cloudflare Pages의 Production 환경 변수에 `PUBLIC_UMAMI_SCRIPT_URL`과 `PUBLIC_UMAMI_WEBSITE_ID`를 함께 설정하세요. 선택한 공개 도메인에서만 동작하도록 구성되어 있습니다.

`app-page-click`은 앱 소개 링크 이동, `store-click`은 Microsoft Store로의 이동을 나타냅니다. Store 클릭은 다운로드 완료나 설치를 집계하지 않습니다. 검색 노출과 클릭은 Search Console에서 따로 확인합니다. [Umami 이벤트 설정](https://docs.umami.is/docs/track-events)

## 이미지

앱 아이콘과 Windows 1.0.2 화면은 [기존 공식 제품 사이트](https://dpnzdy.github.io/ZinniaSharkNote/)의 공개 제품 자료입니다. 편집용 표지는 기본 이미지 생성 도구로 제작했습니다.

| 파일 | 생성 지시 요약 |
| --- | --- |
| `public/images/hero.webp` | 진한 적색 배경과 크림색 책상 위의 노트북, 일반 문서가 표시된 은색 노트북 컴퓨터, 인쇄물 질감의 편집 일러스트 |
| `public/images/rtf.webp` | 장밋빛 배경 위의 크림색 문서와 버건디 폴더, 금속 종이 클립을 위에서 본 편집 사진 |
| `public/images/offline.webp` | 청록색 책상과 노트 위의 휴대용 SSD, 느슨하게 감긴 빨간 케이블을 위에서 본 편집 사진 |
| `public/images/password.webp` | 버건디색 책상, 종이 더미와 황동 자물쇠 |
| `public/images/multimedia.webp` | 슬레이트색 책상, 프로젝트 문서와 해안 사진, 유선 이어폰 |
| `public/images/privacy.webp` | 크림색 책상, 종이 폴더를 담은 올리브색 파일 보관함 |

<details>
<summary>이미지 생성에 사용한 프롬프트</summary>

**홈 표지**

> Wide 3:2 editorial illustration for a quiet premium Windows note-taking publication hero. On a rich crimson red (#a42731) outer background, a slender silver laptop viewed front-on slightly above on a warm ivory tabletop with notebook and pencil. The laptop screen shows a restrained generic document page with charcoal rules and a small red accent, no legible text. Saturated cherry red long shadows, strong daylight, vintage European editorial print and understated photographic three-dimensional materials, delicate grain, purposeful simple composition, large central subject, cropped closer. No people, typography, logos, watermarks, interface labels, frame, or rounded outer edges.

**RTF 글 표지**

> Wide 3:2 editorial cover for an article about opening legacy rich-text documents. A cream sheet with black typesetting-like abstract rules and red margin line, a burgundy folder and a small silver metal paperclip on soft warm pink red ground. Top-down still life, geometric composition with bold red sunlight shadows, premium tactile modern magazine photography with delicate print grain. No words, letters, logos, or watermarks.

**오프라인 백업 글 표지**

> Wide 3:2 editorial cover for a private offline note backup article. Compact matte black portable SSD with neat red cable loosely coiled on top of a stack of pale cream handwritten-looking abstract note pages on a muted blue-green teal desktop, shot from above in striking angled afternoon light, minimalist tactile still-life photographic magazine editorial, understated print grain, strong neat central composition. No readable text, lettering, logos, or watermarks.

**개인 노트 비밀번호 표지**

> Wide 3:2 premium editorial still-life photo for a Windows notes blog article about password protecting one private note. On muted burgundy red desk, a short stack of cream archive paper with subtle dark horizontal rules (no readable text), a compact brass padlock resting naturally across the lower corner and throwing an angled shadow. Top-down, realistic matte textures, warm raking daylight, quiet modern European editorial print mood, delicate film grain, bold yet minimal geometry, the lock and paper centered in the middle two thirds for narrow horizontal crops. Nothing else, no type, no logo, no watermark, no frame.

**멀티미디어 문서 표지**

> Wide 3:2 premium editorial still-life photo for a Windows writing blog article about combining text, photographs, audio and video. On a washed dark slate-blue desktop, one warm cream printed project sheet with abstract charcoal paragraph rules, two small overlapping prints of a coastline, wired silver earbuds with neat loop, and a pencil. Top-down tactile photographic studio with strong diagonal afternoon shadows, quiet red accent only, modern print-magazine look with slight grain. Keep the three key objects near the center horizontally, composition uncluttered. No readable typography, logos, human hands, or watermark.

**로컬 저장과 개인정보 표지**

> Wide 3:2 premium editorial still-life photo for a Windows note-taking blog about choosing who has a copy of local documents. Close three-quarter view of a compact olive-green metal desktop filing box with an open lid and a few cream folders, at the center of a warm ivory desk with bold afternoon shadows. One small deep red document tab, understated real material textures, minimal premium editorial photography with a grainy print feel. Frame the box at the center and keep the scene calm. No writing, numbers, logos, people, watermark, or frame.

</details>
