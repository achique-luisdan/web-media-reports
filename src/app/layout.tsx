import './globals.css'

export const metadata = {
  title: 'Lit Media Reports',
  description: 'Generador de vídeos de reportes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
