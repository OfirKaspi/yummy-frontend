import { useFieldArray, useFormContext } from "react-hook-form"
import { Trash2 } from "lucide-react"
import MenuItems from "@/forms/manage-restaurant-form/MenuItems"
import { Button } from "@/components/ui/button"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"


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
												<FormMessage />
											</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="Main courses..."
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<Button variant="destructive" type="button" onClick={() => remove(index)} className="gap-2">
									<Trash2 size={16} />
									Remove
								</Button>
							</div>
							<MenuItems categoryIndex={index} />
							<Separator />
						</div>
					))}
				</FormItem>
			)} />

			<Button
				className="bg-orange-500 dark:hover:bg-orange-400 dark:text-white"
				type="button"
				onClick={() => append({ name: '', menuItems: [{ name: '', price: '' }] })}
			>
				Add Menu Category
			</Button>
		</div>
	)
}

export default MenuCategories