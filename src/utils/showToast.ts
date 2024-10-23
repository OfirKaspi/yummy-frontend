import { toast } from "sonner"

export const showToast = (message: string, type: "success" | "error" | "info", options = {}) => {
    toast[type](message, {
        action: {
            label: (
                "✕"
            ),
            onClick: () => toast.dismiss(),
        },
        ...options,
    })
}