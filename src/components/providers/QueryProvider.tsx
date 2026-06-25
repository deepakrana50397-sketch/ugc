'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // Initialize QueryClient inside useState to ensure it is only created once per client lifecycle
  // and is not shared across users/requests during SSR
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes cache validity
        refetchOnWindowFocus: false, // Prevents aggressive refetch on window focus
        retry: 1, // Limit network retries
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
