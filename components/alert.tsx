import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RocketIcon } from 'lucide-react';

export function AlertDemo() {
  return (
    <div className="w-full max-w-6xl px-6 py-4">
      <Alert className="px-6 rounded-xl border-0 ring ring-primary/20 ring-inset text-secondary bg-primary/15 text-black dark:text-white cursor-default">
        <AlertTitle className="flex gap-1">
          <RocketIcon className="h-4 w-4" />
          Heads up!
        </AlertTitle>
        <AlertDescription>
          The first 50 clients (28 Left) will get an exclusive {' '}
          <a
            href="#pricing"
            className="text-primary transition duration-300 hover:underline"
          >
            50%
          </a> discount!
        </AlertDescription>
      </Alert>
    </div>
  );
}
