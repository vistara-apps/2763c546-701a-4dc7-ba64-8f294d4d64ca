'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-center max-w-md w-full">
        <div className="text-6xl mb-4">🎧</div>
        <h2 className="text-2xl font-bold text-white mb-4">
          Something went wrong!
        </h2>
        <p className="text-white/80 mb-6">
          We encountered an issue while loading AuraListen. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors duration-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
