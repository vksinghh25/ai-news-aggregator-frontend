'use client';

import { useState, useEffect } from 'react';
import NewsCard from './components/NewsCard';

interface NewsItem {
  id: string;
  title: string;
  snippet: string;
  detailedSnippet: string;
  date: string;
  source: string;
  link: string;
  tags: string[];
}

// Utility functions for time formatting
function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const lastUpdate = new Date(timestamp);
  const diffMs = now.getTime() - lastUpdate.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  
  if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  } else {
    return 'just now';
  }
}

function getNextUpdateTime(): string {
  const now = new Date();
  const nextUpdate = new Date(now);
  nextUpdate.setHours(nextUpdate.getHours() + 2); // Next update in 2 hours
  
  const diffMs = nextUpdate.getTime() - now.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60)) % 60;
  
  if (diffHours > 0) {
    return `${diffHours}h ${diffMinutes}m`;
  } else {
    return `${diffMinutes}m`;
  }
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: NewsItem[];
  count: number;
  timestamp: string;
  lastUpdated?: string;
}

export default function Home() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentArchive, setCurrentArchive] = useState<string | null>(null);
  const [archiveLoading, setArchiveLoading] = useState(false);
  const [availableArchives, setAvailableArchives] = useState<any[]>([]);

  const handleNewsClick = async (news: NewsItem) => {
    setSelectedNews(news);
    setShowModal(true);
    setAnalysis(null); // Reset previous analysis
    
    // Fetch analysis for this specific news item
    await fetchAnalysis(news.id);
  };

  const fetchAnalysis = async (newsId: string) => {
    try {
      setAnalysisLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/news/analyze/${newsId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setAnalysis(result.analysis);
      } else {
        console.error('Failed to fetch analysis:', result.message);
      }
    } catch (err) {
      console.error('Error fetching analysis:', err);
    } finally {
      setAnalysisLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedNews(null);
    setAnalysis(null);
  };

  const fetchAvailableArchives = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/archive/list`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setAvailableArchives(result.data);
      } else {
        console.error('Failed to fetch archives:', result.message);
      }
    } catch (err) {
      console.error('Error fetching archives:', err);
    }
  };

  const fetchArchive = async (archiveId: string) => {
    try {
      setArchiveLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      if (archiveId === 'latest') {
        // Fetch current news
        const response = await fetch(`${apiUrl}/api/news`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const result: ApiResponse = await response.json();
        if (result.success) {
          setNewsData(result.data);
          setLastUpdated(result.lastUpdated || '');
          setCurrentArchive(null);
        } else {
          throw new Error(result.message || 'Failed to fetch news');
        }
      } else {
        // Fetch specific archive
        const response = await fetch(`${apiUrl}/api/archive/${archiveId}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const result = await response.json();
        if (result.success) {
          setNewsData(result.data.news);
          setLastUpdated(result.data.timestamp);
          setCurrentArchive(archiveId);
        } else {
          throw new Error(result.message || 'Failed to fetch archive');
        }
      }
    } catch (err) {
      console.error('Error fetching archive:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch archive');
    } finally {
      setArchiveLoading(false);
      setSidebarOpen(false); // Auto-close sidebar after selection (especially nice on mobile)
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/news`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result: ApiResponse = await response.json();
        
        if (result.success) {
          setNewsData(result.data);
          setLastUpdated(result.lastUpdated || '');
        } else {
          throw new Error(result.message || 'Failed to fetch news');
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    fetchAvailableArchives();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-6xl mx-auto px-8 py-16 text-center">
            <div className="mb-3">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-2">
                <span className="text-white/90 text-sm font-medium">🤖 AI-Powered News Analysis</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-relaxed">
                AI News
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 pb-4">
                  Aggregator
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Your weekly digest of the most important AI developments and their long-term implications.
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl"></div>
        </div>

        {/* Loading State */}
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 border border-blue-500">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              <span className="text-white font-medium">Loading latest AI news...</span>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-6xl mx-auto px-8 py-16 text-center">
            <div className="mb-3">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-2">
                <span className="text-white/90 text-sm font-medium">🤖 AI-Powered News Analysis</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-relaxed">
                AI News
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 pb-4">
                  Aggregator
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Your weekly digest of the most important AI developments and their long-term implications.
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl"></div>
        </div>

        {/* Error State */}
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 border border-red-500">
              <span className="text-white font-medium">⚠️ Error: {error}</span>
            </div>
            <div className="mt-4">
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 via-slate-800 to-gray-900">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-8 py-8 text-center">
          <div className="mb-3">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-2">
              <span className="text-white/90 text-sm font-medium">🤖 AI News - Analyzed by AI</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-relaxed">
              AI News
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 pb-4">
                Digest
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Cut through the AI noise. Get the stories that actually matter, <span className="text-blue-400 font-semibold">analyzed and ranked by AI</span>. 🚀
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl"></div>
      </div>

      {/* News Grid Section */}
      <div className="flex gap-8 mt-8">
        {/* Toggle Button */}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`fixed top-24 left-4 z-40 p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 transition-all duration-200 ${sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Left Sidebar Navigation */}
        <div className={`${sidebarOpen ? 'w-72' : 'w-0'} flex-shrink-0 transition-all duration-300 overflow-hidden pl-4`}>
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 w-64">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">News Timeline</h3>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="space-y-3">
              <button 
                onClick={() => fetchArchive('latest')}
                className="w-full text-left px-3 py-2 hover:bg-gray-700 text-gray-200 font-medium rounded-md transition-colors duration-200 flex items-center gap-3"
              >
                <span className={`w-3 h-3 rounded-full flex-shrink-0 ${
                  currentArchive === null ? 'bg-blue-500' : 'bg-gray-500'
                }`}></span>
                <span>Latest</span>
              </button>
              
              {availableArchives.map((archive) => (
                <button 
                  key={archive.id}
                  onClick={() => fetchArchive(archive.id)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-700 text-gray-200 font-medium rounded-md transition-colors duration-200 flex items-center gap-3"
                >
                  <span className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    currentArchive === archive.id ? 'bg-blue-500' : 'bg-gray-500'
                  }`}></span>
                  <span>{archive.displayName || archive.id}</span>
                </button>
              ))}
              
              {availableArchives.length === 0 && (
                <div className="text-gray-400 text-sm px-3 py-2">
                  No archives available yet
                </div>
              )}
            </nav>
          </div>
        </div>
        
        {/* News Grid */}
        <div className="flex-1 px-4 md:px-6 lg:px-8">
          {archiveLoading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 border border-blue-500">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                <span className="text-white font-medium">Loading archive...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {newsData.map((news, index) => (
                  <div 
                    key={news.id} 
                    className="animate-fade-in w-full"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <NewsCard news={news} onNewsClick={handleNewsClick} />
                  </div>
                ))}
              </div>
              
              {/* Update Status - Below the grid, left aligned */}
              <div className="mt-6 text-left">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span>Last updated {lastUpdated ? formatTimeAgo(lastUpdated) : 'recently'}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

             {/* Modal */}
       {showModal && selectedNews && (
         <div className="fixed inset-0 z-50">
           {/* Backdrop with blur effect */}
           <div 
             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
             onClick={closeModal}
           ></div>
           
           {/* Modal card */}
           <div className="relative flex items-center justify-center min-h-screen p-4">
             <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
               {/* Modal header */}
               <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6 rounded-t-2xl border-b border-gray-700">
                 <div className="flex justify-between items-start">
                   <h2 className="text-3xl font-bold text-white leading-tight pr-4">
                     {selectedNews.title}
                   </h2>
                   <button 
                     onClick={closeModal}
                     className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
                   >
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                     </svg>
                   </button>
                 </div>
               </div>
               
               {/* Modal content */}
               <div className="p-6">
                 <p className="text-base text-gray-300 leading-relaxed mb-6">
                   {selectedNews.detailedSnippet}
                 </p>
                 
                 <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center space-x-4 text-gray-400">
                     <span className="text-sm">📅 {new Date(selectedNews.date).toLocaleDateString()}</span>
                     <span className="text-sm">📰 {selectedNews.source}</span>
                   </div>
                 </div>
                 
                 {/* Placeholder for future content */}
                 <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
                   <h3 className="text-lg font-semibold text-white mb-3">Why This Matters</h3>
                   {analysisLoading ? (
                     <div className="text-gray-300 text-center py-4">
                       <div className="text-4xl mb-2">⚙️</div>
                       <p className="text-base">Loading AI analysis...</p>
                       <p className="text-sm text-gray-400 mt-1">We're analyzing the long-term implications and importance of this news</p>
                     </div>
                                       ) : analysis ? (
                      <div className="text-gray-300 space-y-4">
                        {/* Importance Score */}
                        <div className="text-left">
                          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 border border-blue-700 mb-2">
                            <span className="text-sm font-semibold">Importance: {analysis.importance?.score}/10</span>
                          </div>
                          <p className="text-sm text-gray-400">{analysis.importance?.reasoning}</p>
                        </div>
                        
                        {/* Key Implications */}
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-2">Key Implications:</h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            {analysis.keyImplications?.map((implication: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <span className="text-blue-400 mr-2">•</span>
                                {implication}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Divider */}
                        <hr className="border-gray-600" />
                        
                        {/* Industry Impact */}
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-2">Industry Impact:</h4>
                          <p className="text-sm text-gray-300">{analysis.industryImpact}</p>
                        </div>
                        
                        {/* Timeline */}
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-2">Timeline:</h4>
                          <p className="text-sm text-gray-300">{analysis.timeline}</p>
                        </div>
                        
                        {/* Divider */}
                        <hr className="border-gray-600" />
                        
                        {/* Risks & Opportunities */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-semibold text-red-400 mb-2">Risks:</h4>
                            <p className="text-sm text-gray-300">{analysis.risks}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-green-400 mb-2">Opportunities:</h4>
                            <p className="text-sm text-gray-300">{analysis.opportunities}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                     <div className="text-gray-300 text-center py-4">
                       <div className="text-4xl mb-2">🤖</div>
                       <p className="text-base">AI analysis coming soon...</p>
                       <p className="text-sm text-gray-400 mt-1">We'll analyze the long-term implications and importance of this news</p>
                     </div>
                   )}
                 </div>
                 
                 {/* Action buttons */}
                 <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
                   <button 
                     onClick={closeModal}
                     className="px-6 py-3 text-gray-300 hover:text-white font-medium transition-colors hover:bg-gray-700 rounded-lg"
                   >
                     Close
                   </button>
                   <a 
                     href={selectedNews.link} 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                   >
                     Read Full Article
                     <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                     </svg>
                   </a>
                 </div>
               </div>
             </div>
           </div>
         </div>
       )}
    </main>
  );
}
