import container from "@/main";
import { AppSidebar } from "@/modules/common/components/app-sidebar";
import {
    SidebarInset,
    SidebarProvider
} from "@/modules/common/components/ui/sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const systemInfo = await container.resolve("systems").getSystemInfo();
    return (
        <SidebarProvider>
            <AppSidebar appName={systemInfo?.appName} version={systemInfo?.version} />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}
