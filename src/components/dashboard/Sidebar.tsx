import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  CreditCard, 
  MessageSquare, 
  HelpCircle, 
  Menu,
  LayoutTemplate,
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AccountSettings } from "./AccountSettings";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export const Sidebar = ({ onMenuClick }: { onMenuClick: (menu: string) => void }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setUser({ ...user, profile });
      }
    };
    
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/auth");
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
    { icon: FileText, label: "Generated Content", id: "generated" },
    { icon: PlusCircle, label: "Generate Content", id: "generate" },
    { icon: LayoutTemplate, label: "Templates", id: "templates", soon: true },
    { icon: CreditCard, label: "Billing Plan", id: "billing" },
    { icon: MessageSquare, label: "Feedback", id: "feedback" },
    { icon: HelpCircle, label: "Help", id: "help" },
  ];

  return (
    <div className="bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen">
      <div className="p-4 flex justify-between items-center">
        {!isCollapsed && <span className="text-xl font-semibold">Menu</span>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onMenuClick(item.id)}
            className="w-full p-4 flex items-center gap-4 hover:bg-gray-100 transition-colors relative"
          >
            <item.icon className="w-5 h-5" />
            {!isCollapsed && (
              <>
                <span>{item.label}</span>
                {item.soon && (
                  <span className="absolute right-2 text-xs bg-gray-100 px-2 py-1 rounded-full">
                    soon
                  </span>
                )}
              </>
            )}
          </button>
        ))}
      </nav>

      {user && (
        <div className="mt-auto border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className={cn(
                "p-4 cursor-pointer hover:bg-gray-50",
                isCollapsed ? "text-center" : "flex items-center gap-3"
              )}>
                <Avatar>
                  <AvatarImage src={user.profile?.avatar_url} />
                  <AvatarFallback>
                    {user.profile?.full_name?.charAt(0) || user.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user.profile?.full_name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setShowSettings(true)}>
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AccountSettings
            open={showSettings}
            onOpenChange={setShowSettings}
            user={user}
          />
        </div>
      )}
    </div>
  );
};
