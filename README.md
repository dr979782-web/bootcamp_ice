# 북극 해빙 변화 분석 서비스 — 프론트엔드

React 18 + Vite + React Router + CSS Modules. 현재 구현 범위: **F-06 3변수 나란히 보기**.

## 실행

```bash
npm install
npm run dev      # http://localhost:5173/analysis
npm run build
```

## 폴더 구조

```
src/
├─ main.jsx                    # 진입점 (Router + AnalysisProvider)
├─ App.jsx                     # 페이지별 라우팅
├─ pages/
│  ├─ HomePage.jsx             # /
│  ├─ AnalysisPage.jsx         # /analysis  ← F-06 들어있는 페이지
│  ├─ ComingSoonPage.jsx       # 해양기상정보·관측자료·고객센터 (임시)
│  ├─ NotFoundPage.jsx         # 404
│  └─ Page.module.css
├─ components/
│  ├─ layout/                  # Header, Footer, Layout(Outlet)
│  ├─ common/                  # Card, Badge, Icon, ImageLightbox
│  └─ f06/                     # F-06 3변수 나란히 보기
│     ├─ TriVariableView.jsx   # 섹션 본체 (데스크탑 3열 / 모바일 스와이프·세로)
│     ├─ VariablePanel.jsx     # 변수 1개 카드 (이미지·로딩·빈 상태·확대)
│     ├─ PeriodStepper.jsx     # ‹ 1996년 1월 › 연월 이동
│     ├─ MobileLayoutToggle.jsx# 모바일: 스와이프 ↔ 세로 나열
│     ├─ SwipeDots.jsx         # 스와이프 위치 점
│     └─ index.js
├─ context/AnalysisContext.jsx # 공유 상태: year, month, variable, periods
├─ hooks/
│  ├─ useMediaQuery.js
│  └─ useScrollSnapIndex.js    # 스와이프 카드 현재 인덱스 추적
├─ assets/
│  ├─ logo.svg
│  ├─ imageRegistry.js         # images/ 폴더 자동 인식
│  └─ images/sic/sic_YYYY_MM.png
├─ constants/                  # variables.js, navigation.js
├─ utils/format.js
└─ styles/                     # tokens.css(디자인 토큰), global.css
```

## 이미지 추가 방법

`src/assets/images/<변수>/<변수>_<YYYY>_<MM>.png` 규칙으로 넣으면 자동 등록됩니다.

```
images/sic/sic_1997_01.png
images/tos/tos_1996_01.png
images/tas/tas_1996_01.png
```

- 현재 TOS·TAS 이미지는 없어서 **SIC 이미지를 임시로 대신 보여주고 "임시 이미지" 배지**가 붙습니다.
- TOS/TAS 이미지를 넣으면 자동으로 실제 이미지로 바뀝니다. 대체 자체를 끄려면
  `assets/imageRegistry.js`의 `TEMP_FALLBACK`에서 해당 줄을 지우세요.
- 연월 선택 목록은 SIC 이미지가 있는 연월 기준으로 만들어집니다.

## 반응형

| 폭 | F-06 레이아웃 |
|---|---|
| > 768px | 가로 3열 그리드 |
| ≤ 768px | 기본 **스와이프 카드**(scroll-snap, 다음 카드 살짝 보임 + 점 표시) / 토글로 **세로 나열** |

기본값은 `<TriVariableView defaultMobileLayout="swipe" />`에서 바꿀 수 있습니다.
