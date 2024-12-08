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
import { User, Send, Home, Wallet, Settings, LogOut, Goal } from "lucide-react";

const TopNavigation = ({ user, onSignOut }) => {
  const navigate = useNavigate();
  const navItems = [
    { icon: Wallet, label: "BudgetPlanning", path: "/budgetplanning" },
    { icon: Goal, label: "Saving Goals", path: "/savings" },
    { icon: Settings, label: "Account Management", path: "/accountmanagement" },
  ];

  return (
    <header className="bg-white border-b p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="./favicon.ico" alt="DreamStack" className="h-6 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800 mr-8">DreamStack</h1>
        <nav className="flex space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className="justify-start"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
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

const Footer = () => {
  return (
    <footer className="bg-white py-4 text-center text-gray-500">
      <div className="container mx-auto">
        <p>&copy; 2024 DreamStack. All rights reserved.</p>
      </div>
    </footer>
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
    <div className="flex flex-col h-screen">
      <TopNavigation user={user} onSignOut={handleSignOut} />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;