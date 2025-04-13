import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import { useEffect, useState } from "react";
import { UserModel } from "@/const/models/UserModel.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { SheTooltipEnum } from "@/const/enums/SheTooltipEnum.ts";
import { Search, User2 } from "lucide-react";
import UserForm from "@/components/forms/user-form/UserForm.tsx";

const gendersList = ["male", "female", "unicorn", "banana"];
const positionsList = [
  {
    id: 1,
    position: "developer",
  },
  {
    id: 2,
    position: "designer",
  },
  {
    id: 3,
    position: "manager",
  },
  {
    id: 4,
    position: "QA",
  },
];
const currentUser: UserModel = {
  id: 2323,
  name: "Steven",
  age: 32,
  gender: "male",
  email: "super_star@gmail.com",
  position: 1,
  isAvailable: true,
  address: "str. Levetano 5, house 24",
  comments: "some comments for test purpose only",
};

export function DashboardPage() {
  const service = useDashboardPageService();

  const [genders, setGenders] = useState<string[]>(null);
  const [positions, setPositions] = useState<any[]>(null);
  const [user, setUser] = useState<UserModel>(null);

  useEffect(() => {
    setTimeout(() => {
      setGenders(gendersList);
    }, 1000);
    setTimeout(() => {
      setPositions(positionsList);
    }, 2000);
    setTimeout(() => {
      setUser(currentUser);
    }, 4000);
  }, []);

  function onSubmitHandler(model) {
    console.log("SUBMIT: ", model);
  }

  function onCancelHandler(model) {
    console.log("CANCEL: ", model);
  }

  return (
    <div id={cs["DashboardPage"]}>
      {/*<UserForm<UserModel>
        data={currentUser}
        genders={gendersList}
        positions={positionsList}
        onSubmit={onSubmitHandler}
        onCancel={onCancelHandler}
      />*/}
      <UserForm<UserModel>
        data={user}
        genders={genders}
        positions={positions}
        onSubmit={onSubmitHandler}
        onCancel={onCancelHandler}
      />
    </div>
  );
}
