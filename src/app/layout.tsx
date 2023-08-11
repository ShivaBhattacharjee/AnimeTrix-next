import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SideBar from '../components/SideBar'
import TopNavbar from '../components/TopNavbar'
import ScrollToTop from '@/components/ScrollToTop'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AnimeTrix',
  description: 'An ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white max-w-[2500px] m-auto`}>
        <TopNavbar />
        <SideBar />
        <ScrollToTop/>
        <div className='flex flex-col ml-0 md:ml-20 lg:ml-64 '>
          {children}
        </div>
      </body>
    </html>
  )
}
