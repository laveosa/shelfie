import React, { useEffect, useState } from "react";

import cs from "./DashboardPage.module.scss";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { UserModel } from "@/const/models/UserModel.ts";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";
import { ContextPatternEnum } from "@/const/enums/ContextPatternEnum.ts";
import UserForm from "@/components/forms/user-form/UserForm.tsx";
import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheCalendar from "@/components/primitive/she-calendar/SheCalendar.tsx";

const badges: ISheBadge<any>[] = [
  {
    text: "JS",
  },
  {
    icon: "https://www.svgrepo.com/show/303206/javascript-logo.svg",
  },
  {
    text: "JS",
    icon: "https://www.svgrepo.com/show/303206/javascript-logo.svg",
    value: {
      logo: "https://www.svgrepo.com/show/303206/javascript-logo.svg",
      value: "JS",
      description: "programing language",
      priority: 1,
      isActive: true,
    },
  },
  {
    text: "Angular",
    icon: "https://www.svgrepo.com/show/353396/angular-icon.svg",
    value: 111,
  },
  {
    text: "React",
    icon: "https://www.svgrepo.com/show/452092/react.svg",
    value: "in Progress",
  },
  {
    text: "Vue",
    icon: "https://www.svgrepo.com/show/452130/vue.svg",
    value: ["to", "do"],
  },
  {
    text: "Knockout",
    icon: "https://cdn.prod.website-files.com/62865614b39c464b76d339aa/683f1b2987a7298d7434d17d_Knockoutjs.svg",
    value: false,
  },
  {
    text: "Flutter",
    icon: "https://images.seeklogo.com/logo-png/35/2/flutter-logo-png_seeklogo-354671.png",
    value: ContextPatternEnum.EMAIL,
  },
];

const unitsString: ISheOption<string>[] = [
  {
    icon: "https://divers.gg/_next/image?url=https%3A%2F%2Fcms.divers.gg%2Fwp-content%2Fuploads%2F2025%2F02%2FCW-9-White-Wolf-Helmet.png&w=64&q=75",
    text: "CW-9 White Wolf",
    description:
      "The pattern used for this armor is the result of the Winter Camouflage Improvement Effort, which considered 136 entrants before determining the color white would best blend in with snow.",
    value: "CW-9 White Wolf",
  },
  {
    icon: "data:image/jpeg;base64,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",
    text: "IE-12 Righteous",
    description:
      "Modeled after the myriad Statues of Judicious Liberty, who keep a watchful eye on checkout lines, schoolyards, perpetual rehabilitation communities, and public confession theaters.",
    value: "IE-12 Righteous",
  },
  {
    icon: "https://cms.divers.gg/wp-content/uploads/2025/02/IE-3-Martyr-helmet.png",
    text: "IE-3 Martyr",
    description:
      "Modeled after the Statue of Mournful Liberty, who weeps over the existence of tyranny, this armor is worn by those who would give their lives to dry her tears.",
    value: "IE-3 Martyr",
  },
  {
    icon: "https://tiermaker.com/images/media/template_images/2024/16524605/helldivers-helmets-16524605/screenshot-2024-06-09-at-23-15-07-fs-34-exterminator-armor---helldivers-2-wiki.png",
    text: "FS-34 Exterminator",
    description:
      "Features a patented non-stick coating, which makes scraping viscera off after a long day of battle less taxing.",
    value: "FS-34 Exterminator",
  },
  {
    icon: "https://tiermaker.com/images/media/template_images/2024/16524605/helldivers-helmets-16524605/screenshot-2024-06-09-at-23-10-05-ce-81-juggernaut-armor---helldivers-2-wiki.png",
    text: "CE-81 Juggernaut",
    description:
      "One of the most durable engineer armors available, each set is quality tested by an impact with a full-grown Charger.",
    value: "CE-81 Juggernaut",
  },
];

