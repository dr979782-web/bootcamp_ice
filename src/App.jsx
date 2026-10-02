import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import AnalysisPage from './pages/AnalysisPage.jsx';
import ComingSoonPage from './pages/ComingSoonPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { ROUTES } from './constants/navigation.js';

/**
 * 페이지별 라우팅
 * - Layout(헤더/푸터) 안에서 각 페이지가 <Outlet />으로 렌더링됩니다.
 * - 아직 만들지 않은 메뉴는 ComingSoonPage로 연결해 둠.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.ANALYSIS} element={<AnalysisPage />} />
        <Route path={ROUTES.OCEAN_WEATHER} element={<ComingSoonPage title="해양기상정보" />} />
        <Route path={ROUTES.OBSERVATION} element={<ComingSoonPage title="관측자료" />} />
        <Route path={ROUTES.SUPPORT} element={<ComingSoonPage title="고객센터" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
