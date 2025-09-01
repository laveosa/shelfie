import React, { JSX, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Home, User } from "lucide-react";
import TNFLogoIcon from "@/assets/icons/TNF_logo.svg?react";

import useAppForm from "@/utils/hooks/useAppForm.ts";
import { UserModel, UserModelDefault } from "@/const/models/UserModel.ts";
import UserFormScheme from "@/utils/validation/schemes/UserFormScheme.ts";
import SheForm from "@/components/complex/she-form/SheForm.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { IUserForm } from "@/const/interfaces/forms/IUserForm.ts";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import SheFormField from "@/components/complex/she-form/components/she-form-field/SheFormField.tsx";
import { ReactHookFormMode } from "@/const/enums/ReactHookFormMode.ts";
import SheAutocomplete from "@/components/primitive/she-autocomplete/SheAutocomplete.tsx";
import SheToggle from "@/components/primitive/she-toggle/SheToggle.tsx";
import { SheToggleTypeEnum } from "@/const/enums/SheToggleTypeEnum.ts";
import SheBadgeList from "@/components/primitive/she-badge-list/SheBadgeList.tsx";
import SheMultiSelect from "@/components/primitive/she-multi-select/SheMultiSelect.tsx";
import SheTimePicker from "@/components/primitive/she-time-picker/SheTimePicker.tsx";
import { DateFormatEnum } from "@/const/enums/DateFormatEnum.ts";
import { TimeFormatEnum } from "@/const/enums/TimeFormatEnum.ts";
import SheDatePicker from "@/components/primitive/she-date-picker/SheDatePicker.tsx";
import SheCalendar from "@/components/primitive/she-calendar/SheCalendar.tsx";
import SheTextArea from "@/components/primitive/she-textarea/SheTextarea.tsx";
import SheInputEditor from "@/components/primitive/she-input-editor/SheInputEditor.tsx";
import SheRadioGroup from "@/components/primitive/she-radio-group/SheRadioGroup.tsx";
import { ISheRadioItem } from "@/const/interfaces/primitive-components/ISheRadioItem.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { ISheToggle } from "@/const/interfaces/primitive-components/ISheToggle.ts";

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
        icon={TNFLogoIcon}
        formPosition={DirectionEnum.CENTER}
        title="User Form"
        minWidth="400px"
        view={ComponentViewEnum.CARD}
        notDisabledSubmit={notDisabledSubmit}
        onSubmit={onSubmit}
        onError={onErrorHandler}
        onCancel={onCancel}
      >
        <SheFormField
          name="firstName"
          render={({ field }) => (
            <SheInput
              label="First Name:"
              value={field.value}
              required
              fullWidth
              showClearBtn
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
              fullWidth
              showClearBtn
            />
          )}
        />
        <SheFormField
          name="nickName"
          render={({ field }) => (
            <SheInput
              label="Nick Name:"
              value={field.value}
              required
              fullWidth
              showClearBtn
            />
          )}
        />
        <SheFormField
          name="age"
          render={({ field }) => (
            <SheInput
              label="Age:"
              value={field.value}
              required
              fullWidth
              showClearBtn
            />
          )}
        />
        <SheFormField
          name="email"
          render={({ field }) => (
            <SheInput
              label="Email:"
              value={field.value}
              required
              fullWidth
              showClearBtn
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
              fullWidth
              showClearBtn
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
              fullWidth
              showClearBtn
            />
          )}
        />
        <SheFormField
          name="status"
          render={({ field }) => (
            <SheRadioGroup
              label="Status:"
              items={statusList}
              selected={field.value}
              required
              fullWidth
              showClearBtn
            />
          )}
        />
      </SheForm>
    </div>
  );
}

