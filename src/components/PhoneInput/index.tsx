import {
  usePhoneInput,
  CountryIso2,
  defaultCountries,
  parseCountry,
  FlagImage,
} from "react-international-phone";
import "react-international-phone/style.css";
import { Input, Select, Option, Stack, Divider } from "@mui/joy";
import { useEffect } from "react";

interface PhoneInputProps extends Omit<React.ComponentProps<typeof Input>, ""> {
  defaultCountry?: CountryIso2;
  selectedCountry: (country: any) => void;
}

const PhoneInput = (props: PhoneInputProps) => {
  const { defaultCountry, selectedCountry, ...inputProps } = props;
  const { inputRef, country, setCountry } = usePhoneInput({
    defaultCountry: defaultCountry || import.meta.env.VITE_DEFAULT_COUNTRY_CODE,
    countries: defaultCountries,
  });

  useEffect(() => {
    selectedCountry(country);
  }, []);

  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Input
        ref={inputRef}
        sx={{ flex: 1 }}
        {...inputProps}
        startDecorator={
          <>
            <Select
              variant="plain"
              value={country?.iso2}
              onChange={(_, newValue) => {
                const nation = defaultCountries.find(
                  (c) => newValue === parseCountry(c).iso2
                );
                if (!nation) return null;
                const parsedCountry = parseCountry(nation);
                selectedCountry(parsedCountry);
                setCountry(newValue as CountryIso2);
              }}
              slotProps={{
                listbox: {
                  variant: "outlined",
                },
              }}
              renderValue={(selected) => {
                const nation = defaultCountries.find(
                  (c) => selected?.value === parseCountry(c).iso2
                );
                if (!nation) return null;
                const parsedCountry = parseCountry(nation);
                return (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <FlagImage
                      iso2={parsedCountry.iso2}
                      style={{ marginRight: "8px" }}
                    />
                    {parsedCountry.name} (+{parsedCountry.dialCode})
                  </Stack>
                );
              }}
              sx={{ ml: -1.5, "&:hover": { bgcolor: "transparent" } }}
            >
              {defaultCountries.map((c) => {
                const country = parseCountry(c);

                return (
                  <Option key={country.iso2} value={country.iso2}>
                    <FlagImage
                      iso2={country.iso2}
                      style={{ marginRight: "8px" }}
                    />
                    {country.name} (+{country.dialCode})
                  </Option>
                );
              })}
            </Select>
            <Divider orientation="vertical" />
          </>
        }
      />
    </Stack>
  );
};

export default PhoneInput;