const unitsNumber: ISheOption<number>[] = [
  {
    icon: "https://divers.gg/_next/image?url=https%3A%2F%2Fcms.divers.gg%2Fwp-content%2Fuploads%2F2025%2F02%2FCW-9-White-Wolf-Helmet.png&w=64&q=75",
    text: "CW-9 White Wolf",
    description:
      "The pattern used for this armor is the result of the Winter Camouflage Improvement Effort, which considered 136 entrants before determining the color white would best blend in with snow.",
    value: 111,
  },
  {
    icon: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgEAB//EADcQAAIBAwIDBQYFAwUBAAAAAAECAwAEEQUhEjFBBhMiUWEUMnGBkcEjUqGx8BUkM0KC0eHxB//EABcBAAMBAAAAAAAAAAAAAAAAAAABAgP/xAAcEQEBAAMBAQEBAAAAAAAAAAAAAQIRIUExEjL/2gAMAwEAAhEDEQA/APj8w8NCr1oyf3KDTrQHG92uRipuPDXIh0oCMtE2OmXuonhsraSbHNlHhHxJ2Fa/sb2Ng1HT7jtBrzvDpFsrMFGQZ+H3vXhGMbbk7Cu3nai2u8W1raiystlQKRsPLA2GTjOM8ufPL82W2bGhXoXlESOgkB/UbfrQV1aXFqB38LID1I2+tbaKPKgqQQeRFSMYZSkiBlOxVhkGs/00/D59GMZrxHWnusaJ7MGuLQZg5snVP+qR1aLNORrjJrjE5qxthiq8UAzuFxHQKDc0xuh+FS9OZoCTjw0d2b01dX1yz0+SYQxTyYllJxwRgFnbPooNByDw0VoSwvrNkt1K0UHfK0jqMkKNzgdTtsOtAbn/AOia+n9OXR9IgeKwYr4sYDRKoMaKOfDhlbPXbnvWWurPij0yMcpVhOPTgXP3+lEa/qV3rWpB/Y4rQJwxrHks2wCjiPngD9a1XZltZewvtPtdQ05WhVTwz2eS2c7I3FsdqtDK6NePFPJYSNkoTwetNHvQGCuBt1pLeWmpWl0ZJoU75W4j3ZIOd+Y+tHSMjxJLj31BBFY5TVbYXg9JUfZSD6VkdcsBZXeYlxDJuo/Keop3CSH2OBmuazH7VpsoGC8XjU/Dn+maUuqeXYyZ3r2K8OVSrRmZXg/CoCNetMb3/HQkY8IoDjjw12y4hdoY24XAYqc4weE1Nhla9aRd5fQRHHiO/Tn/AAUBC4ae3umt+Ny54ckE5yQD96f3lvqVhaw3NpdXtvPImSIpCOJBg81+P70LZJbJfyTX0wTu0xkrk52QD4jOf9tbi81Xs/ewd1YXscsQhbgg4SGXDM22euN+vKneFj18oadppeKUs5JyWYlia0XZ24EsD20oGUOU9RRbaTa3TkwSxHI2Mgpbqcf9MvEaLAkRshAcjHl86Vm4cuqcyIg292qsJgqGzkbj0q6CSO7jWRMAMM8NQlt+F+JNt+VZNaxzLwOU/KSPpUsVKUf3Uo8pG/ep8Nasht9/jFCxjwCrryQOpA6VVGfAKAsbAUk8hQ1uT7RHg4Jcb/OpXUwPgibK48Rxjf8An886EPAVbyOaCbO1ttIh0q/vdSkmmu5k7u1t4o+IsxHvH0GMn4etW6JPpFkVENrLbSk4S6urf3j5BulJVu3GmTssjd5IBESDjKc8eo2G3oPKj9P1C+kLSSyySKw4JYuNjkDlsSeIDbb4U8vhYitS0yEd5PaTKkR3KryU+Q9Ky1/CVcnxEA4LEdfvTxmWMOFduBjxJGvhUb9R9aU6vcu/AjMSBnA6D4eVSsRptqt7Z8McpSaMkFf2ouIajaf5R38I9ckUhsLmS2uklj2OcEeYrbMVzkMMH1qclY9ZLUbZY9TkaLeKX8RfnzH1zVfBT7WLdHSOdMEqeF8ev/lK+7FVPib9A3CqowhyKiw/BI9K5ccIlZY8lQdiTVO45KfkaOkl3Rc7HeuyWskahmBweRwcGtXoXZxzb2tzqI4PasG2gQ4kkH5nJyETHXGT09au2OnHTdWiaGwkjtOAIxkYsZiPfJJyeuPlyqvC9ID3kVuQ2+DjHltVkOrdwwIQ8Stkb46YqF6n9zIE8YG3EF51StujEBg/PnjbFAgmTUry7Y8IJJ6k5P1NRXTLybxyFE8y7/8AFULYTOfBC3CfTerptEv4raK4aBhFKzInqRzH6ikpEQJbXCq0qyHIzwj9KJutYZpCArLjodj9K9Do0lvh7zKnOBGNjyzv8qaW9nxnvJOCMEjhLNzP35VNsOS6UaVp+q3kMlxFEvdg8PC78LP8AedVXNtc2snd3EMiPjOCvSntkTaklJz3AGMnoOZxmotrqKxAuplHl3yn7Ud8PU9YtuWaZdl9Oj1XWYba5Zlt8F5SOfCBy+ZwKUyE4Fa7sFAhknk34ioGfrVz6zb7QJobnXJpbk8TQRiO3yuwYn026L9BWc7fySXM8Fr7SM26NPJnYHj3ByBz94Ada5aX1xbeztE+GkugXOOe4FZ/tnK663PAGJQxxA568IOP3ox/kX6VGMrzfJ9GNTjjcqWDnhUgkBt6G4mIAJJC8vSmGjANM4bccBbB6kUwZWNxEIGafflg8ZBPxxuf3oeW6PeeByqAeHh2x54HT+ZNBMxwu9EWSK0hJ/0gsPlvWduurneCy+Y0uLwZUDhjjGxfzyeoydzXradru5D3AJTfCpsB1IA/n7UslleWQvIxZqf9lUD+1ytu6W7BT+XJA+5qLjZN+q34TdodT7yT2W1ASNQAQvmOeP56+VJEZlGPtU5CTMzHmTUhgjJAzWsmmdu3/9k=",
    text: "IE-12 Righteous",
    description:
      "Modeled after the myriad Statues of Judicious Liberty, who keep a watchful eye on checkout lines, schoolyards, perpetual rehabilitation communities, and public confession theaters.",
    value: 222,
  },
  {
    icon: "https://cms.divers.gg/wp-content/uploads/2025/02/IE-3-Martyr-helmet.png",
    text: "IE-3 Martyr",
    description:
      "Modeled after the Statue of Mournful Liberty, who weeps over the existence of tyranny, this armor is worn by those who would give their lives to dry her tears.",
    value: 333,
  },
  {
    icon: "https://tiermaker.com/images/media/template_images/2024/16524605/helldivers-helmets-16524605/screenshot-2024-06-09-at-23-15-07-fs-34-exterminator-armor---helldivers-2-wiki.png",
    text: "FS-34 Exterminator",
    description:
      "Features a patented non-stick coating, which makes scraping viscera off after a long day of battle less taxing.",
    value: 444,
  },
  {
    icon: "https://tiermaker.com/images/media/template_images/2024/16524605/helldivers-helmets-16524605/screenshot-2024-06-09-at-23-10-05-ce-81-juggernaut-armor---helldivers-2-wiki.png",
    text: "CE-81 Juggernaut",
    description:
      "One of the most durable engineer armors available, each set is quality tested by an impact with a full-grown Charger.",
    value: 555,
  },
];

