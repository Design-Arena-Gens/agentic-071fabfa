import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Minecraft AI Agent',
  description: 'Your intelligent assistant for everything Minecraft and its mods',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
