import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AnalysisPage from './pages/AnalysisPage';
import DocumentationPage from './pages/DocumentationPage';
import GetStartedPage from './pages/GetStartedPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
          <Routes>
            <Route path="/" element={<GetStartedPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/documentation" element={<DocumentationPage />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-slate-200 py-4">
          <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} TrendLens. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;