const unitsObject: ISheOption<any>[] = [
  {
    icon: "https://divers.gg/_next/image?url=https%3A%2F%2Fcms.divers.gg%2Fwp-content%2Fuploads%2F2025%2F02%2FCW-9-White-Wolf-Helmet.png&w=64&q=75",
    text: "CW-9 White Wolf",
    description:
      "The pattern used for this armor is the result of the Winter Camouflage Improvement Effort, which considered 136 entrants before determining the color white would best blend in with snow.",
    value: {
      name: "name 1",
      age: 11,
      isOkay: true,
    },
  },
  {
    icon: "data:image/jpeg;base64,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",
    text: "IE-12 Righteous",
    description:
      "Modeled after the myriad Statues of Judicious Liberty, who keep a watchful eye on checkout lines, schoolyards, perpetual rehabilitation communities, and public confession theaters.",
    value: {
      name: "name 2",
      age: 22,
      isOkay: true,
    },
  },
  {
    icon: "https://cms.divers.gg/wp-content/uploads/2025/02/IE-3-Martyr-helmet.png",
    text: "IE-3 Martyr",
    description:
      "Modeled after the Statue of Mournful Liberty, who weeps over the existence of tyranny, this armor is worn by those who would give their lives to dry her tears.",
    value: {
      name: "name 3",
      age: 33,
      isOkay: true,
    },
  },
  {
    icon: "https://tiermaker.com/images/media/template_images/2024/16524605/helldivers-helmets-16524605/screenshot-2024-06-09-at-23-15-07-fs-34-exterminator-armor---helldivers-2-wiki.png",
    text: "FS-34 Exterminator",
    description:
      "Features a patented non-stick coating, which makes scraping viscera off after a long day of battle less taxing.",
    value: {
      name: "name 4",
      age: 44,
      isOkay: true,
    },
  },
  {
    icon: "https://tiermaker.com/images/media/template_images/2024/16524605/helldivers-helmets-16524605/screenshot-2024-06-09-at-23-10-05-ce-81-juggernaut-armor---helldivers-2-wiki.png",
    text: "CE-81 Juggernaut",
    description:
      "One of the most durable engineer armors available, each set is quality tested by an impact with a full-grown Charger.",
    value: {
      name: "name 5",
      age: 55,
      isOkay: true,
    },
  },
];

