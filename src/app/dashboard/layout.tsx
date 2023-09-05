import { Providers } from '@/components/Providers'
import '../globals.css'
import { ProtectedRoutes } from '@/components/ProtectRoutes'
import { Sidebar } from '@/components/Sidebar'


export default function RootLayout({
  
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <Providers>
          {/* <ProtectedRoutes> */}
          <div className='flex'>
            <div className='w-[280px]'>
              <Sidebar/>
            </div>
            <div className='bg-stone-800 w-full'>
              {children}
            </div>
          </div>

          {/* </ProtectedRoutes> */}
        </Providers>
  )
}
