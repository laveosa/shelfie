import cs from "./ProfilePage.module.scss";
import useProfilePageService from "@/pages/profile-page/useProfilePageService.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import useAppService from "@/useAppService.ts";

export function ProfilePage() {
  const service = useProfilePageService();
  const { logOut } = useAppService();

  return (
    <div id={cs["ProfileSection"]}>
      <p>Profile Page</p>
      <SheButton onClick={logOut}>Logout</SheButton>
    </div>
  );
}
