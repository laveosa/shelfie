import React, { JSX, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import useAppForm from "@/utils/hooks/useAppForm.ts";
import { UserModel, UserModelDefault } from "@/const/models/UserModel.ts";
import UserFormScheme from "@/utils/validation/schemes/UserFormScheme.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { IUserForm } from "@/const/interfaces/forms/IUserForm.ts";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import { DateFormatEnum } from "@/const/enums/DateFormatEnum.ts";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import SheRadioGroup from "@/components/primitive/she-radio-group/SheRadioGroup.tsx";
import { ISheRadioItem } from "@/const/interfaces/primitive-components/ISheRadioItem.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheTextArea from "@/components/primitive/she-textarea/SheTextarea.tsx";
import SheToggle from "@/components/primitive/she-toggle/SheToggle.tsx";
import { SheToggleTypeEnum } from "@/const/enums/SheToggleTypeEnum.ts";
import SheMultiSelect from "@/components/primitive/she-multi-select/SheMultiSelect.tsx";
import SheBadgeList from "@/components/primitive/she-badge-list/SheBadgeList.tsx";
import { CalendarModeEnum } from "@/const/enums/CalendarModeEnum.ts";
import SheCalendar from "@/components/primitive/she-calendar/SheCalendar.tsx";
import SheInputEditor from "@/components/primitive/she-input-editor/SheInputEditor.tsx";

const statusList: ISheRadioItem<string>[] = [
  {
    text: "Active",
    value: "active",
  },
  {
    text: "Pending",
    value: "pending",
  },
  {
    text: "Vacation",
    value: "vacation",
  },
  {
    text: "Fired",
    value: "fired",
  },
  {
    text: "Unemployed",
    value: "unemployed",
  },
  {
    text: "Employed",
    value: "employed",
  },
];

const gendersList: ISheSelectItem<string>[] = [
  {
    text: "Male",
    value: "male",
  },
  {
    text: "Female",
    value: "female",
  },
  {
    text: "Unicorn",
    value: "unicorn",
  },
  {
    text: "Banana",
    value: "banana",
  },
];

const nationalityList: ISheSelectItem<string>[] = [
  {
    icon: "https://www.countryflags.com/wp-content/uploads/ukraine-flag-png-large.png",
    text: "Ukraine",
    value: "UA",
  },
  {
    icon: "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-large.png",
    text: "United States of America",
    value: "US",
  },
  {
    icon: "https://www.countryflags.com/wp-content/uploads/united-kingdom-flag-png-large.png",
    text: "United Kingdom",
    value: "GB",
  },
  {
    icon: "https://www.countryflags.com/wp-content/uploads/turkey-flag-png-large.png",
    text: "Turkey",
    value: "TR",
  },
  {
    icon: "https://www.countryflags.com/wp-content/uploads/switzerland-flag-png-large.png",
    text: "Switzerland",
    value: "CH",
  },
  {
    icon: "https://www.countryflags.com/wp-content/uploads/sweden-flag-png-large.png",
    text: "Sweden",
    value: "SE",
  },
  {
    icon: "https://www.countryflags.com/wp-content/uploads/spain-flag-png-large.png",
    text: "Spain",
    value: "ES",
  },
  {
    icon: "https://www.countryflags.com/wp-content/uploads/romania-flag-png-large.png",
    text: "Romania",
    value: "RO",
  },
  {
    icon: "https://www.countryflags.com/wp-content/uploads/monaco-flag-png-large.png",
    text: "Poland",
    value: "PL",
  },
  {
    icon: "https://www.countryflags.com/wp-content/uploads/norway-flag-png-large.png",
    text: "Norway",
    value: "NO",
  },
  {
    icon: "https://www.countryflags.com/wp-content/uploads/portugal-flag-400.png",
    text: "Portugal",
    value: "PT",
  },
  {
    icon: "https://www.countryflags.com/wp-content/uploads/brazil-flag-png-large.png",
    text: "Brazil",
    value: "BR",
  },
];

const maritalStatusList: ISheRadioItem<string>[] = [
  {
    text: "Married",
    value: "married",
  },
  {
    text: "Single",
    value: "single",
  },
  {
    text: "Divorced",
    value: "divorced",
  },
  {
    text: "In Relationship",
    value: "inRelationship",
  },
];

const positionList: ISheSelectItem<string>[] = [
  {
    text: "Frontend",
    value: "frontend",
  },
  {
    text: "Backend",
    value: "backend",
  },
  {
    text: "HR",
    value: "HR",
  },
  {
    text: "SEO",
    value: "SEO",
  },
  {
    text: "Designer",
    value: "designer",
  },
];

const contactVariety: string[] = [
  "phone",
  "email",
  "sms",
  "skype LOL",
  "discord",
  "ms teams",
  "slack",
];

const interestsList: ISheSelectItem<number>[] = [
  {
    icon: "https://www.svgrepo.com/show/474334/coding.svg",
    text: "Programing",
    value: 1,
  },
  {
    icon: "https://www.svgrepo.com/show/84264/recipes.svg",
    text: "Cooking",
    value: 2,
  },
  {
    icon: "https://www.svgrepo.com/show/533551/car.svg",
    text: "Driving car",
    value: 3,
  },
  {
    icon: "https://www.svgrepo.com/show/521766/music-note.svg",
    text: "Music",
    value: 4,
  },
  {
    icon: "https://www.svgrepo.com/show/164256/television.svg",
    text: "TV",
    value: 5,
  },
  {
    icon: "https://www.svgrepo.com/show/281945/painting-art.svg",
    text: "Painting",
    value: 6,
  },
  {
    icon: null,
    text: "Hiking",
    value: 7,
  },
  {
    icon: "",
    text: "Sport",
    value: 8,
  },
];

// use this example model
export const userFormExampleModel: UserModel = {
  id: "2323_SDJKLkkaW32kjanlISJI",
  firstName: "John",
  lastName: "Doe",
  nickName: "",
  age: 30,
  email: "startlord0521882@example.com",
  phone: "+1 123-456-7890",
  address: "5/24 Levetano Str. Odessa, Ukraine",
  workStatus: "active",
  dateBirth: new Date("05.21.1982"),
  gender: "male",
  nationality: "UA",
  maritalStatus: "single",
  position: "frontend",
  comment:
    "some comment for test, 233333333333333333333333333333, some comment for test, 233333333333333333333333333333, some comment for test, 233333333333333333333333333333, some comment for test, 233333333333333333333333333333, ",
  isAvailable: true,
  isRemote: true,
  communicationPreferences: ["phone", "email", "ms teams", "slack"],
  interests: [1, 2, 3, 4, 5],
  contractPeriod: {
    from: "09.05.2025",
    to: "09.15.2025",
  },
  leaveDays: ["09.05.2025", "09.11.2025", "09.17.2025", "09.23.2025"],
};

export default function UserForm({
  data,
  notDisabledSubmit,
  onSubmit,
  onCancel,
}: IUserForm): JSX.Element {
  const form = useAppForm<UserModel>({
    mode: ReactHookFormMode.BLUR,
    resolver: zodResolver(UserFormScheme),
    defaultValues: UserModelDefault,
  });

  const commonProps: any = {
    fullWidth: true,
    showClearBtn: true,
    hideErrorMessage: true,
  };

  const formFieldWrapperClassName = "flex gap-5 !mb-5 w-full";

  useEffect(() => {
    form.reset(data);
  }, [data]);

  // ================================================================ EVENTS

  // ================================================================ PRIVATE

  function _getStateDescription(value: string) {
    switch (value) {
      case "active":
        return "We will be contacting with you ASAP.";
      case "pending":
        return "Please let us know when you will be open to new and promising collaborations.";
      case "vacation":
        return "Have a nice vacation, we are looking forward to seeing you back.";
      case "fired":
        return "Well... it is what it is :)";
      case "unemployed":
        return "We can change that!";
      case "employed":
        return "We have decent offers which might be interesting for you, please contact with our managers at any time, it will be worth it for you.";
    }
  }

  // ================================================================ RENDER

  function onErrorHandler(model) {
    console.log(model);
  }

  return (
    <div className="flex justify-center">
      <SheForm<UserModel>
        id="USER_FORM"
        form={form}
        defaultValues={UserModelDefault}
        title="User Form"
        minWidth="600px"
        maxWidth="600px"
        view={ComponentViewEnum.CARD}
        notDisabledSubmit={notDisabledSubmit}
        onSubmit={onSubmit}
        onError={onErrorHandler}
        onCancel={onCancel}
      >
        <div className={formFieldWrapperClassName}>
          <SheFormField
            name="firstName"
            ignoreFormAction // SWITCH OF INTUITIVE FORM ACTIONS FOR MANUAL USAGE (for test only)
            render={({ field }) => (
              <SheInput
                label="First Name:"
                value={field.value}
                required
                minLength={2}
                maxLength={20}
                onChange={field.onChange} // manual updating form field value (for test only)
                {...commonProps}
              />
            )}
          />
          <SheFormField
            name="lastName"
            render={({ field }) => (
              <SheInput
                label="Last Name:"
                value={field.value}
                required
                {...commonProps}
              />
            )}
          />
        </div>
        <div className={formFieldWrapperClassName}>
          <SheFormField
            name="nickName"
            render={({ field }) => (
              <SheInputEditor
                label="Nick Name:"
                value={field.value}
                {...commonProps}
              />
            )}
          />
          <SheFormField
            name="gender"
            ignoreFormAction // SWITCH OF INTUITIVE FORM ACTIONS FOR MANUAL USAGE (for test only)
            render={({ field }) => (
              <SheSelect
                label="Gender:"
                items={gendersList}
                selected={field.value}
                required
                onSelect={(value) => {
                  // manual updating form field value (for test only)
                  field.onChange(value);
                  void form.trigger(field.name);
                }}
                {...commonProps}
              />
            )}
          />
        </div>
        <div className={formFieldWrapperClassName}>
          <SheFormField
            name="age"
            render={({ field }) => (
              <SheInput
                label="Age:"
                value={field.value}
                type="number"
                required
                {...commonProps}
              />
            )}
          />
          <SheFormField
            name="dateBirth"
            render={({ field }) => (
              <SheDatePicker
                label="Date Birth:"
                date={field.value}
                dateFormat={DateFormatEnum.MM_DD_YYYY}
                required
                {...commonProps}
              />
            )}
          />
        </div>
        <div className={formFieldWrapperClassName}>
          <SheFormField
            name="email"
            render={({ field }) => (
              <SheInput
                label="Email:"
                value={field.value}
                required
                {...commonProps}
              />
            )}
          />
          <SheFormField
            name="phone"
            render={({ field }) => (
              <SheInput
                label="Phone:"
                value={field.value}
                required
                {...commonProps}
              />
            )}
          />
        </div>
        <div className={formFieldWrapperClassName}>
          <SheFormField
            name="nationality"
            render={({ field }) => (
              <SheSelect
                label="Nationality:"
                items={nationalityList}
                selected={field.value}
                showSelectIcon
                required
                {...commonProps}
              />
            )}
          />
          <SheFormField
            name="address"
            render={({ field }) => (
              <SheInput
                label="Address:"
                value={field.value}
                required
                {...commonProps}
              />
            )}
          />
        </div>
        <div className={formFieldWrapperClassName}>
          <SheFormField
            name="workStatus"
            render={({ field }) => (
              <SheRadioGroup
                label="Work Status:"
                items={statusList}
                selected={field.value}
                required
                description={_getStateDescription(field.value)}
              />
            )}
          />
          <SheFormField
            name="maritalStatus"
            render={({ field }) => (
              <SheRadioGroup
                label="Marital Status:"
                items={maritalStatusList}
                selected={field.value}
                required
              />
            )}
          />
        </div>
        <div className={formFieldWrapperClassName}>
          <SheFormField
            name="position"
            render={({ field }) => (
              <SheSelect
                label="Position:"
                items={positionList}
                selected={field.value}
                required
                {...commonProps}
              />
            )}
          />
          <SheFormField
            label="Contact:"
            name="communicationPreferences"
            required
            ignoreFormAction
            render={({ field }) => (
              <div className="flex gap-2 w-full flex-wrap">
                {contactVariety.map((item, idx) => (
                  <SheToggle key={item + idx} text={item} />
                ))}
              </div>
            )}
          />
        </div>
        <SheFormField
          name="interests"
          ignoreFormAction
          render={({ field }) => (
            <div className="flex flex-col gap-2 mb-5 w-full">
              <SheMultiSelect
                label="Interests:"
                items={interestsList}
                selectedValues={field.value}
                fullWidth
                showClearBtn
                onSelect={field.onChange}
              />
              <SheBadgeList
                items={
                  interestsList.filter((item) =>
                    field.value?.includes(item.value),
                  ) as any
                }
                showCloseBtn
                onClose={(item) => {
                  field.onChange(
                    field.value?.filter((value) => value !== item.value),
                  );
                }}
              />
            </div>
          )}
        />
        <SheFormField
          name="comment"
          render={({ field }) => (
            <SheTextArea
              label="Comment:"
              className="!mb-2.5"
              value={field.value}
              {...commonProps}
            />
          )}
        />
        <div className="flex gap-2.5 !mb-5">
          <SheFormField
            name="isAvailable"
            render={({ field }) => (
              <SheToggle
                text="Is Available"
                checked={field.value}
                minWidth="140px"
                type={SheToggleTypeEnum.SWITCH}
              />
            )}
          />
          <SheFormField
            name="isRemote"
            render={({ field }) => (
              <SheToggle
                text="Is Remote"
                checked={field.value}
                minWidth="140px"
                type={SheToggleTypeEnum.SWITCH}
              />
            )}
          />
        </div>
        <div className="flex gap-5 w-full">
          <SheFormField
            name="contractPeriod"
            render={({ field }) => (
              <SheCalendar
                label="Contract Period:"
                date={field.value}
                mode={CalendarModeEnum.RANGE}
              />
            )}
          />
          <SheFormField
            name="leaveDays"
            render={({ field }) => (
              <SheCalendar
                label="Leave Days:"
                date={field.value}
                mode={CalendarModeEnum.MULTIPLE}
              />
            )}
          />
        </div>
      </SheForm>
    </div>
  );
}
