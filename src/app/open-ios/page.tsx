'use client'

import { useEffect } from 'react'

export default function OpenIOSPage() {
  useEffect(() => {
    // JavaScript redirect to force Safari opening
    window.location.replace("https://apps.apple.com/us/app/gotall/id6747467975");
  }, [])

  return (
    <html lang="en">
      <head>
        <title>Opening App Store...</title>
      </head>
      <body>
        <p>Opening App Store...</p>
        <script>
          {`window.location.replace("https://apps.apple.com/us/app/gotall/id6747467975");`}
        </script>
      </body>
    </html>
  )
} 