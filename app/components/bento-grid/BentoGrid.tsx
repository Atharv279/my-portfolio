"use client";

import { useState, useCallback, useEffect, type ReactNode, Children, cloneElement, isValidElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";


export default function BentoGrid({ children }: { children: ReactNode }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleExpand = useCallback((id: string) => {
    setExpandedId(id);
  }, []);

  const handleCollapse = useCallback(() => {
    setExpandedId(null);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!expandedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCollapse();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expandedId, handleCollapse]);

  // Lock body scroll when expanded
  useEffect(() => {
    if (expandedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [expandedId]);

  // Inject onExpand and isExpanded into BentoCard children only (skip native HTML elements)
  const enhancedChildren = Children.map(children, (child) => {
    if (
      isValidElement<{ id?: string; onExpand?: (id: string) => void; isExpanded?: boolean }>(child) &&
      child.props.id &&
      typeof child.type !== "string" // skip native <div>, <section>, etc.
    ) {
      return cloneElement(child, {
        onExpand: handleExpand,
        isExpanded: child.props.id === expandedId,
      });
    }
    return child;
  });

  // Find the expanded child to render in overlay
  const expandedChild = expandedId
    ? Children.toArray(children).find(
        (child) => isValidElement<{ id?: string }>(child) && child.props.id === expandedId,
      )
    : null;

  return (
    <>
      <motion.div
        className="mx-auto grid max-w-7xl grid-cols-1 gap-3 md:gap-4 md:grid-cols-3 lg:grid-cols-4 auto-rows-auto md:auto-rows-[minmax(180px,auto)]"
      >
        {enhancedChildren}
      </motion.div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expandedId && expandedChild && isValidElement<{
          id?: string;
          className?: string;
          isExpanded?: boolean;
          onExpand?: (id: string) => void;
        }>(expandedChild) && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={handleCollapse}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
            />

            {/* Expanded card container */}
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
              onClick={handleCollapse}
            >
              <div
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-2xl scroll-smooth expanded-scroll"
                onClick={(e) => e.stopPropagation()}
              >
                {cloneElement(expandedChild, {
                  className: "flex flex-col w-full !cursor-default !overflow-visible",
                  isExpanded: true,
                  onExpand: undefined,
                })}
              </div>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                onClick={handleCollapse}
                className="absolute right-4 top-4 z-60 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.06] text-zinc-400 backdrop-blur-sm transition-colors active:bg-white/10 md:right-8 md:top-8 md:hover:bg-white/10 md:hover:text-zinc-50"
                aria-label="Close expanded card"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
