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
import { useLocation, useNavigate } from "react-router-dom";
import { FormikProps } from "formik";
import { IBlockchain } from "../../interfaces/blockchain";
import { CheckOutlined } from "@mui/icons-material";
import { showSnackbar } from "../../components/SnackbarUtils";
import { saveBlockchain } from "../../api/blockchains";
import { Form } from "../../components";
import { BlockchainInitialValues } from "../../common/form-values";
import { BlockchainValidationSchema } from "../../common/form-schema";
import { BlockChainInputFields } from "../../common/form-fields";
import { getFileName, isValidUrl } from "../../common/image-utils";
import { UploadChangeParam } from "antd/es/upload";
import { deleteFile, uploadFile } from "../../api/storage";
import { IFileList } from "../../interfaces/file";

export const ManageBlockchain = () => {
  const navigate = useNavigate();
  const rowData: IBlockchain = useLocation().state;
  const formikRef = useRef<FormikProps<any>>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any[]>([]);
  let u_file_list: IFileList[] = [];

  const onImageChange = async (info: UploadChangeParam) => {
    if (info.file.status == "removed") {
      const response = await deleteFile(
        import.meta.env.VITE_FOLDER_BLOCKCHAINS +
          "/" +
          getFileName(info.file.url || "")
      );
      response.status && setFileList([]);
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
    const resp = await uploadFile(
      file,
      import.meta.env.VITE_FOLDER_BLOCKCHAINS
    );
    u_file_list[0].status = "done";
    u_file_list[0].url = resp.data.file_path;
    setFileList([...u_file_list]);
    formikRef.current?.setFieldValue("logo", resp.data.file_path);
  };

  const handleSubmit = async () => {
    if (formikRef.current) await formikRef.current.submitForm();
    if (!formikRef.current?.isValid) return;

    setLoading(true);

    try {
      const payload: IBlockchain = formikRef.current?.values;
      await saveBlockchain(payload);
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

  useEffect(() => {
    if (isValidUrl(rowData?.logo)) {
      setFileList([
        {
          uid: "-xxx",
          status: "done",
          url: rowData?.logo,
        },
      ]);
    }
  }, [rowData?.id]);

  return (
    <Box>
      <Typography level="h2" mb={5}>
        Manage Blockchain
      </Typography>

      <Card>
        <CardOverflow variant="soft" sx={{ py: 2 }}>
          <Typography level="title-md">
            {rowData?.id
              ? "Update an existing blockchain"
              : "Create a new blockchain"}
          </Typography>
        </CardOverflow>

        <CardContent>
          <Box gap={3} flexDirection="column" display="flex">
            <Form
              formikRef={formikRef}
              initialValues={rowData || BlockchainInitialValues}
              validationSchema={BlockchainValidationSchema}
              inputFields={BlockChainInputFields}
              onSubmit={(_) => _}
            />

            <FormControl required>
              <FormLabel>Logo</FormLabel>
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
    </Box>
  );
};

export default ManageBlockchain;
