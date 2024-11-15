import cs from "./ProfilePage.module.scss";
import useProfilePageService from "@/pages/profile-page/useProfilePageService.ts";

export function ProfilePage() {
  const service = useProfilePageService();

  return <div id={cs.ProfileSection}>Profile Page</div>;
}
