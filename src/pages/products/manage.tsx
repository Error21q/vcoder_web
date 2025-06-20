import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardOverflow,
  FormControl,
  FormLabel,
  Typography,
} from "@mui/joy";
import Uploader from "../../components/Uploader";
import { useEffect, useRef, useState } from "react";
import { IPlan } from "../../interfaces/plan";
import { IBlockchain } from "../../interfaces/blockchain";
import { getPlans } from "../../api/plan";
import { getBlockchains } from "../../api/blockchains";
import { useLocation, useNavigate } from "react-router-dom";
import { FormikProps } from "formik";
import { ProductInitialValues } from "../../common/form-values";
import { ProductValidationSchema } from "../../common/form-schema";
import { ProductInputFields } from "../../common/form-fields";
import { IProduct } from "../../interfaces/product";
import { saveProduct } from "../../api/products";
import { showSnackbar } from "../../components/SnackbarUtils";
import { CheckOutlined } from "@mui/icons-material";
import { Form, Loader } from "../../components";
import { deleteFile, uploadFile } from "../../api/storage";
import {
  base64ToFile,
  getFileName,
  isValidUrl,
} from "../../common/image-utils";
import { IFileList } from "../../interfaces/file";
import { UploadChangeParam } from "antd/es/upload";
import { ProductStatuses } from "../../common/product-utils";
import { getScreenshot } from "../../api/screenshot";

export const ManageProduct = () => {
  const navigate = useNavigate();
  const rowData: IProduct = useLocation().state;
  const formikRef = useRef<FormikProps<any>>(null);
  const [plans, setPlans] = useState<IPlan[]>();
  const [blockchains, setBlockchains] = useState<IBlockchain[]>();
  const [uploading, setUploading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any[]>([]);
  let u_file_list: IFileList[] = [];

  const onImageChange = async (info: UploadChangeParam) => {
    if (info.file.status == "removed") {
      handleDelete(info);
    }
  };

  const onImageCapture = async (url: string) => {
    setUploading(true);
    try {
      const response: any = await getScreenshot(url);
      const file: File = base64ToFile(response?.data?.screenshot, "image/png");
      await handleDelete();
      await handleUpload(file);
    } catch (error) {
      console.log(error);
    }
    setUploading(false);
  };

  const handleDelete = async (info?: UploadChangeParam) => {
    const response = await deleteFile(
      import.meta.env.VITE_FOLDER_PRODUCTS +
        "/" +
        getFileName(info?.file?.url || rowData?.image || "")
    );
    if (response.status) {
      setFileList([]);
      formikRef?.current?.setFieldValue("image", "");
    }
  };

  const handleUpload = async (file: File) => {
    u_file_list = [
      {
        uid: "-xxx",
        status: "uploading",
        percent: 50,
      },
    ];
    setFileList([...u_file_list]);
    const resp = await uploadFile(file, import.meta.env.VITE_FOLDER_PRODUCTS);
    u_file_list[0].status = "done";
    u_file_list[0].url = resp.data.file_path;
    setFileList([...u_file_list]);
    formikRef.current?.setFieldValue("image", resp.data.file_path);
  };

  const handleSubmit = async () => {
    if (formikRef.current) await formikRef.current.submitForm();
    if (!formikRef.current?.isValid) return;
    setLoading(true);

    try {
      const payload: IProduct = formikRef.current?.values;
      await saveProduct(payload);
      showSnackbar({
        message: "Data saved successfully.",
        color: "success",
        size: "lg",
        open: true,
        startDecorator: <CheckOutlined />,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const fetchPlans = async () => {
    try {
      const result = await getPlans("", 1, 1000);
      setPlans(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBlockchains = async () => {
    try {
      const result = await getBlockchains("", 1, 1000);
      setBlockchains(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlans();
    fetchBlockchains();
  }, []);

  useEffect(() => {
    if (isValidUrl(rowData?.image)) {
      setFileList([
        {
          uid: "-xxx",
          status: "done",
          url: rowData?.image,
        },
      ]);
    }
  }, [rowData?.id]);

  return (
    <Box>
      <Typography level="h2" mb={5}>
        Manage Product
      </Typography>

      <Card>
        <CardOverflow variant="soft" sx={{ py: 2 }}>
          <Typography level="title-md">
            {rowData?.id
              ? "Update an existing product"
              : "Create a new product"}
          </Typography>
        </CardOverflow>

        <CardContent>
          <Box gap={3} flexDirection="column" display="flex">
            <Form
              formikRef={formikRef}
              initialValues={rowData || ProductInitialValues}
              validationSchema={ProductValidationSchema}
              inputFields={ProductInputFields}
              statuses={ProductStatuses}
              blockchain={blockchains}
              plan={plans}
              onSubmit={(_) => _}
              onImageCapture={async (url: string) => {
                onImageCapture(url);
              }}
            />
            <FormControl required>
              <FormLabel>Image</FormLabel>
              <Uploader
                fileList={fileList}
                customRequest={(options) => handleUpload(options.file)}
                onChange={(info) => onImageChange(info)}
              />
            </FormControl>
          </Box>
        </CardContent>

        <CardOverflow variant="soft">
          <CardActions>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </Button>
            <Button
              variant="solid"
              color="primary"
              loading={loading}
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </CardActions>
        </CardOverflow>
      </Card>

      {uploading && (
        <Loader
          text="Capturing & uploading screenshot..."
          propsTypography={{
            mx: 2,
            level: "body-lg",
          }}
          propsBox={{
            sx: {
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
            },
          }}
        />
      )}
    </Box>
  );
};

export default ManageProduct;
