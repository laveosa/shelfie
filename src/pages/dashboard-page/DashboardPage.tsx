import cs from "./DashboardPage.module.scss";
import useDashboardPageService from "@/pages/dashboard-page/useDashboardPageService.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import UserFormScheme from "@/utils/validation/schemes/UserFormScheme.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserModel, UserModelDefault } from "@/const/models/UserModel.ts";
import useAppForm from "@/utils/hooks/useAppForm.ts";
import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";

export function DashboardPage() {
  const service = useDashboardPageService();

  const form = useAppForm<UserModel>({
    mode: "onBlur",
    resolver: zodResolver(UserFormScheme),
    defaultValues: UserModelDefault,
  });

  function onSubmitHandler(model) {
    console.log(model);
  }

  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard Section</h1>
      <SheForm form={form}></SheForm>
    </div>
  );
}
