import { useFormContext } from "react-hook-form"
import { Trash2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"

type Props = {
  removeMenuItem: () => void
  name: string
}

const MenuItemInput = ({ removeMenuItem, name }: Props) => {
  const { control, watch } = useFormContext()

  const existingImageUrl = watch(`${name}.imageUrl`)

  return (
    <Card className="p-5 space-y-5">

      {/* NAME */}
      <FormField control={control} name={`${name}.name`} render={({ field }) => (
        <FormItem>
          <FormLabel className="flex flex-col gap-1">
            Name
            <FormMessage />
          </FormLabel>
          <FormControl>
            <Input {...field} placeholder="Cheese Pizza" />
          </FormControl>
        </FormItem>
      )}
      />

      {/* PRICE */}
      <FormField control={control} name={`${name}.price`} render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel className="flex flex-col gap-1">
            Price ($)
            <FormMessage />
          </FormLabel>
          <FormControl>
            <Input {...field} value={field.value || ""} type="number" placeholder="8.50" className="no-arrows" />
          </FormControl>
        </FormItem>
      )}
      />

      {/* IMAGE */}
      <div className={existingImageUrl && "grid grid-cols-[92px_1fr] gap-5"}>
        {existingImageUrl && (
          <AspectRatio ratio={1 / 1} >
            <img src={existingImageUrl} className="rounded-md object-cover h-[92px] w-[92px]" />
          </AspectRatio>
        )}
        <div className="flex flex-col gap-5">
          <FormField control={control} name={`${name}.imageFile`} render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="file" accept=".jpg, .jpeg, .png .svg" onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />

          {/* REMOVE ITEM */}
          <Button variant="destructive" type="button" onClick={removeMenuItem} className="gap-2">
            <Trash2 size={16} />
            Remove
          </Button>
        </div>
      </div>


    </Card>
  )
}

export default MenuItemInput