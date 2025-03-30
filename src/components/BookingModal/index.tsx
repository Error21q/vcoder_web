import {
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
import { BookingInputFields } from "../../common/form-fields";
import { useRef, useState } from "react";
import { FormikProps } from "formik";
import { IBooking } from "../../interfaces/booking";
import AudioRecorder from "../AudioRecorder";
import { IProduct } from "../../interfaces/product";
import { AudioPlayer } from "react-audio-play";
import { BookingValidationSchema } from "../../common/form-schema";

interface BookingModalProps {
  open: boolean;
  loading?: boolean;
  selectedProduct: IProduct;
  onClose: () => void;
  onSubmit: (values: IBooking, audioFile: File) => void;
}

const BookingModal = (props: BookingModalProps) => {
  const { open, loading, selectedProduct, onClose, onSubmit } = props;
  const formikRef = useRef<FormikProps<any>>(null);
  const [audio, setAudio] = useState<File>();

  const handleSubmit = async () => {
    if (formikRef.current) await formikRef?.current?.submitForm();
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
        <ModalDialog
          layout={window.innerWidth >= 768 ? "fullscreen" : "center"}
          sx={(theme) => ({
            m: 5,
            borderRadius: "lg",
            border: 0,
            [theme.breakpoints.only("xs")]: {
              top: "unset",
              bottom: 0,
              left: 0,
              right: 0,
              m: 0,
              transform: "none",
              maxWidth: "unset",
            },
          })}
        >
          <ModalClose />
          <DialogTitle>
            Book
            <Typography fontStyle={"italic"}>{selectedProduct.name}</Typography>
            smart contract
          </DialogTitle>

          <Divider />

          <DialogContent sx={{ p: { md: 2 } }}>
            <Form
              formikRef={formikRef}
              initialValues={BookingInitialValues}
              validationSchema={BookingValidationSchema}
              inputFields={BookingInputFields.slice(2).slice(0, -3)}
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
                    <AudioPlayer
                      src={URL.createObjectURL(audio)}
                      backgroundColor="transparent"
                      color={"var(--joy-palette-neutral-100)"}
                      style={{ boxShadow: "none" }}
                    />
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

          <DialogActions
            buttonFlex={"0.1"}
            orientation="horizontal"
            sx={{ justifyContent: "center" }}
          >
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
