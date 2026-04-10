import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 bg-black border-t border-white/10 text-center relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <p className="text-gray-500 font-medium flex items-center justify-center gap-1">
          Designed and built with <Heart className="w-4 h-4 text-red-500 fill-red-500 mx-1" /> by Kalpit Agarwal
        </p>
        <p className="text-gray-600 text-sm mt-2">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
