import { useFieldArray, useFormContext } from "react-hook-form"
import MenuItemCard from "@/forms/manage-restaurant-form/MenuItemCard"
import { FormDescription, FormField, FormItem } from "@/components/ui/form"
import AddButton from "@/components/AddButton"

type MenuSectionProps = {
  categoryIndex: number
}

const MenuItemsList = ({ categoryIndex }: MenuSectionProps) => {
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
            <MenuItemCard
              key={field.id}
              removeMenuItem={() => remove(index)}
              name={`menuCategories.${categoryIndex}.menuItems.${index}`}
            />
          ))}
        </FormItem>
      )} />
      <AddButton add={() => append({ name: "", price: "" })} propertyName="Menu Item" />
    </div>
  )
}

export default MenuItemsList