import { Box, IconButton, Typography } from "@mui/joy";
import { Upload, UploadFile, Image } from "antd";
import { useState } from "react";
import { FileType, getBase64 } from "../../common/image-utils";
import { FileUploadOutlined } from "@mui/icons-material";
import { UploadChangeParam } from "antd/es/upload";

interface UploaderProps {
  customRequest: (options: any) => void;
  onChange: (image: UploadChangeParam) => void;
  maxCount?: number;
  fileList?: UploadFile[];
}

const Uploader = (props: UploaderProps) => {
  const { customRequest, onChange, maxCount, fileList } = props;
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  return (
    <Box>
      <Upload
        maxCount={maxCount || 1}
        listType="picture-card"
        onPreview={handlePreview}
        onChange={onChange}
        fileList={fileList}
        customRequest={customRequest}
      >
        {(fileList?.length ?? 0) > 0 ? null : (
          <button style={{ border: 0, background: "none" }} type="button">
            <IconButton size="lg">
              <FileUploadOutlined />
            </IconButton>
            <Typography level="title-sm">Upload</Typography>
          </button>
        )}
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </Box>
  );
};

export default Uploader;
