import { useFieldArray, useFormContext } from "react-hook-form"
import MenuItemsList from "@/forms/manage-restaurant-form/MenuItemsList"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import RemoveButton from "@/components/RemoveButton"
import AddButton from "@/components/AddButton"


const MenuCategories = () => {
	const { control } = useFormContext()
	const { fields, append, remove } = useFieldArray({
		control,
		name: "menuCategories"
	})

	return (
		<div className="space-y-5">
			<div>
				<h2 className="text-2xl font-medium">Menu Categories</h2>
				<FormDescription>
					Create your menu categories and give each category a name and menu items
				</FormDescription>
			</div>
			<FormField control={control} name="menuCategories" render={() => (
				<FormItem className="space-y-5">
					{fields.map((field, index) => (
						<div key={field.id} className="space-y-5">
							<div className="flex items-end gap-2">
								<FormField
									control={control}
									name={`menuCategories.${index}.name`}
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormLabel className="flex flex-col text-xl">
												Category Name
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Main courses..."
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<RemoveButton remove={() => remove(index)} propertyName="category" />
							</div>
							<MenuItemsList categoryIndex={index} />
							<Separator />
						</div>
					))}
				</FormItem>
			)} />

			<AddButton add={() => append({ name: '', menuItems: [{ name: '', price: '' }] })} propertyName="Menu Category" />
		</div>
	)
}

export default MenuCategories