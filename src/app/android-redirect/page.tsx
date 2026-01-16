'use client'

export default function AndroidRedirectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-start/10 to-brand-end/10 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-brand-mid/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-brand-mid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          <div className="bg-brand-mid/10 border border-brand-mid/20 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Choose one option to download GoTall:</h3>
            <div className="space-y-3 text-sm text-gray-800">
              <div className="flex items-start space-x-2">
                <span className="font-medium">1.</span>
                <span>Use TikTok's "Open in External Browser" button (recommended)</span>
              </div>
              <div className="text-center text-brand-mid text-xs font-semibold">OR</div>
              <div className="flex items-start space-x-2">
                <span className="font-medium">2.</span>
                <span>Copy and paste this link in Chrome:</span>
              </div>
              <div className="bg-white rounded p-2 mb-2 border border-brand-mid/20">
                <code className="text-xs break-all text-gray-900">https://play.google.com/store/apps/details?id=app.gotall.play&pli=1</code>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <a 
              href="https://play.google.com/store/apps/details?id=app.gotall.play&pli=1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-brand-gradient hover:opacity-90 text-black font-semibold py-3 px-6 rounded-lg transition-opacity"
            >
              Open in External Browser
            </a>
            <button 
              onClick={() => {
                navigator.clipboard.writeText('https://play.google.com/store/apps/details?id=app.gotall.play&pli=1');
                alert('Link copied to clipboard!');
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
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