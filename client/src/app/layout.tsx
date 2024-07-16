import React from 'react';
import './globals.css';

export const metadata = {
  title: '古参ドットコム',
  description: '未来のスーパースターと、未来のスーパースターを見つけたあなたを応援するサイト',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
