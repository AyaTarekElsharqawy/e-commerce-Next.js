
import "./globals.css"
import { CartProvider } from "./context/CartContext"
import { FavoritesProvider } from "./context/FavoritesContext"
import LayoutWrapper from "./components/LayoutWrapper"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen h-full flex flex-col bg-white text-gray-900 font-sans" suppressHydrationWarning>
        <CartProvider>
          <FavoritesProvider>
            <div className="flex flex-col flex-1 min-h-screen">
              <LayoutWrapper>{children}</LayoutWrapper>
            </div>
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  )
}