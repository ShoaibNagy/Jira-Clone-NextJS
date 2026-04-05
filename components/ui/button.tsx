import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:bg-neutral-100 disabled:from-neutral-100 disabled:to-neutral-100 disabled:text-neutral-300 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 shadow-sm",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-b from-blue-600 to-blue-700 text-primary-foreground hover:from-blue-700 hover:to-blue-800 aria-expanded:bg-gradient-to-b aria-expanded:from-blue-700 aria-expanded:to-blue-800 active:from-blue-800 active:to-blue-900",
        outline:
          "border-border bg-background shadow-xs hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-white text-black hover:bg-neutral-100 aria-expanded:bg-neutral-100 active:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:aria-expanded:bg-neutral-700 dark:active:bg-neutral-600",
        ghost:
          "border-transparent shadow-none hover:bg-accent hover:text-accent-foreground aria-expanded:bg-accent aria-expanded:text-accent-foreground active:bg-accent active:text-accent-foreground dark:hover:bg-neutral-700 dark:aria-expanded:bg-neutral-700 dark:active:bg-neutral-600",
        destructive:
          "bg-gradient-to-b from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 aria-expanded:bg-gradient-to-b aria-expanded:from-amber-700 aria-expanded:to-amber-800 active:from-amber-800 active:to-amber-900",
        muted: "bg-neutral-200 text-neutral-600 hover:bg-neutral-200/80 aria-expanded:bg-neutral-200/80 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700/80 dark:aria-expanded:bg-neutral-700/80",
        tritary: "bg-blue-100 text-blue-600 border-transparent hover:bg-blue-200 shadow-none aria-expanded:bg-blue-200 aria-expanded:text-blue-600 active:bg-blue-300 active:text-blue-700 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 dark:aria-expanded:bg-blue-800 dark:active:bg-blue-700 dark:active:text-blue-400",
      },
      size: {
        default:
          "h-10 px-4 py-2 gap-2 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        sm: "h-8 rounded-md px-3 text-sm has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-8 rounded-md px-2 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "h-12 rounded-md px-8 text-lg has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9 rounded-full",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
