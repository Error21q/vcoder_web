import {
  Box,
  BoxProps,
  CircularProgress,
  CircularProgressProps,
  Typography,
  TypographyProps,
} from "@mui/joy";

interface LoaderProps {
  propsCircularProgress?: CircularProgressProps;
  propsTypography?: TypographyProps;
  propsBox?: BoxProps;
  text?: string;
}

const Loader = (props: LoaderProps) => {
  const { propsBox, propsTypography, propsCircularProgress, text } = props;
  return (
    <Box alignSelf={"center"} {...propsBox}>
      <CircularProgress
        color="primary"
        size="md"
        value={25}
        variant="solid"
        {...propsCircularProgress}
      />
      {text && <Typography {...propsTypography}>{text}</Typography>}
    </Box>
  );
};

export default Loader;
