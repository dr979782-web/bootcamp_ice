import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AnalysisProvider } from './context/AnalysisContext.jsx';
import './styles/tokens.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 분석 화면 전역 상태(연/월/변수) — 여러 섹션(F-01~F-14)이 공유 */}
      <AnalysisProvider>
        <App />
      </AnalysisProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
