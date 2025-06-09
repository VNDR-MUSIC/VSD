
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

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  // Allow all props of AccordionPrimitive.Content, including className, children, dangerouslySetInnerHTML
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, dangerouslySetInnerHTML, ...otherProps }, ref) => {
  
  // Props that will be passed to AccordionPrimitive.Content in both cases
  const primitiveContentProps = {
    ...otherProps, // Spread any other props passed to AccordionContent
    ref,
    className: cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className // User-provided className (e.g., for prose styles)
    ),
  };

  if (dangerouslySetInnerHTML) {
    // If dangerouslySetInnerHTML is provided, pass it directly to AccordionPrimitive.Content.
    // Do NOT render any explicit JSX children for AccordionPrimitive.Content in this branch.
    // The 'children' prop destructured above (from AccordionContent's arguments) is intentionally ignored here.
    // 'otherProps' (and thus primitiveContentProps) should not contain 'children' if it was correctly destructured.
    return (
      <AccordionPrimitive.Content
        {...primitiveContentProps}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      />
    );
  } else {
    // If dangerouslySetInnerHTML is NOT provided, render the 'children' prop (passed to AccordionContent)
    // wrapped in the standard padding div, which becomes the JSX children of AccordionPrimitive.Content.
    return (
      <AccordionPrimitive.Content {...primitiveContentProps}>
        <div className="pb-4 pt-0">{children}</div>
      </AccordionPrimitive.Content>
    );
  }
});
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
