'use client'

import { useEffect } from 'react'

export default function OpenAndroidPage() {
  useEffect(() => {
    // JavaScript redirect to force external browser opening
    window.location.replace("https://play.google.com/store/apps/details?id=app.gotall.play&pli=1");
  }, [])

  return (
    <html lang="en">
      <head>
        <title>Opening Google Play...</title>
      </head>
      <body>
        <p>Opening Google Play Store...</p>
        <script>
          {`window.location.replace("https://play.google.com/store/apps/details?id=app.gotall.play&pli=1");`}
        </script>
      </body>
    </html>
  )
} 