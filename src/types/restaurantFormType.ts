import { z } from 'zod'

export const menuItemSchema = z.object({
  name: z.string().min(2, "Menu item name must be at least 2 characters").nonempty("Menu item name is required"),
  price: z.coerce.number()
    .min(0, "Price must be a positive number")
    .max(1000, "Price must be lower than 1000")
    .refine((val) => val % 1 === 0, { message: "Price must be a whole number" }),
  imageUrl: z.string().url("Image URL must be a valid URL").optional(),
  imageFile: z.instanceof(File).optional(),
}).refine((data) => data.imageUrl || data.imageFile, {
  message: "Either image URL or image file must be provided",
  path: ["imageFile"],
})

export const menuCategorySchema = z.object({
  name: z.string()
    .min(1, "Category name must be at least 1 characters")
    .max(30, "Category name cannot exceed 30 characters")
    .nonempty("Category name is required"),
  menuItems: z.array(menuItemSchema).min(1, "Each category must have at least one menu item"),
})

export const restaurantSchema = z.object({
  restaurantName: z.string()
    .min(1, "Restaurant name must be at least 1 characters")
    .max(30, "Restaurant name cannot exceed 30 characters")
    .nonempty("Restaurant name is required"),
  city: z.string().nonempty("City is required")
    .min(2, "City name must be at least 2 characters"),
  country: z.string().nonempty("Country is required").default("Israel"),
  description: z.string()
    .min(1, "Description must be at least 1 characters")
    .max(500, "Description cannot exceed 500 characters")
    .nonempty("Description is required"),
  deliveryPrice: z.coerce.number()
    .min(0, "Delivery price must be a positive number")
    .max(200, "Delivery price cannot exceed 200")
    .refine((val) => val % 1 === 0, { message: "Delivery price must be a whole number" }),
  estimatedDeliveryTime: z.coerce.number()
    .min(0, "Estimated delivery must be a positive number")
    .max(120, "Estimated delivery time cannot exceed 120 minutes")
    .refine((val) => val % 1 === 0, { message: "Estimated delivery time must be a whole number" }),
  cuisines: z.array(z.string()).nonempty("At least one cuisine is required"),
  menuCategories: z.array(menuCategorySchema).min(1, "At least one category is required"),
  imageUrl: z.string().url("Restaurant image URL must be a valid URL").optional(),
  imageFile: z.instanceof(File).optional(),
}).refine((data) => data.imageUrl || data.imageFile, {
  message: "Either image URL or image file must be provided",
  path: ["imageFile"],
})

export type RestaurantFormValues = z.infer<typeof restaurantSchema>