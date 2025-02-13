import { ReactNode } from "react";
import Button, { ButtonProps } from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";

interface AlertDialogModalProps {
  content?: ReactNode;
  visible: boolean;
  title?: string;
  description?: string;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}

const AlertDialogModal = (props: AlertDialogModalProps) => {
  const {
    content,
    visible,
    title,
    description,
    confirmButtonProps,
    cancelButtonProps,
  } = props;

  return (
    <Modal open={visible}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle color="danger">
          <WarningRoundedIcon />
          {title || "Confirmation"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          {description || "Are you sure, you want to delete this information?"}
          {content}
        </DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger" {...confirmButtonProps}>
            Confirm
          </Button>
          <Button variant="plain" color="neutral" {...cancelButtonProps}>
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default AlertDialogModal;
