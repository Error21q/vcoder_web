import {
  Alert,
  Button,
  Card,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from "@mui/joy";
import Form from "../Form";
import { BookingInitialValues } from "../../common/form-values";
import { BookingValidationSchema } from "../../common/form-schema";
import { BookingInputFields } from "../../common/form-fields";
import { useRef, useState } from "react";
import { FormikProps } from "formik";
import { IBooking } from "../../interfaces/booking";
import { ErrorOutlined } from "@mui/icons-material";
import AudioPlayer from "react-h5-audio-player";
import AudioRecorder from "../AudioRecorder";

interface BookingModalProps {
  open: boolean;
  loading?: boolean;
  showError?: boolean;
  onClose: () => void;
  onSubmit: (values: IBooking, audioFile: File) => void;
}

const BookingModal = (props: BookingModalProps) => {
  const { open, loading, showError, onClose, onSubmit } = props;
  const formikRef = useRef<FormikProps<any>>(null);
  const [audio, setAudio] = useState<File>();

  const handleSubmit = async () => {
    if (formikRef.current) await formikRef.current.submitForm();
    if (!formikRef.current?.isValid) return;
    onSubmit(formikRef.current?.values, audio as File);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setAudio(undefined);
          onClose();
        }}
      >
        <ModalDialog size="lg">
          <ModalClose />
          <DialogTitle>Book your smart contract </DialogTitle>

          <Divider />

          <DialogContent>
            <Form
              formikRef={formikRef}
              initialValues={BookingInitialValues}
              validationSchema={BookingValidationSchema}
              inputFields={BookingInputFields.slice(2)}
              onSubmit={(_) => _}
            />

            <Grid container spacing={3}>
              <Grid xs={12} sm={12} md={6}>
                <AudioRecorder
                  onRecordingComplete={(blob: Blob) => {
                    const file: File = new File([blob], "audio.mp3");
                    setAudio(file);
                  }}
                />
              </Grid>

              <Grid xs={12} sm={12} md={6}>
                <Card>
                  <Typography level="title-lg">Recorded Voice</Typography>
                  {audio ? (
                    <AudioPlayer src={URL.createObjectURL(audio)} />
                  ) : (
                    <Typography level="body-sm">
                      No voice recorded yet.
                    </Typography>
                  )}
                </Card>
              </Grid>
            </Grid>
          </DialogContent>

          <Divider />

          {showError && (
            <Alert
              startDecorator={<ErrorOutlined />}
              variant="outlined"
              color="danger"
            >
              This smart contract has been already booked, please book another.
            </Alert>
          )}

          <DialogActions buttonFlex={"1"} orientation="horizontal">
            <Button variant="outlined" color="neutral" onClick={onClose}>
              Cancel
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
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default BookingModal;
