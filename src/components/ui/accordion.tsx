
"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

// Define more specific props for our AccordionContent wrapper
interface CustomAccordionContentProps
  extends Omit<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>, "dangerouslySetInnerHTML" | "children"> {
  children?: React.ReactNode; // For standard JSX children
  htmlString?: string; // For HTML content to be dangerously set
  // className will be applied to the inner content div
}

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  CustomAccordionContentProps
>(({ className, children, htmlString, ...props }, ref) => {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn( // This className is for the AccordionPrimitive.Content itself (the collapsible animation wrapper)
        "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        // User's className (like prose) is applied to the inner div below
      )}
      {...props} // Pass other AccordionPrimitive.Content props (e.g., forceMount, asChild)
    >
      {/* Inner div that actually holds the content and gets user's className */}
      {htmlString ? (
        <div
          className={cn("pb-4 pt-0", className)} // Apply user's className here
          dangerouslySetInnerHTML={{ __html: htmlString }}
        />
      ) : (
        <div className={cn("pb-4 pt-0", className)}>{children}</div> // Apply user's className here
      )}
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
