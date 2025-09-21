import { useDispatch, useSelector } from "react-redux";

import { StoreSliceEnum } from "@/const/enums/StoreSliceEnum.ts";
import { AppDispatch, RootState } from "@/state/store.ts";
import { IProfilePageSlice } from "@/const/interfaces/store-slices/IProfilePageSlice.ts";
import DictionaryApiHooks from "@/utils/services/api/DictionaryApiService.ts";
import { ProfilePageSliceActions as actions } from "@/state/slices/ProfilePageSlice.ts";

export default function useProfilePageService() {
  const state = useSelector(
    (state: RootState): IProfilePageSlice => state[StoreSliceEnum.PROFILE],
  );
  const dispatch = useDispatch<AppDispatch>();

  const [getCountryCode] = DictionaryApiHooks.useLazyGetCountryCodeQuery();

  function getCountryCodesHandler() {
    getCountryCode().then((res: any) => {
      dispatch(actions.refreshCountryCodes(res.data));
    });
  }

  return { getCountryCodesHandler };
}
