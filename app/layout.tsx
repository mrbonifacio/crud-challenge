import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: "Project Manager",
  description:
    "A simple Next.js CRUD application with authentication, project management, and public/private project pages.",
  keywords: [
    "Next.js",
    "Prisma",
    "CRUD",
    "Projects",
    "Authentication",
    "ISR",
    "Revalidate Tags",
  ],
  authors: [{ name: "Vinicius Bonifacio" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
