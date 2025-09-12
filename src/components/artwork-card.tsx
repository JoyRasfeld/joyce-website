import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { Artwork } from '@/types/artwork';

interface ArtworkCardProps {
  artwork: Artwork;
  onClick?: () => void;
}

export function ArtworkCard({ artwork, onClick }: ArtworkCardProps) {
  return (
    <Card className="group cursor-pointer overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 bg-white p-0">
      <div
        className="aspect-[4/5] relative cursor-pointer overflow-hidden"
        onClick={onClick}
      >
        <Image
          src={artwork.imageUrl}
          alt={artwork.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
      </div>

      <CardContent className="px-4 py-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors duration-200 truncate">
              {artwork.title}
            </h3>
          </TooltipTrigger>
          <TooltipContent>
            <p>{artwork.title}</p>
          </TooltipContent>
        </Tooltip>
        <p className="text-muted-foreground text-sm mb-1">{artwork.medium}</p>
        <p className="text-muted-foreground text-sm mb-1">
          {artwork.dimensions}
        </p>
        <p className="text-muted-foreground text-sm">
          {new Date(artwork.completedAt).toLocaleDateString('en-US', {
            month: '2-digit',
            year: 'numeric',
          })}
        </p>
      </CardContent>
    </Card>
  );
}
