import React from 'react';

export const metadata = {
  title: 'My App',
  description: 'My awesome app',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
