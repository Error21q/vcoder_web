import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  Option,
  Select as SelectJoyUI,
} from "@mui/joy";
import { Select as SelectAntD } from "antd";
import { Formik, FormikProps } from "formik";
import { forwardRef, Ref } from "react";
import { IBlockchain } from "../../interfaces/blockchain";
import { ICategory } from "../../interfaces/category";
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
  category?: ICategory[] | undefined;
  formikRef?: Ref<FormikProps<any>>;
  fullWidth?: boolean;
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
    category,
    fullWidth,
  } = props;

  const getOptions = (fieldName: string) => {
    switch (fieldName) {
      case "product":
        return products;
      case "blockchain":
        return blockchain;
      case "category":
        return category;
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
                <FormControl
                  required={field.required}
                  error={Boolean(touched[field.name] && errors[field.name])}
                >
                  <FormLabel>{field.label}</FormLabel>
                  {field.isSelect ? (
                    field.name === "product" ? (
                      <SelectAntD
                        showSearch
                        value={values[field.name]?.name}
                        placeholder={field.placeholder}
                        defaultActiveFirstOption={false}
                        suffixIcon={null}
                        filterOption={false}
                        onSearch={onSearch}
                        notFoundContent={null}
                        size="large"
                        onChange={(_, newValue: any) => {
                          const selectedItem = products?.find(
                            (item: any) => item.id === newValue?.value
                          );
                          onProductSelect?.(selectedItem);
                          setFieldValue(field.name, selectedItem || null);
                        }}
                        options={products?.map((item: IProduct) => ({
                          value: item.id,
                          label: item.name,
                          title: item.name,
                        }))}
                      />
                    ) : field.name === "status" ? (
                      <SelectJoyUI
                        color={
                          touched[field.name] && errors[field.name]
                            ? "danger"
                            : "neutral"
                        }
                        placeholder={field.placeholder}
                        variant="outlined"
                        name={field.name}
                        value={values[field.name]}
                        defaultValue={values[field.name]}
                        onChange={(_, newValue) => {
                          const selectedItem = statuses?.find(
                            (item: any) => item.value === newValue
                          );
                          setFieldValue(
                            field.name,
                            selectedItem?.value || null
                          );
                        }}
                      >
                        {statuses?.map((item: any) => (
                          <Option label={item.title} value={item.value}>
                            {item.title}
                          </Option>
                        ))}
                      </SelectJoyUI>
                    ) : (
                      <SelectJoyUI
                        color={
                          touched[field.name] && errors[field.name]
                            ? "danger"
                            : "neutral"
                        }
                        placeholder={field.placeholder}
                        variant="outlined"
                        name={field.name}
                        value={values[field.name]?.id}
                        onChange={(_, newValue) => {
                          const selectedItem = getOptions(field.name)?.find(
                            (item: any) => item.id === newValue
                          );
                          setFieldValue(field.name, selectedItem || null);
                        }}
                      >
                        {getOptions(field.name)?.map((item: any) => (
                          <Option
                            key={item.id}
                            label={item.name}
                            value={item.id}
                          >
                            {item.name}
                          </Option>
                        ))}
                      </SelectJoyUI>
                    )
                  ) : field.name === "whatsapp_number" ? (
                    <PhoneInput
                      required
                      name={field.name}
                      value={values[field.name]}
                      defaultCountry={values?.country_code}
                      selectedCountry={(country: any) => {
                        onCountrySelect?.(country?.iso2);
                        setFieldValue("country_code", country?.iso2);
                      }}
                      onChange={(event) => {
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
                  ) : (
                    <Input
                      type={field.type}
                      name={field.name}
                      value={values[field.name]}
                      placeholder={field.placeholder}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{ boxShadow: "none" }}
                    />
                  )}
                  <FormHelperText>
                    {touched[field.name] && errors[field.name]
                      ? errors[field.name]
                      : ("" as any)}
                  </FormHelperText>
                </FormControl>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Formik>
  );
});

export default Form;
