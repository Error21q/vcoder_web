import { Add } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/joy";

interface DataTableHeadProps {
  title: string;
  onClick?: () => void;
  btnText?: string;
  disabled?: boolean;
}

const DataTableHead = (props: DataTableHeadProps) => {
  const { title, disabled, btnText, onClick } = props;
  return (
    <Grid
      container
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography level="h2" mb={1}>
        {title}
      </Typography>
      <Button
        disabled={disabled}
        onClick={onClick}
        size="sm"
        variant="soft"
        startDecorator={<Add />}
      >
        {btnText}
      </Button>
    </Grid>
  );
};

export default DataTableHead;
