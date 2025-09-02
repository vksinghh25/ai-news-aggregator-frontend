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

interface NewsCardProps {
  news: NewsItem;
  onNewsClick: (news: NewsItem) => void;
  index: number;
}

export default function NewsCard({ news, onNewsClick, index }: NewsCardProps) {

  
  const tagColors = {
    'LLM/Models': 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700',
    'Tech/Infrastructure': 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700',
    'Research/Innovation': 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700',
    'Business/Industry': 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-700',
    'Policy/Regulation': 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700',
    'Security/Privacy': 'bg-pink-100 dark:bg-pink-900/50 text-pink-800 dark:text-pink-300 border-pink-300 dark:border-pink-700',
    'Applications': 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700',
    'Performance': 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-700'
  };

  return (
    <div className="group bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-300 dark:border-gray-700 card-hover h-[380px] w-full flex flex-col">
      {/* Header with solid background */}
              <div className="bg-gray-300 dark:bg-gray-700 p-6 border-b border-gray-400 dark:border-gray-600 flex-shrink-0">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2 mb-3">
            <a 
              href={news.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer"
            >
              <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">#{index + 1}</span>
              {news.title}
            </a>
          </h3>
          
          {/* Tags */}
          {news.tags && news.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {news.tags.map((tag, index) => (
                <span 
                  key={index}
                  className={`px-2 py-1 rounded-full text-xs font-medium border ${tagColors[tag as keyof typeof tagColors] || 'bg-gray-700/50 text-gray-300 border-gray-600'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Date */}
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium flex items-center gap-2 mb-0">
            <span className="text-gray-800 dark:text-gray-400">🗓️</span>
            {news.date}
          </span>
        </div>
      
      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed overflow-hidden h-[4.2rem]" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          {news.detailedSnippet}
        </p>
        
        {/* Why It Matters - Right after content */}
        <div 
          onClick={() => onNewsClick(news)}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm cursor-pointer transition-colors duration-200 mt-2"
        >
          Details & Why It Matters →
        </div>
        
        {/* Spacer - 1.5 lines of space */}
        <div className="h-6"></div>
        
        {/* Source - At bottom */}
        <div className="flex items-center space-x-2 w-full justify-start">
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full flex-shrink-0"></div>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{news.source}</span>
        </div>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}