{
  /*<SheFormField
          name="nikName"
          render={({ field }) => (
            <SheInputEditor
              label="Nik name edit"
              value={field.value}
              required
              showClearBtn
              fullWidth
              hideErrorMessage
            />
          )}
        />
        <SheFormField
          name="status"
          render={({ field }) => (
            <SheRadioGroup
              label="Status"
              selected={field.value}
              items={statuses?.map(
                (item): ISheRadioItem<string> => ({
                  text: item,
                  value: item,
                }),
              )}
              required
              showClearBtn
            />
          )}
        />
        <SheFormField
          name="comment"
          render={({ field }) => (
            <SheTextArea
              label="Comment"
              value={field.value}
              required
              icon={Home}
              showClearBtn
              fullWidth
              hideErrorMessage
            />
          )}
        />
        <SheFormField
          name="multipleDate"
          render={({ field }) => (
            <SheDatePicker
              label="Multiple date"
              date={field.value}
              required
              icon={Home}
              mode="multiple"
              showClearBtn
              fullWidth
            />
          )}
        />
        <SheFormField
          name="rangeDate"
          render={({ field }) => (
            <SheDatePicker
              label="Range date"
              date={field.value}
              required
              icon={Home}
              mode="range"
              showClearBtn
              fullWidth
            />
          )}
        />
        <SheFormField
          name="dateBirth"
          render={({ field }) => (
            <SheDatePicker
              label="Single date"
              date={field.value}
              dateFormat={DateFormatEnum.MM_DD_YYYY}
              required
              icon={Home}
              mode="single"
              showClearBtn
              fullWidth
            />
          )}
        />*/
}
{
  /*<SheFormField
          name="multipleDate"
          render={({ field }) => (
            <SheCalendar
              label="Multiple date"
              date={field.value}
              dateFormat={DateFormatEnum.MM_DD_YYYY}
              required
              icon={Home}
              mode="multiple"
              showClearBtn
            />
          )}
        />
        <SheFormField
          name="rangeDate"
          render={({ field }) => (
            <SheCalendar
              label="Range date"
              date={field.value}
              dateFormat={DateFormatEnum.MM_DD_YYYY}
              required
              icon={Home}
              mode="range"
              showClearBtn
            />
          )}
        />
        <SheFormField
          name="dateBirth"
          render={({ field }) => (
            <SheCalendar
              label="Single date"
              date={field.value}
              dateFormat={DateFormatEnum.MM_DD_YYYY}
              required
              icon={Home}
              mode="single"
              showClearBtn
            />
          )}
        />*/
}
{
  /*<SheFormField
          name="units"
          render={({ field }) => (
            <SheMultiSelect
              label="Units"
              items={units}
              fullWidth
              selectedValues={field.value}
              showClearBtn
            />
          )}
        />
        <SheFormField
          name="alertTime"
          render={({ field }) => (
            <SheTimePicker
              label="Alert Time"
              date={field.value}
              timeFormat={TimeFormatEnum.HH_MM_SS}
              showClearBtn
            />
          )}
        />
        <SheFormField
          name="tags"
          render={({ field }) => (
            <SheBadgeList
              label="Tags"
              items={field.value}
              // items={positions}
              required
              showCloseBtn
              showClearBtn
              maxWidth="400px"
            />
          )}
        />
        <SheFormField
          name="nikName"
          render={({ field }) => (
            <SheAutocomplete
              label="Nik Name"
              searchValue={field.value}
              items={positions}
              showClearBtn
              fullWidth
              required
              hideErrorMessage
            />
          )}
        />
        <SheFormField
          name="isAvailable"
          render={({ field }) => (
            <SheToggle
              label="Is Available"
              checked={field.value}
              type={SheToggleTypeEnum.SWITCH}
            />
          )}
        />
        <SheFormField<UserModel>
          name="name"
          render={({ field }) => (
            <SheInput
              label="Name"
              value={field.value}
              placeholder="enter user name..."
              showClearBtn
              fullWidth
              minLength={4}
              maxLength={16}
              required
              hideErrorMessage
            />
          )}
        />
        <SheFormField
          name="email"
          render={({ field }) => (
            <SheInput
              label="Email"
              value={field.value}
              placeholder="enter user email..."
              type="email"
              showClearBtn
              fullWidth
              required
              hideErrorMessage
            />
          )}
        />
        <SheFormField
          name="address"
          render={({ field }) => (
            <SheInput
              label="Address"
              value={field.value}
              placeholder="enter user address..."
              showClearBtn
              fullWidth
            />
          )}
        />
        <SheFormField<UserModel>
          name="gender"
          render={({ field }) => (
            <SheSelect<string>
              label="Gender"
              selected={field?.value}
              items={genders}
              hideFirstOption
              showClearBtn
              fullWidth
              required
              placeholder="select user gender..."
            />
          )}
        />
        <SheFormField
          name="position"
          render={({ field }) => (
            <SheSelect
              label="Position"
              selected={field?.value}
              items={positions}
              hideFirstOption
              showClearBtn
              fullWidth
              placeholder="select user position..."
              icon={User}
            />
          )}
        />*/
}
