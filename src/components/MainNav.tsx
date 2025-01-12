import { Home, Camera, Info, Mail, MessageCircle } from "lucide-react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

export function MainNav() {
  return (
    <NavigationMenu className="max-w-full w-full justify-between px-4 py-2 bg-sage-100">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className={navigationMenuTriggerStyle()}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/how-it-works" className={navigationMenuTriggerStyle()}>
            <Info className="mr-2 h-4 w-4" />
            How It Works
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/support" className={navigationMenuTriggerStyle()}>
            <MessageCircle className="mr-2 h-4 w-4" />
            Support
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}