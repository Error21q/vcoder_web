import {
  Autocomplete,
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Option,
  Select,
} from "@mui/joy";
import { FastField, Formik, FormikProps } from "formik";
import { forwardRef, Ref } from "react";
import { IBlockchain } from "../../interfaces/blockchain";
import { IPlan } from "../../interfaces/plan";
import { IForm } from "../../interfaces/form";
import { IProduct } from "../../interfaces/product";
import PhoneInput from "../PhoneInput";

interface FormProps {
  initialValues: any;
  validationSchema: any;
  inputFields: IForm[];
  onSubmit: (values: any) => void;
  onSearch?: (value: any) => void;
  onProductSelect?: (value: IProduct | undefined) => void;
  onCountrySelect?: (country_code: string) => void;
  statuses?: any[];
  products?: IProduct[] | undefined;
  blockchain?: IBlockchain[] | undefined;
  plan?: IPlan[] | undefined;
  formikRef?: Ref<FormikProps<any>>;
  fullWidth?: boolean;
  productLoading?: boolean;
}

const Form = forwardRef<FormikProps<any> | null, FormProps>((props) => {
  const {
    formikRef,
    initialValues,
    validationSchema,
    inputFields,
    onSubmit,
    onSearch,
    onProductSelect,
    onCountrySelect,
    statuses,
    products,
    blockchain,
    plan,
    fullWidth,
    productLoading,
  } = props;

  const getOptions = (fieldName: string) => {
    switch (fieldName) {
      case "product":
        return products;
      case "blockchain":
        return blockchain;
      case "plan":
        return plan;
      case "status":
        return statuses;
      default:
        return [];
    }
  };

  return (
    <Formik
      enableReinitialize
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <Box gap={3} flexDirection="column" display="flex">
          <Grid container spacing={3}>
            {inputFields.map((field: IForm) => (
              <Grid key={field.name} xs={12} sm={12} md={fullWidth ? 12 : 6}>
                {field.isSelect ? (
                  field.name === "product" ? (
                    <FormControl
                      error={Boolean(touched[field.name] && errors[field.name])}
                    >
                      <FormLabel required={field.required}>
                        {field.label}
                      </FormLabel>
                      <Autocomplete
                        required={field.required}
                        placeholder={field.placeholder}
                        name={field.name}
                        slotProps={{
                          input: {
                            autoComplete: "new-password",
                          },
                        }}
                        type="search"
                        freeSolo
                        disableClearable
                        options={
                          products?.map((item: IProduct) => ({
                            value: item.id,
                            label: item.name,
                            title: item.name,
                          })) || []
                        }
                        loading={productLoading}
                        onInputChange={(_, value) => onSearch?.(value)}
                        onChange={(_, newValue: any) => {
                          const selectedItem = products?.find(
                            (item: any) => item.id === newValue?.value
                          );
                          onProductSelect?.(selectedItem);
                          setFieldValue(field.name, selectedItem || null);
                        }}
                        color={
                          touched[field.name] && errors[field.name]
                            ? "danger"
                            : "neutral"
                        }
                        error={Boolean(
                          !values[field.name] &&
                            touched[field.name] &&
                            errors[field.name]
                        )}
                        endDecorator={
                          productLoading ? (
                            <CircularProgress
                              size="sm"
                              sx={{ bgcolor: "background.surface" }}
                            />
                          ) : null
                        }
                        sx={{ boxShadow: "none" }}
                      />
                    </FormControl>
                  ) : (
                    <FormControl
                      error={Boolean(touched[field.name] && errors[field.name])}
                    >
                      <FormLabel required={field.required}>
                        {field.label}
                      </FormLabel>
                      <Select
                        required={field.required}
                        color={
                          touched[field.name] && errors[field.name]
                            ? "danger"
                            : "neutral"
                        }
                        placeholder={field.placeholder}
                        variant="outlined"
                        name={field.name}
                        value={
                          field.name === "status"
                            ? values[field.name]
                            : values[field.name]?.id
                        }
                        defaultValue={
                          field.name === "status"
                            ? values[field.name]
                            : values[field.name]?.id
                        }
                        onChange={(_, newValue) => {
                          const selectedItem = getOptions(field.name)?.find(
                            (item: any) =>
                              field.name === "status"
                                ? item.value === newValue
                                : item.id === newValue
                          );

                          setFieldValue(
                            field.name,
                            field.name === "status"
                              ? selectedItem?.value
                              : selectedItem || null
                          );
                        }}
                        sx={{ boxShadow: "none" }}
                      >
                        {getOptions(field.name)?.map(
                          (item: any, index: number) => (
                            <Option
                              key={index.toString()}
                              label={
                                field.name === "status" ? item.title : item.name
                              }
                              value={
                                field.name === "status" ? item.value : item.id
                              }
                            >
                              {field.name === "status" ? item.title : item.name}
                            </Option>
                          )
                        )}
                      </Select>
                      <FormHelperText>
                        {touched[field.name] && errors[field.name]
                          ? errors[field.name]
                          : ("" as any)}
                      </FormHelperText>
                    </FormControl>
                  )
                ) : field.name === "whatsapp_number" ? (
                  <>
                    <FormLabel required={field.required}>
                      {field.label}
                    </FormLabel>
                    <FastField
                      component={PhoneInput}
                      required={field.required}
                      name={field.name}
                      value={values[field.name]}
                      defaultCountry={values?.country_code}
                      selectedCountry={(country: any) => {
                        onCountrySelect?.(country?.iso2);
                        setFieldValue("country_code", country?.iso2);
                      }}
                      onChange={(event: any) => {
                        setFieldValue(field.name, event.target.value || null);
                      }}
                      onBlur={handleBlur}
                      placeholder={field.placeholder}
                      error={Boolean(
                        !values[field.name] &&
                          touched[field.name] &&
                          errors[field.name]
                      )}
                      sx={{ boxShadow: "none", width: "100%" }}
                    />

                    <FormHelperText
                      sx={{
                        color: "var(--joy-palette-danger-500)",
                      }}
                    >
                      {touched[field.name] && errors[field.name]
                        ? errors[field.name]
                        : ("" as any)}
                    </FormHelperText>
                  </>
                ) : (
                  <FormControl
                    error={Boolean(touched[field.name] && errors[field.name])}
                  >
                    <FormLabel required={field.required}>
                      {field.label}
                    </FormLabel>
                    <Input
                      required={field.required}
                      type={field.type}
                      name={field.name}
                      value={values[field.name]}
                      placeholder={field.placeholder}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ boxShadow: "none" }}
                    />
                    <FormHelperText>
                      {touched[field.name] && errors[field.name]
                        ? errors[field.name]
                        : ("" as any)}
                    </FormHelperText>
                  </FormControl>
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Formik>
  );
});

export default Form;
