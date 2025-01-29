"use client"

import {
  Command,
  Frame,
  LifeBuoy,
  Newspaper
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/modules/common/components/nav-main"
import { NavProjects } from "@/modules/common/components/nav-projects"
import { NavSecondary } from "@/modules/common/components/nav-secondary"
import { NavUser } from "@/modules/common/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/modules/common/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Articles",
      icon: Newspaper,
      isActive: true,
      items: [
        {
          title: "List",
          url: "/dashboard/articles/list",
        },
        {
          title: "Create",
          url: "/dashboard/articles/create",
        },
      ],
    }
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    }
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    }
  ],
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  appName?: string,
  version?: string,
}

export function AppSidebar({ appName, version, ...props }: AppSidebarProps) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{appName}</span>
                  <span className="truncate text-xs">{version}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
