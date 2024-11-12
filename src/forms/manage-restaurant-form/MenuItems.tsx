import { useFieldArray, useFormContext } from "react-hook-form"
import MenuItemInput from "@/forms/manage-restaurant-form/MenuItemInput"
import { FormDescription, FormField, FormItem } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

type MenuSectionProps = {
  categoryIndex: number
}

const MenuItems = ({ categoryIndex }: MenuSectionProps) => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: `menuCategories.${categoryIndex}.menuItems`
  })

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg">Menu Items</h2>
        <FormDescription>
          Create your menu and give each item a name and a price
        </FormDescription>
      </div>
      <FormField control={control} name={`menuCategories.${categoryIndex}.menuItems`} render={() => (
        <FormItem className="grid gap-5 md:grid-cols-2">
          {fields.map((field, index) => (
            <MenuItemInput
              key={field.id}
              removeMenuItem={() => remove(index)}
              name={`menuCategories.${categoryIndex}.menuItems.${index}`}
            />
          ))}
        </FormItem>
      )} />
      <Button className="bg-orange-500 dark:hover:bg-orange-400 dark:text-white" type="button" onClick={() => append({ name: "", price: "" })}>
        Add Menu Item
      </Button>
    </div>
  )
}

export default MenuItems