const unitsArray: ISheOption<any>[] = [
  {
    icon: "https://divers.gg/_next/image?url=https%3A%2F%2Fcms.divers.gg%2Fwp-content%2Fuploads%2F2025%2F02%2FCW-9-White-Wolf-Helmet.png&w=64&q=75",
    text: "CW-9 White Wolf",
    description:
      "The pattern used for this armor is the result of the Winter Camouflage Improvement Effort, which considered 136 entrants before determining the color white would best blend in with snow.",
    value: [1, 1, 1, 1, 1],
  },
  {
    icon: "data:image/jpeg;base64,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",
    text: "IE-12 Righteous",
    description:
      "Modeled after the myriad Statues of Judicious Liberty, who keep a watchful eye on checkout lines, schoolyards, perpetual rehabilitation communities, and public confession theaters.",
    value: [2, 2, 2, 2, 2],
  },
  {
    icon: "https://cms.divers.gg/wp-content/uploads/2025/02/IE-3-Martyr-helmet.png",
    text: "IE-3 Martyr",
    description:
      "Modeled after the Statue of Mournful Liberty, who weeps over the existence of tyranny, this armor is worn by those who would give their lives to dry her tears.",
    value: [3, 3, 3, 3, 3],
  },
  {
    icon: "https://tiermaker.com/images/media/template_images/2024/16524605/helldivers-helmets-16524605/screenshot-2024-06-09-at-23-15-07-fs-34-exterminator-armor---helldivers-2-wiki.png",
    text: "FS-34 Exterminator",
    description:
      "Features a patented non-stick coating, which makes scraping viscera off after a long day of battle less taxing.",
    value: [4, 4, 4, 4, 4],
  },
  {
    icon: "https://tiermaker.com/images/media/template_images/2024/16524605/helldivers-helmets-16524605/screenshot-2024-06-09-at-23-10-05-ce-81-juggernaut-armor---helldivers-2-wiki.png",
    text: "CE-81 Juggernaut",
    description:
      "One of the most durable engineer armors available, each set is quality tested by an impact with a full-grown Charger.",
    value: [5, 5, 5, 5, 5],
  },
];

