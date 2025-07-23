'use client'

export default function IOSRedirectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Opening App Store...</h1>
          <p className="text-gray-600">Redirecting you to download GoTall on iOS</p>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">If this doesn't work:</h3>
            <div className="space-y-3 text-sm text-blue-800">
              <div className="flex items-start space-x-2">
                <span className="font-medium">1.</span>
                <span>Search for "GoTall" in the App Store</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-medium">2.</span>
                <span>Copy and paste this link in Safari: <code className="bg-blue-100 px-1 rounded text-xs break-all">https://apps.apple.com/us/app/gotall/id6747467975</code></span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-medium">3.</span>
                <span>Open this link in your external browser</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <a 
              href="https://apps.apple.com/us/app/gotall/id6747467975" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Open in External Browser
            </a>
            <button 
              onClick={() => {
                navigator.clipboard.writeText('https://apps.apple.com/us/app/gotall/id6747467975');
                alert('Link copied to clipboard!');
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Copy Link
            </button>
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <p>Having trouble? Try opening this page in Safari or Chrome</p>
        </div>
      </div>
    </div>
  );
} 