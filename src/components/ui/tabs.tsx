import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva("", {
  variants: {
    variant: {
      panel:
        "flex h-auto w-full items-stretch overflow-x-auto rounded-md border border-border bg-card p-0 text-muted-foreground",
      compact:
        "inline-flex h-9 w-auto items-center gap-1 rounded-md border border-border bg-muted/40 p-1 text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "panel",
  },
});

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List ref={ref} className={cn(tabsListVariants({ variant }), className)} {...props} />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

interface TabsPanelTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

const TabsPanelTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, TabsPanelTriggerProps>(
  ({ className, icon, title, description, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex min-w-[9.5rem] flex-1 items-start gap-3 border-r border-border px-4 py-4 text-left transition-colors last:border-r-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "data-[state=active]:border-y-2 data-[state=active]:border-y-primary data-[state=active]:bg-primary-soft data-[state=active]:text-primary",
        "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      <span className="mt-0.5 shrink-0 text-muted-foreground group-data-[state=active]:text-primary [&_svg]:size-5">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold leading-tight text-foreground group-data-[state=active]:text-primary">
          {title}
        </span>
        {description ? (
          <span className="mt-1 block text-xs leading-snug text-muted-foreground group-data-[state=active]:text-primary/75">
            {description}
          </span>
        ) : null}
      </span>
    </TabsPrimitive.Trigger>
  ),
);
TabsPanelTrigger.displayName = "TabsPanelTrigger";

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsPanelTrigger, TabsContent };
