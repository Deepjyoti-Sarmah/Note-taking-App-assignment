import Header from "./Header"
import Sidebar from "./Sidebar"
import { cn } from "@/lib/utils"
import { useSidebarStore } from "@/store/sidebarState"

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    const { isOpen } = useSidebarStore()

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex h-[calc(100vh-4rem)]">
                <Sidebar />
                <main className={cn(
                    "flex-1 relative",
                    "transition-all duration-300 ease-in-out",
                    isOpen ? "md:ml-[240px]" : "md:ml-[50px]",
                )}>
                    {children}
                </main>
            </div>
        </div>
    )
}