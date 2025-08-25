# AI News Aggregator Frontend

Next.js frontend application for the AI News Aggregator project.

## Features

- 🎨 Modern dark theme UI with Tailwind CSS
- 📱 Responsive design for all screen sizes
- 🔄 Real-time data fetching from backend API
- ⚡ Loading states and error handling
- 🎭 Smooth animations and hover effects

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment variables:**
   ```bash
   cp env.local .env.local
   # Edit .env.local with your backend API URL
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Backend Integration

The frontend now fetches news data from the backend API instead of using local mock data:

- **API Endpoint**: `http://localhost:3001/api/news`
- **Data Flow**: Frontend → Backend API → Mock Data (same as before)
- **Environment Variable**: `NEXT_PUBLIC_API_URL` for configurable backend URL

## API Response Format

```typescript
interface ApiResponse {
  success: boolean;
  message: string;
  data: NewsItem[];
  count: number;
  timestamp: string;
}
```

## Development

- **Port**: 3000 (configurable)
- **Backend Port**: 3001 (configurable via env var)
- **Hot Reload**: Enabled in development mode

## Next Steps

- [ ] Add real-time updates
- [ ] Implement news filtering/search
- [ ] Add user authentication
- [ ] Implement news bookmarking
- [ ] Add news sharing functionality
