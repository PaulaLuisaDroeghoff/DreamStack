import React from "react";
import { Outlet } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { User, Send, Home, Wallet, Settings, LogOut } from "lucide-react";

const NavigationSidebar = () => {
  const navigate = useNavigate();
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Send, label: "Transfer", path: "/transfer" },
    { icon: Wallet, label: "Accounts", path: "/accounts" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="bg-gray-50 w-64 border-r p-4 h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">MoneyFlow</h1>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate(item.path)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
    </div>
  );
};

const Header = ({ user, onSignOut }) => {
  return (
    <header className="bg-white border-b p-4 flex justify-end items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="font-medium">{user.name}</span>
              <span className="text-xs text-gray-500">{user.email}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={onSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

const App = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "/path/to/avatar.jpg",
  };

  const handleSignOut = () => {
    console.log("Signing out");
  };

  return (
    <div className="flex h-screen">
      <NavigationSidebar />
      <div className="flex-1 flex flex-col">
        <Header user={user} onSignOut={handleSignOut} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
