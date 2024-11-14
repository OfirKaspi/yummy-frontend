import * as React from "react"
import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, onInput, ...props }, ref) => {

    const handleResize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = event.target
      textarea.style.height = "auto" // Reset the height
      textarea.style.height = `${textarea.scrollHeight}px` // Set it to scroll height
    }

    return (
      <textarea
        className={cn(
          "flex w-full min-h-[60px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onInput={(event) => {
          handleResize(event as React.ChangeEvent<HTMLTextAreaElement>)
          onInput?.(event)
        }}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }
