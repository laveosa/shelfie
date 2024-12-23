import { useState } from "react";

import { SheForm } from "@/components/forms/she-form/SheForm";
import cs from "./ShePhoneNumber.module.scss";
import { Input } from "@/components/ui/input.tsx";

const countryOptions = [
  { code: "+48", flag: "src/assets/images/poland_flag.png" },
];

const PhoneNumberInput = () => {
  const [selectedCode, setSelectedCode] = useState("+48");

  const handleSelectChange = (e) => {
    setSelectedCode(e.target.value);
  };

  return (
    <div className={cs.ShePhoneNumber}>
      <div className={cs.formItem}>
        <SheForm.Field
          rules={{
            required: "Please enter your phone number",
          }}
          name="phoneNumber"
          label="Phone Number"
        >
          <div className="flex items-center">
            <div className="relative mr-2">
              <select
                value={selectedCode}
                onChange={handleSelectChange}
                className="border rounded p-2 appearance-none"
              >
                {countryOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.code}
                  </option>
                ))}
              </select>
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <img
                  src={
                    countryOptions.find((opt) => opt.code === selectedCode)
                      ?.flag
                  }
                  alt="Country Flag"
                  className="w-4 h-4"
                />
              </div>
            </div>
            <Input
              type="tel"
              placeholder="phone number..."
              className="flex-1"
            />
          </div>
        </SheForm.Field>
      </div>
    </div>
  );
};

export default PhoneNumberInput;
