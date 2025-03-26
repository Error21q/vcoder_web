import {
  Avatar,
  Modal,
  ModalDialog,
  ModalClose,
  Button,
  Typography,
  Badge,
  DialogTitle,
  Divider,
  DialogContent,
  DialogActions,
  Tabs,
  TabList,
  tabClasses,
  Tab,
  TabPanel,
  Chip,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { Check, Clear, TuneRounded } from "@mui/icons-material";
import { ProductStatuses } from "../../common/product-utils";
import { IBlockchain } from "../../interfaces/blockchain";
import { getBlockchains } from "../../api/blockchains";
import { IProductFilter, IProductFilterFields } from "../../interfaces/product";
import { IPlan } from "../../interfaces/plan";
import { ProductFilterInitialValues } from "../../common/form-values";
import { getPlans } from "../../api/plan";

interface FilterModalProps {
  onApplyFilters: (filters: IProductFilter) => void;
}

const Filters = (props: FilterModalProps) => {
  const { onApplyFilters } = props;
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isApplied, setIsApplied] = useState(false);
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [blockchains, setBlockchains] = useState<IBlockchain[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<IProductFilter>(
    ProductFilterInitialValues
  );

  // Utility to get unique and sorted values
  const getUniqueSortedValues = (key: keyof IPlan) =>
    Array.from(new Set(plans.map((plan) => plan[key])))
      .filter((value) => value !== undefined && value !== null)
      .sort((a, b) => (typeof a === "number" ? a - (b as number) : 0));

  // Configuration array to dynamically render fields
  const filterFields: IProductFilterFields[] = [
    {
      label: "Status",
      key: "status",
      options: ProductStatuses.map((item) => ({
        value: item.value,
        label: item.title,
        icon: item.icon,
      })),
    },
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
      options: getUniqueSortedValues("level")
        .filter((value) => Number(value) > 0)
        .map((value) => ({
          value,
          label: `Level ${value}`,
        })),
    },
    {
      label: "ROI",
      key: "roi",
      options: getUniqueSortedValues("roi")
        .filter((value) => Number(value) > 0)
        .map((value) => ({
          value,
          label: `${value}%`,
        })),
    },
    {
      label: "Referral",
      key: "referral",
      options: getUniqueSortedValues("referral")
        .filter((value) => Number(value) > 0)
        .map((value) => ({
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

          <DialogContent sx={{ maxWidth: 500, maxHeight: 500 }}>
            <Tabs
              value={selectedTab}
              onChange={(_, newValue) => setSelectedTab(Number(newValue))}
              orientation="vertical"
              sx={{ bgcolor: "transparent" }}
            >
              <TabList
                disableUnderline
                sx={{
                  p: 0.5,
                  gap: 0.5,
                  borderRadius: "lg",
                  bgcolor: "background.level2",
                  [`& .${tabClasses.root}[aria-selected="true"]`]: {
                    boxShadow: "sm",
                    bgcolor: "background.surface",
                  },
                }}
              >
                {filterFields.map(({ label }, index) => (
                  <Tab key={index} disableIndicator>
                    <Typography level="title-md">{label}</Typography>
                  </Tab>
                ))}
              </TabList>

              {filterFields.map(({ key, options }, index) => (
                <TabPanel key={key} value={index} sx={{ p: 1 }}>
                  {options.map((option) => (
                    <Chip
                      size="lg"
                      key={option.value}
                      variant={
                        selectedFilters[key] === option.value
                          ? "solid"
                          : "outlined"
                      }
                      color={
                        selectedFilters[key] === option.value
                          ? "primary"
                          : "neutral"
                      }
                      onClick={() => handleFilterChange(key, option.value)}
                      sx={{ m: 0.5 }}
                      startDecorator={
                        option.logo && <Avatar size="sm" src={option.logo} />
                      }
                      endDecorator={
                        selectedFilters[key] === option.value && <Check />
                      }
                    >
                      {option.label}
                    </Chip>
                  ))}
                </TabPanel>
              ))}
            </Tabs>
          </DialogContent>
          <Divider />
          <DialogActions
            orientation="horizontal"
            sx={{ justifyContent: "space-between" }}
          >
            <Button
              onClick={handleClear}
              variant="plain"
              startDecorator={<Clear />}
            >
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
