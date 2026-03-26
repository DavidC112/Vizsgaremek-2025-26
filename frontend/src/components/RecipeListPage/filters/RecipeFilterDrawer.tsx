import Drawer from "@mui/material/Drawer";
import DrawerContent from "./DrawerContent";

type RecipeFilterDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const RecipeFilterDrawer = ({ open, onClose }: RecipeFilterDrawerProps) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <DrawerContent key={String(open)} onClose={onClose} />
    </Drawer>
  );
};

export default RecipeFilterDrawer;
