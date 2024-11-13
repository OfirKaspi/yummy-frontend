import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { showToast } from "@/utils/showToast";

type Props = {
  remove: () => void;
  propertyName: string;
};

const RemoveButton = ({ remove, propertyName }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const handleClose = () => setIsDialogOpen(false)

  const handleRemove = () => {
    remove()
    setIsDialogOpen(false)
    showToast(`${propertyName} removed successfully`, "success")
  }


  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" type="button" className="gap-2" onClick={() => setIsDialogOpen(true)}>
          <Trash2 size={16} />
          Remove
        </Button>
      </DialogTrigger>
      <DialogContent className="p-5 w-[300px] rounded-lg md:w-[400px]">
        <DialogTitle>Remove {propertyName}</DialogTitle>
        <span className="text-muted-foreground text-sm">Are you sure you want to remove this {propertyName}?</span>
        <span className="text-red-500 text-sm">
          Warning: Removing this {propertyName} will result in its permanent deletion and it cannot be recovered.
        </span>
        <div className="grid grid-cols-2 gap-5">
          <Button variant="destructive" type="button" onClick={handleRemove} className="gap-1">
            <Trash2 size={16} />
            Remove
          </Button>
          <Button
            type="button"
            className="bg-orange-500 dark:hover:bg-orange-400 text-white"
            onClick={handleClose}
          >
            <Cross2Icon />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveButton;
