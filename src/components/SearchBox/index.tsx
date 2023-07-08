import { useState, useImperativeHandle, ChangeEvent, forwardRef } from "react";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  TextFieldProps,
} from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";

import {
  convertToEnglishDigit,
  removeWhiteSpaceFromString,
} from "../../utils/Functions";

const SearchBox = forwardRef(
  ({ placeholder, ...props }: TextFieldProps, ref) => {
    const [value, setValue] = useState<string>("");

    useImperativeHandle(ref, () => ({
      setValue(value: string) {
        setValue(value);
      },
      getValue() {
        return value;
      },
    }));

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;

      if (props.inputMode === "numeric") {
        const regex = /^[\u06F0-\u06F90-9]+$/;

        if (!regex.test(newValue) && newValue !== "") {
          return;
        }
        newValue = removeWhiteSpaceFromString(newValue); // Remove all whitespace characters from the string
        newValue = convertToEnglishDigit(newValue);
      }

      setValue(newValue);
    };

    return (
      <FormControl variant="outlined" fullWidth>
        <OutlinedInput
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          startAdornment={
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    );
  }
);

export default SearchBox;
