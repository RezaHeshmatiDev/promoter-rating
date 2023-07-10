import {
  useState,
  useImperativeHandle,
  ChangeEvent,
  forwardRef,
  KeyboardEventHandler,
} from "react";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  OutlinedInputProps,
  Button,
} from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";

import {
  convertToEnglishDigit,
  removeWhiteSpaceFromString,
} from "../../utils/Functions";

interface Props {
  hasSearch?: boolean;
  onSearch?(value: string): void;
}

const SearchBox = forwardRef(
  (
    { hasSearch, onSearch, placeholder, ...props }: Props & OutlinedInputProps,
    ref
  ) => {
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

    const onClickSearch = () => {
      onSearch?.(value);
    };

    const onKeyDown = (e: any) => {
      e.stopPropagation();

      // It triggers by pressing the enter key
      if (hasSearch && e.keyCode === 13) {
        onClickSearch();
      }
    };

    return (
      <FormControl variant="outlined" fullWidth>
        <OutlinedInput
          type={"text"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          endAdornment={
            hasSearch ? (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  size="small"
                  onClick={onClickSearch}
                >
                  {"جستجو"}
                </Button>
              </InputAdornment>
            ) : null
          }
          startAdornment={
            <InputAdornment position="start">
              <SearchTwoToneIcon />
            </InputAdornment>
          }
          {...props}
        />
      </FormControl>
    );
  }
);

export default SearchBox;
