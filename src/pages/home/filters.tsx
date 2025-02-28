import {
  FormControl,
  FormLabel,
  Select,
  Option,
  ListItemDecorator,
  Avatar,
  Modal,
  ModalDialog,
  ModalClose,
  Button,
  Typography,
  Grid,
  Badge,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { TuneRounded } from "@mui/icons-material";
import { IBlockchain } from "../../interfaces/blockchain";
import { getBlockchains } from "../../api/blockchains";
import { IProductFilter, IProductFilterFields } from "../../interfaces/product";
import { IPlan } from "../../interfaces/plan";
import { getPlans } from "../../api/plan";
import { ProductFilterInitialValues } from "../../common/form-values";

interface FilterModalProps {
  onApplyFilters: (filters: IProductFilter) => void;
}

const Filters = ({ onApplyFilters }: FilterModalProps) => {
  const [open, setOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [blockchains, setBlockchains] = useState<IBlockchain[]>([]);
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<IProductFilter>(
    ProductFilterInitialValues
  );

  // Fetch blockchains
  const fetchBlockchains = async () => {
    try {
      const response = await getBlockchains("", 1, 100, "");
      setBlockchains(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch plans
  const fetchPlans = async () => {
    try {
      const response = await getPlans("", 1, 100, "");
      setPlans(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlockchains();
    fetchPlans();
  }, []);

  // Utility to get unique and sorted values
  const getUniqueSortedValues = (key: keyof IPlan) =>
    Array.from(new Set(plans.map((plan) => plan[key])))
      .filter((value) => value !== undefined && value !== null)
      .sort((a, b) => (typeof a === "number" ? a - (b as number) : 0));

  // Configuration array to dynamically render fields
  const filterFields: IProductFilterFields[] = [
    {
      label: "Blockchain",
      key: "blockchainId",
      options: blockchains.map((item) => ({
        value: item.id,
        label: item.name,
        logo: item.logo,
      })),
    },
    {
      label: "Level",
      key: "level",
      options: getUniqueSortedValues("level").map((value) => ({
        value,
        label: `Level ${value}`,
      })),
    },
    {
      label: "ROI",
      key: "roi",
      options: getUniqueSortedValues("roi").map((value) => ({
        value,
        label: `${value}%`,
      })),
    },
    {
      label: "Referral",
      key: "referral",
      options: getUniqueSortedValues("referral").map((value) => ({
        value,
        label: `${value}%`,
      })),
    },
  ] as const;

  // Handle filter changes
  const handleFilterChange = (
    key: IProductFilter | any,
    value: number | string | null
  ) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Apply filters
  const handleApply = () => {
    if (!selectedFilters) return;
    onApplyFilters(selectedFilters);
    setIsApplied(true);
    setOpen(false);
  };

  // Clear filters
  const handleClear = () => {
    setSelectedFilters(ProductFilterInitialValues);
    setIsApplied(false);
    onApplyFilters(ProductFilterInitialValues);
  };

  return (
    <>
      <Badge badgeContent={isApplied ? "" : null} color="primary">
        <Button
          size="lg"
          startDecorator={<TuneRounded />}
          onClick={() => setOpen(true)}
          variant={isApplied ? "solid" : "outlined"}
        >
          Filters
        </Button>
      </Badge>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose />
          <DialogTitle>
            <Typography level="h4">Filters</Typography>
          </DialogTitle>
          <Divider />

          <DialogContent sx={{ p: { md: 2 } }}>
            <Grid sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {filterFields.map(({ label, key, options }) => (
                <Grid key={key} xs={12}>
                  <FormControl>
                    <FormLabel>{label}</FormLabel>
                    <Select
                      size="sm"
                      placeholder={`Filter by ${label}`}
                      value={selectedFilters?.[key]}
                      onChange={(_, value) => handleFilterChange(key, value)}
                      sx={{ boxShadow: "none" }}
                    >
                      {options.map((option) => (
                        <Option key={option.value} value={option.value}>
                          {option.icon && option.icon}
                          {option.logo && (
                            <ListItemDecorator>
                              <Avatar
                                size="sm"
                                src={option.logo}
                                sx={{ mx: 1 }}
                              />
                            </ListItemDecorator>
                          )}
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              ))}
            </Grid>
          </DialogContent>

          <Divider />

          <DialogActions
            orientation="horizontal"
            sx={{ justifyContent: "space-between" }}
          >
            <Button onClick={handleClear} variant="outlined">
              Clear Filters
            </Button>

            <Button
              onClick={handleApply}
              variant="solid"
              disabled={
                selectedFilters &&
                Object.values(selectedFilters).every((val) => val === null)
              }
            >
              Apply Filters
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default Filters;
