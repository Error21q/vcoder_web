import { useState } from "react";
import { IconButton, Tooltip } from "@mui/joy";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

interface CopyToClipboardButtonProps {
  text: string;
}

const CopyToClipboardButton = (props: CopyToClipboardButtonProps) => {
  const { text } = props;
  const [copied, setCopied] = useState(false);

  const handleCopy = async (event: any) => {
    event?.preventDefault();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <Tooltip
      arrow
      variant="soft"
      size="sm"
      title={copied ? "Copied!" : "Copy to clipboard"}
    >
      <IconButton size="sm" onClick={handleCopy} variant="outlined">
        {copied ? <CheckIcon /> : <ContentCopyIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default CopyToClipboardButton;
