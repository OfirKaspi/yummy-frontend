import { useFormContext } from "react-hook-form"
import { Trash2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type Props = {
    index: number
    removeMenuItem: () => void
}

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
    const { control } = useFormContext()

    return (
        <div className="space-y-2 sm:space-y-0 sm:flex sm:flex-row sm:items-end sm:gap-2">
            <FormField
                control={control}
                name={`menuItems.${index}.name`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center gap-1">
                            Name <FormMessage />
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder="Cheese Pizza"
                                className="bg-white"
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
            <div className="flex gap-2 items-end">
                <FormField
                    control={control}
                    name={`menuItems.${index}.price`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-1">
                                Price ($) <FormMessage />
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    value={field.value || ""}
                                    type="number"
                                    step="0.01"
                                    placeholder="8.50"
                                    className="bg-white"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    type="button"
                    onClick={removeMenuItem}
                    className="bg-red-500 max-h-fit"
                >
                    <Trash2 className="h-4 w-4 text-white" />
                </Button>
            </div>
        </div>
    )
}

export default MenuItemInput