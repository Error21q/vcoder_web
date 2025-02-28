import Box from "@mui/joy/Box";
import Tooltip from "@mui/joy/Tooltip";
import { InfoOutlined } from "@mui/icons-material";
import { IconButton, List, ListDivider, ListItem } from "@mui/joy";
import { IPlan } from "../../interfaces/plan";

interface IPlanInfoProps {
  plan: IPlan;
}

export const PlanInfo = (props: IPlanInfoProps) => {
  const { plan } = props;

  return (
    <Tooltip
      placement="top-end"
      variant="outlined"
      arrow
      title={
        <Box>
          <List size="sm">
            <ListItem sx={{ fontSize: 12 }}>ROI: {plan.roi}%</ListItem>
            <ListDivider inset="gutter" />
            <ListItem sx={{ fontSize: 12 }}>
              Referral: {plan.referral}%
            </ListItem>
            <ListDivider inset="gutter" />
            <ListItem sx={{ fontSize: 12 }}>Level(s): {plan.level}</ListItem>
          </List>
        </Box>
      }
    >
      <IconButton variant="soft" color="primary" size="sm">
        <InfoOutlined />
      </IconButton>
    </Tooltip>
  );
};

export default PlanInfo;
