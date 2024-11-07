import { useFormContext } from "react-hook-form"
import { Trash2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

type Props = {
    index: number
    removeMenuItem: () => void
}

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
    const { control } = useFormContext()

    return (
        <Card className="p-5 space-y-5 bg-transparent sm:shadow-none sm:border-0 sm:p-0 sm:space-y-0 sm:flex sm:flex-row sm:items-end sm:gap-2">
            <FormField
                control={control}
                name={`menuItems.${index}.name`}
                render={({ field, fieldState }) => (
                    <FormItem>
                        <FormLabel className="flex items-center gap-1">
                            Name
                            {fieldState.error ? " - " : ""}
                            <FormMessage />
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder="Cheese Pizza"
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
            <div className="flex gap-2 items-end">
                <FormField
                    control={control}
                    name={`menuItems.${index}.price`}
                    render={({ field, fieldState }) => (
                        <FormItem className="flex-1">
                            <FormLabel className="flex items-center gap-1">
                                Price ($)
                                {fieldState.error ? " - " : ""}
                                <FormMessage />
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    value={field.value || ""}
                                    type="number"
                                    placeholder="8.50"
                                    className="no-arrows"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    variant={"destructive"}
                    type="button"
                    onClick={removeMenuItem}
                    className="max-h-fit gap-2"
                >
                    <Trash2 className="h-4 w-4 text-white" />
                    Remove Menu Item
                </Button>
            </div>
        </Card>
    )
}

export default MenuItemInput