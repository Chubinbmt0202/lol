// react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// react
import { Analytics } from '@vercel/analytics/react';
import { Suspense } from 'react';

import { ExercisesProvider } from './pages/management/program/course/profileClass/provider/questionClass';

import ReactDOM from 'react-dom/client';

// react helmet
import { HelmetProvider } from 'react-helmet-async';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';

import App from '@/App';

import worker from './_mock';
// i18n
import './locales/i18n';
// tailwind css
import './theme/index.css';
import { StudentProvider } from './context/StudentContext';
import { StaffProvider } from './context/StaffContext';

const charAt = `
    ███████╗██╗      █████╗ ███████╗██╗  ██╗ 
    ██╔════╝██║     ██╔══██╗██╔════╝██║  ██║
    ███████╗██║     ███████║███████╗███████║
    ╚════██║██║     ██╔══██║╚════██║██╔══██║
    ███████║███████╗██║  ██║███████║██║  ██║
    ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
  `;
console.info(`%c${charAt}`, 'color: #5BE49B');

// 创建一个 client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // 失败重试次数
      gcTime: 300_000, // 缓存有效期 5m
      staleTime: 10_1000, // 数据变得 "陈旧"（stale）的时间 10s
      refetchOnWindowFocus: false, // 禁止窗口聚焦时重新获取数据
      refetchOnReconnect: false, // 禁止重新连接时重新获取数据
      refetchOnMount: false, // 禁止组件挂载时重新获取数据
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <ExercisesProvider>
        <StudentProvider>
          <StaffProvider>
        <Suspense>
          <Analytics />
          <App />
        </Suspense>
        </StaffProvider>
        </StudentProvider>
      </ExercisesProvider>
    </QueryClientProvider>
  </HelmetProvider>,
);

// 🥵 start service worker mock in development mode
worker.start({ onUnhandledRequest: 'bypass' });
