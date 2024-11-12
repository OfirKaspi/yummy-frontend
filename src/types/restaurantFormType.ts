import { z } from 'zod';

export const menuItemSchema = z.object({
  name: z.string().nonempty("Menu item name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  imageUrl: z.string().optional(),
  imageFile: z.instanceof(File).optional(),
}).refine((data) => data.imageUrl || data.imageFile, {
  message: "Either image URL or image file must be provided",
  path: ["imageFile"],
});

export const menuCategorySchema = z.object({
  name: z.string().nonempty("Category name is required"),
  menuItems: z.array(menuItemSchema).min(1, "Each category must have at least one menu item"),
});

export const restaurantSchema = z.object({
  restaurantName: z.string().nonempty("Restaurant name is required"),
  city: z.string().nonempty("City is required"),
  country: z.string().nonempty("Country is required"),
  deliveryPrice: z.number().min(0, "Delivery price must be positive"),
  estimatedDeliveryTime: z.number().min(0, "Delivery time must be positive"),
  cuisines: z.array(z.string()).nonempty("At least one cuisine is required"),
  menuCategories: z.array(menuCategorySchema).min(1, "At least one category is required"),
  imageUrl: z.string().optional(),
  imageFile: z.instanceof(File).optional(),
}).refine((data) => data.imageUrl || data.imageFile, {
  message: "Either image URL or image file must be provided",
  path: ["imageFile"],
});

export type RestaurantFormValues = z.infer<typeof restaurantSchema>;