import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type FilterAccordionProps = {
  label: string;
  activeCount?: number;
  children: React.ReactNode;
  defaultExpanded?: boolean;
};

const FilterAccordion = ({
  label,
  activeCount = 0,
  children,
  defaultExpanded = false,
}: FilterAccordionProps) => {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      disableGutters
      elevation={0}
      sx={{
        border: "1px solid #e5e7eb",
        borderRadius: "0.75rem !important",
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon fontSize="small" className="text-neutral-500" />
        }
        sx={{
          px: 2,
          minHeight: 48,
          "& .MuiAccordionSummary-content": { alignItems: "center", gap: 1 },
        }}
      >
        <span className="text-sm font-medium text-neutral-700">{label}</span>
        {activeCount > 0 && (
          <span className="bg-primary-green-100 text-primary-green-700 mr-2 ml-auto rounded-full px-2 py-0.5 text-xs font-semibold">
            {activeCount}
          </span>
        )}
      </AccordionSummary>
      <AccordionDetails sx={{ px: 2, pb: 2, pt: 0 }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterAccordion;
