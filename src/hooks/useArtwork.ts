import { useState, useEffect } from 'react';

import type { Artwork } from '@/types';

interface UseArtworkOptions {
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export function useArtwork(options: UseArtworkOptions = {}) {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArtworks() {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (options.limit) params.append('limit', options.limit.toString());
        if (options.sortBy) params.append('sortBy', options.sortBy);
        if (options.sortOrder) params.append('sortOrder', options.sortOrder);

        const url = `/api/artwork${
          params.toString() ? `?${params.toString()}` : ''
        }`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch artworks');
        }

        const data = await response.json();
        setArtworks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchArtworks();
  }, [options.limit, options.sortBy, options.sortOrder]);

  return { artworks, loading, error };
}
