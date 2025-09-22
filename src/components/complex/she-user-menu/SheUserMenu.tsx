import {
  Cog,
  CreditCard,
  EllipsisVertical,
  LogOut,
  UserRoundCog,
  UserRoundPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import cs from "./SheUserMenu.module.scss";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import useDialogService from "@/utils/services/dialog/DialogService.ts";
import useAppService from "@/useAppService.ts";
import { getInitials } from "@/utils/helpers/quick-helper.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SheUserMenu({ user }) {
  const { logOut } = useAppService();
  const navigate = useNavigate();
  const { openConfirmationDialog } = useDialogService();

  async function handleLogout() {
    setTimeout(async () => {
      const confirmedLogOut = await openConfirmationDialog({
        headerTitle: "Logging out",
        text: `You are about to log out from your account.`,
        primaryButtonValue: "Log Out",
        secondaryButtonValue: "Cancel",
      });

      if (!confirmedLogOut) return;

      logOut();
    }, 100);
  }

  return (
    <SidebarMenu className={cs.sidebarMenu}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger className={cs.dropdownMenuTrigger} asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {user?.thumbnail && (
                  <AvatarImage src={user.thumbnail} alt="avatar" />
                )}

                <AvatarFallback className="rounded-lg">
                  {getInitials(undefined, user?.firstName, user?.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <img src="" alt="" />
                <span
                  className={`${cs.userText} she-text`}
                >{`${user?.firstName} ${user?.lastName}`}</span>
                <span className={`${cs.userText} she-subtext`}>
                  {user?.email}
                </span>
              </div>
              <SheIcon
                icon={EllipsisVertical}
                maxWidth="24px"
                color="#71717A"
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-48 rounded-lg"
            side="bottom"
            align="start"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={cs.dropdownMenuItem}
                onClick={() => navigate("/profile")}
              >
                <SheIcon
                  className={cs.dropdownMenuItemIcon}
                  icon={UserRoundCog}
                  maxWidth="20px"
                  color="#71717A"
                />
                <span className={`${cs.dropdownMenuItemText} she-text`}>
                  Account
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className={cs.dropdownMenuItem}>
                <SheIcon
                  className={cs.dropdownMenuItemIcon}
                  icon={UserRoundPlus}
                  maxWidth="20px"
                  color="#71717A"
                />
                <span className={`${cs.dropdownMenuItemText} she-text`}>
                  Invitations
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className={cs.dropdownMenuItem}>
                <SheIcon
                  className={cs.dropdownMenuItemIcon}
                  icon={CreditCard}
                  maxWidth="20px"
                  color="#71717A"
                />
                <span className={`${cs.dropdownMenuItemText} she-text`}>
                  Billing
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className={cs.dropdownMenuItem}>
                <SheIcon
                  className={cs.dropdownMenuItemIcon}
                  icon={Cog}
                  maxWidth="20px"
                  color="#71717A"
                />
                <span className={`${cs.dropdownMenuItemText} she-text`}>
                  Administration
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={cs.dropdownMenuItemLogOut}
              onClick={handleLogout}
            >
              <SheIcon
                className={cs.dropdownMenuItemIcon}
                icon={LogOut}
                maxWidth="20px"
                color="#71717A"
              />
              <span className={`${cs.dropdownMenuItemText} she-text`}>
                Log out
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
