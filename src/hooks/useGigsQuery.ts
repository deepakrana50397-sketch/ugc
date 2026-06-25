'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getGigs, getGigBySlug, createGig } from '@/lib/services';
import { Gig } from '@/types/gig';

// Sample Server-State API Hooks using TanStack Query
// In a real app, replace the lib/services calls with fetch() or axios calls to your backend api route (e.g. /api/gigs)

// 1. Hook to fetch all Gigs (Queries are cached automatically)
export function useGigsQuery() {
  return useQuery<Gig[]>({
    queryKey: ['gigs'],
    queryFn: async () => {
      // Simulating API latency
      await new Promise((resolve) => setTimeout(resolve, 800));
      return getGigs();
    },
    staleTime: 1000 * 60 * 5, // Cache stays fresh for 5 minutes
  });
}

// 2. Hook to fetch a single Gig details by slug
export function useGigDetailQuery(slug: string) {
  return useQuery<Gig | undefined>({
    queryKey: ['gig', slug],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return getGigBySlug(slug);
    },
    enabled: !!slug, // Prevents executing if slug is undefined
  });
}

// 3. Mutation to create a new Gig (Invalidates the query cache to trigger re-fetches)
export function useCreateGigMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (gigData: Omit<Gig, 'id' | 'postedAt' | 'applicantsCount' | 'status' | 'brandId' | 'brandName' | 'brandLogo'>) => {
      // Simulating POST request to backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return createGig(gigData);
    },
    // On success, automatically invalidate the gigs list query cache
    // so any component displaying gigs will immediately pull the fresh list
    onSuccess: (newGig) => {
      queryClient.invalidateQueries({ queryKey: ['gigs'] });
      console.log('Gig created successfully, caching invalidated.', newGig);
    },
  });
}
