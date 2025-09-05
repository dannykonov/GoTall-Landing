'use client'

export default function AndroidRedirectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Download GoTall</h1>
          <p className="text-gray-600">Unfortunately, TikTok's browser doesn't allow direct links to app stores. Here's how to download GoTall:</p>
        </div>

        <div className="space-y-4">
          {/* Info box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> TikTok restricts external app store links for security reasons. This is normal behavior, not an error.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">Follow these steps to download GoTall:</h3>
            <div className="space-y-3 text-sm text-green-800">
              <div className="flex items-start space-x-2">
                <span className="font-medium">1.</span>
                <span>Copy the download link below</span>
              </div>
              <div className="bg-green-100 rounded p-2 mb-2">
                <code className="text-xs break-all text-green-900">https://play.google.com/store/apps/details?id=app.gotall.play&pli=1</code>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-medium">2.</span>
                <span>Open Chrome or another browser</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-medium">3.</span>
                <span>Paste the link and download GoTall</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <button 
              onClick={() => {
                window.open('https://play.google.com/store/apps/details?id=app.gotall.play&pli=1', '_blank', 'noopener,noreferrer');
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open in External Browser
            </button>
            <button 
              onClick={() => {
                navigator.clipboard.writeText('https://play.google.com/store/apps/details?id=app.gotall.play&pli=1');
                alert('Link copied to clipboard!');
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Link
            </button>
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <p>Having trouble? Try opening this page in Chrome or Firefox</p>
        </div>
      </div>
    </div>
  );
} 