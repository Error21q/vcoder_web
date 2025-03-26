import {
  Step,
  stepClasses,
  StepIndicator,
  stepIndicatorClasses,
  Stepper,
  Typography,
  typographyClasses,
} from "@mui/joy";
import { IBookingStepper } from "../../interfaces/booking";
import { Check } from "@mui/icons-material";

interface TrackingStepperProps {
  steps: IBookingStepper[];
}

export const TrackingStepper = (props: TrackingStepperProps) => {
  const { steps } = props;
  return (
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
            border: "4px solid",
            borderColor: "#fff",
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
            <Typography level="title-sm" flexWrap={"wrap"}>
              {item.title} {item.time && ` | ${item.time}`}
            </Typography>
            {item.description}
          </div>
        </Step>
      ))}
    </Stepper>
  );
};

export default TrackingStepper;
