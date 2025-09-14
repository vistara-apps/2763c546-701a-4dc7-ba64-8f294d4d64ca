export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800">
      <div className="text-center space-y-4">
        <div className="flex justify-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-white rounded-full audio-wave"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        <p className="text-white text-lg font-medium">Loading AuraListen...</p>
      </div>
    </div>
  );
}
