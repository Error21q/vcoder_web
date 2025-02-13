import Stepper from "@mui/joy/Stepper";
import Step, { stepClasses } from "@mui/joy/Step";
import StepIndicator, { stepIndicatorClasses } from "@mui/joy/StepIndicator";
import Typography, { typographyClasses } from "@mui/joy/Typography";
import {
  Alert,
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import { useState } from "react";
import { IBookingStepper } from "../../interfaces/booking";
import { Check, ErrorOutlined } from "@mui/icons-material";

interface TrackingModalProps {
  open: boolean;
  loading?: boolean;
  showError?: boolean;
  steps: IBookingStepper[];
  onClose: () => void;
  onSubmit: (bookingId: string) => void;
}

const TrackingModal = (props: TrackingModalProps) => {
  const { open, loading, showError, steps, onSubmit, onClose } = props;
  const [bookingId, setBookingId] = useState<string>();

  return (
    <Modal
      open={open}
      onClose={() => {
        setBookingId("");
        onClose();
      }}
    >
      <ModalDialog minWidth={"sm"}>
        <ModalClose />
        <DialogTitle>Track your booking </DialogTitle>

        <Divider />

        <DialogContent>
          <Input
            sx={{ "--Input-decoratorChildHeight": "35px" }}
            placeholder="Enter booking id"
            type="text"
            required
            value={bookingId}
            onChange={(event) => {
              setBookingId(event.target.value);
            }}
            endDecorator={
              <Button
                variant="outlined"
                color="primary"
                loading={loading}
                type="submit"
                onClick={() => {
                  bookingId && onSubmit(bookingId);
                }}
              >
                Track
              </Button>
            }
          />

          {showError && (
            <Alert
              startDecorator={<ErrorOutlined />}
              variant="outlined"
              color="danger"
              sx={{ my: 2 }}
            >
              Invalid booking ID, please try again.
            </Alert>
          )}

          <Stepper
            orientation="vertical"
            sx={(theme) => ({
              display: steps.length == 0 ? "none" : null,
              py: 2,
              "--Stepper-verticalGap": "2.5rem",
              "--StepIndicator-size": "2.5rem",
              "--Step-gap": "1rem",
              "--Step-connectorInset": "0.5rem",
              "--Step-connectorRadius": "1rem",
              "--Step-connectorThickness": "4px",
              "--joy-palette-success-solidBg": "var(--joy-palette-success-400)",
              [`& .${stepClasses.completed}`]: {
                "&::after": { bgcolor: "success.solidBg" },
              },
              [`& .${stepClasses.active}`]: {
                [`& .${stepIndicatorClasses.root}`]: {
                  bbooking: "4px solid",
                  bbookingColor: "#fff",
                  boxShadow: `0 0 0 1px ${theme.vars.palette.primary[500]}`,
                },
              },
              [`& .${stepClasses.disabled} *`]: {
                color: "neutral.softDisabledColor",
              },
              [`& .${typographyClasses["title-sm"]}`]: {
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "10px",
              },
            })}
          >
            {steps?.map((item, index: number) => (
              <Step
                key={index}
                completed={item.isCompleted}
                indicator={
                  <StepIndicator
                    variant={item.variant || "solid"}
                    color={item.color || "success"}
                  >
                    {item.icon || <Check />}
                  </StepIndicator>
                }
              >
                <div>
                  <Typography level="title-sm">{item.title}</Typography>
                  {item.description}
                </div>
              </Step>
            ))}
          </Stepper>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};

export default TrackingModal;