const genders: ISheSelectItem<string>[] = [
  {
    text: "male",
    value: "male",
  },
  {
    text: "female",
    value: "female",
  },
  {
    text: "unicorn",
    value: "unicorn",
  },
  {
    text: "banana",
    value: "banana",
  },
];

const position: ISheSelectItem<string>[] = [
  {
    text: "Frontend",
    value: "Frontend",
  },
  {
    text: "Backend",
    value: "Backend",
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
    value: "Designer",
  },
];

const user: UserModel = {
  name: "Anton",
  age: 32,
  email: "anton@yahoo.com",
  address: "Levetano 3/23",
  dateBirth: "05.21.1982",
  gender: "male",
  position: "SEO",
  isAvailable: true,
  nikName: "sjdifwoeijfw",
  units: ["CW-9 White Wolf", "FS-34 Exterminator", "CE-81 Juggernaut"],
  tags: [badges[0], badges[1], badges[2], badges[4]],
};

export function DashboardPage() {
  // const service = useDashboardPageService();

  const [_user, setUser] = useState<UserModel>(null);
  const [_badges, setBadges] = useState<ISheBadge<any>[]>(null);

  const [_selectDate, setSelectData] = useState<any[]>(null);
  const [_selected, setSelected] = useState<any>(null);
  const [_loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setUser(user);
      setBadges(badges);
    }, 1000);
    setTimeout(() => {
      setSelected("male");
    }, 1000);
  }, []);

  // ================================================================== STATE

  // ================================================================== EVENT HANDLERS

  function onAction(event, model?) {
    console.log("EVENT: ", event);
    console.log("MODEL: ", model);
  }

  function onSelectedHandler(event, model) {
    setSelected(event);
    onAction(event, model);
  }

  // ================================================================== LOGIC

  // ================================================================== LAYOUT
  return (
    <div id={cs["DashboardPage"]}>
      <h1>Dashboard</h1>
      <br />
      <br />

      {/*<SheSelect
        label="Select"
        items={genders}
        selected={"male"}
        showClearBtn
        onSelect={onSelectedHandler}
      />
      <br />
      <br />*/}

      {/*<SheMultiSelect<string>
        label="MultiSelect"
        items={unitsString}
        selectedValues={["CW-9 White Wolf", "FS-34 Exterminator"]}
        showClearBtn
        onSelect={(values, model) =>
          console.log("MULTI SELECT: ", values, model)
        }
      />
      <br />
      <br />*/}

      {/*<SheBadgeList
        label="Tags"
        items={position}
        required
        showCloseBtn
        showClearBtn
      />
      <br />
      <br />*/}

      {/*<SheCalendar
        label="Date Berth"
        hideTimePicker
        // date={_user?.dateBirth}
        // date={user.dateBirth}
        onSelectDate={(value, model) => console.log("DATE: ", value, model)}
      />*/}

      <br />
      <br />

      <UserForm
        data={user}
        // data={_user}
        genders={genders}
        positions={position}
        badges={badges}
        units={unitsString}
        notDisabledSubmit
        onSubmit={onAction}
        onCancel={onAction}
      />

      <br />
      <br />

      {/*<SheTestForm />*/}

      <br />
      <br />
    </div>
  );
}
