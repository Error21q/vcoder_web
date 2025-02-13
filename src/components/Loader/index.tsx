import {
  Box,
  BoxProps,
  CircularProgress,
  CircularProgressProps,
} from "@mui/joy";

interface LoaderProps {
  propsCircularProgress?: CircularProgressProps;
  propsBox?: BoxProps;
}

const Loader = (props: LoaderProps) => {
  const { propsBox, propsCircularProgress } = props;
  return (
    <Box alignSelf={"center"} {...propsBox}>
      <CircularProgress
        color="primary"
        size="md"
        value={25}
        variant="solid"
        {...propsCircularProgress}
      />
    </Box>
  );
};

export default Loader;
