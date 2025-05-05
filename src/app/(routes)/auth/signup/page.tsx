import { SignupForm } from '@/app/ui/signup-form';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Signup Form */}
      <SignupForm type={'signup'} />

      {/* Footer image pinned to bottom */}
      <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none">
        <Image src="/footer.png" alt="Waves" fill className="object-cover" priority />
      </div>
    </div>
  );
}
