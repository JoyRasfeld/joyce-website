import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-6 px-4 text-center">
        <h1 className="text-7xl font-bold text-primary md:text-9xl">
          404
        </h1>
        <div className="h-px w-24 bg-primary" />
        <div className="space-y-2">
          <h2 className="text-2xl text-foreground md:text-3xl">
            Page not found
          </h2>
          <p className="max-w-md text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/portfolio">View Portfolio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
