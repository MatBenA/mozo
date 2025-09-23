import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary to-primary/90 text-white shadow-medium hover:shadow-strong hover:-translate-y-0.5 active:translate-y-0 active:shadow-soft",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-medium hover:shadow-strong hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-soft hover:shadow-medium hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-700",
        secondary:
          "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-200 shadow-soft hover:shadow-medium hover:-translate-y-0.5",
        ghost:
          "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl",
        link: "text-primary underline-offset-4 hover:underline font-medium",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-xs",
        lg: "h-14 px-8 py-4 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }