import { showToast } from "@/utils/showToast";
import { Button } from "./ui/button";

type Props = {
  add: () => void;
  propertyName: string;
};


const AddButton = ({ add, propertyName }: Props) => {
  const handleAdd = () => {
    add()
    showToast(`${propertyName} added successfully`, "success")
  }

  return (
    <Button className="bg-orange-500 dark:hover:bg-orange-400 dark:text-white" type="button" onClick={handleAdd}>
      Add {propertyName}
    </Button>
  )
}

export default AddButton