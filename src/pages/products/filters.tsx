import {
  FormControl,
  FormLabel,
  Select,
  Option,
  Grid,
  ListItemDecorator,
  SelectStaticProps,
  IconButton,
  Avatar,
} from "@mui/joy";
import { useEffect, useRef, useState } from "react";
import { CloseRounded } from "@mui/icons-material";
import { ProductStatuses, ProductStatusType } from "../../common/product-utils";
import { IBlockchain } from "../../interfaces/blockchain";
import { getBlockchains } from "../../api/blockchains";

interface FiltersProps {
  onStatusChange: (search: ProductStatusType | null) => void;
  onBlockchainChange: (blockchain: number | null) => void;
}

const Filters = (props: FiltersProps) => {
  const { onStatusChange, onBlockchainChange } = props;
  const actionStatus: SelectStaticProps["action"] = useRef(null);
  const actionBlockchain: SelectStaticProps["action"] = useRef(null);
  const [selectedStatus, setSelectedStatus] =
    useState<ProductStatusType | null>();
  const [selectedBlockchain, setSelectedBlockchain] = useState<number | null>();
  const [blockchains, setBlockchains] = useState<IBlockchain[]>([]);

  const fetchBlockchains = async () => {
    // setBlockchainsLoading(true);
    try {
      const response = await getBlockchains("", 1, 100, "");
      setBlockchains(response.data);
    } catch (error) {
      console.error(error);
    }
    // setBlockchainsLoading(false);
  };

  useEffect(() => {
    fetchBlockchains();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={6}>
        <FormControl size="sm">
          <FormLabel>Status</FormLabel>
          <Select
            size="sm"
            placeholder="Filter by status"
            value={selectedStatus}
            onChange={(_, value) => {
              setSelectedStatus(value);
              onStatusChange(value);
            }}
            {...(selectedStatus && {
              // display the button and remove select indicator
              // when user has selected a value
              endDecorator: (
                <IconButton
                  size="sm"
                  variant="plain"
                  color="neutral"
                  onMouseDown={(event) => {
                    // don't open the popup when clicking on this button
                    event.stopPropagation();
                  }}
                  onClick={() => {
                    setSelectedStatus(null);
                    onStatusChange(null);
                    actionStatus.current?.focusVisible();
                  }}
                >
                  <CloseRounded />
                </IconButton>
              ),
              indicator: null,
            })}
          >
            {ProductStatuses.map((item) => (
              <Option
                key={item.id.toString()}
                label={item.title}
                value={item.value}
              >
                <ListItemDecorator>{item.icon}</ListItemDecorator>
                {item.title}
              </Option>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid xs={12} md={6}>
        <FormControl size="sm">
          <FormLabel>Blockchain</FormLabel>
          <Select
            size="sm"
            placeholder="Filter by Blockchain"
            value={selectedBlockchain}
            onChange={(_, value) => {
              setSelectedBlockchain(value);
              onBlockchainChange(value);
            }}
            {...(selectedBlockchain && {
              // display the button and remove select indicator
              // when user has selected a value
              endDecorator: (
                <IconButton
                  size="sm"
                  variant="plain"
                  color="neutral"
                  onMouseDown={(event) => {
                    // don't open the popup when clicking on this button
                    event.stopPropagation();
                  }}
                  onClick={() => {
                    setSelectedBlockchain(null);
                    onBlockchainChange(null);
                    actionBlockchain.current?.focusVisible();
                  }}
                >
                  <CloseRounded />
                </IconButton>
              ),
              indicator: null,
            })}
          >
            {blockchains.map((item) => (
              <Option
                key={item.id.toString()}
                label={item.name}
                value={item.id}
              >
                <ListItemDecorator>
                  <Avatar size="sm" src={item.logo} sx={{ mx: 1 }} />
                </ListItemDecorator>
                {item.name}
              </Option>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Filters;
