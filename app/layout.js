import './globals.css'

export const metadata = {
  title: 'Bible Verse Slide Generator',
  description: 'Generate slides for scripture readings',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}