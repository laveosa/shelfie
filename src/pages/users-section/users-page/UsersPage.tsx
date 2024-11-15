import cs from "./UsersPage.module.scss";
import useUsersPageService from "@/pages/users-section/users-page/useUsersPageService.ts";

export function UsersPage() {
  const service = useUsersPageService();

  return <div id={cs.UsersPage}>Users Page</div>;
}
