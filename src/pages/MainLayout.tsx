import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Outlet, useLocation } from 'react-router-dom';

export default function Page() {
  const location = useLocation();

  const pageTitles: { [key: string]: string } = {
    '/': 'Home',
    '/about': 'About Us',
    '/register': 'Register',
    '/data-privacy': 'Data Privacy',
    '/fire': 'Fire Safety',
    '/first-aid': 'First Aid',
    '/flood': 'Flood Safety',
    '/garbage': 'Garbage Disposal',
    '/pharmacy': 'Pharmacy',
    '/shelter': 'Shelter',
    '/traffic': 'Traffic Updates',
    '/tsunami': 'Tsunami Safety',
    '/utilities': 'Utilities',
    '/weather': 'Weather Forecast',
  };

  // Get the title based on the current path; default is "Home"
  const pageTitle = pageTitles[location.pathname] || '/';

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1 font-semibold text-lg text-orange-500">
                    {pageTitle}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Separator className="bg-orange-400 w-full" />
        <div className="flex flex-1 flex-col">
          <Outlet /> {/* Render nested routes */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
