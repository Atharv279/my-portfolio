"use client";

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
  Children,
  isValidElement,
  createContext,
  useContext,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface BentoContextType {
  expandedId: string | null;
  handleExpand: (id: string) => void;
  handleCollapse: () => void;
}

const BentoContext = createContext<BentoContextType | null>(null);

export function useBento() {
  const context = useContext(BentoContext);
  if (!context) {
    throw new Error("useBento must be used within a BentoGrid");
  }
  return context;
}

export default function BentoGrid({ children }: { children: ReactNode }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleExpand = useCallback((id: string) => {
    // Snapshot the trigger so we can restore focus when the dialog closes.
    previouslyFocused.current = document.activeElement as HTMLElement | null;
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

  // Focus management: move focus into the dialog when it opens, and restore
  // focus to the originating card when it closes (WCAG focus-management).
  useEffect(() => {
    if (expandedId) {
      const t = window.setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
    const target = previouslyFocused.current;
    if (target && typeof target.focus === "function") {
      target.focus();
    }
  }, [expandedId]);

  // Find the expanded child to render in overlay. Supports nested children (e.g. inside ContainerScroll).
  const findExpandedChild = (nodes: ReactNode, targetId: string): ReactNode => {
    let found: ReactNode = null;
    Children.forEach(nodes, (child) => {
      if (found) return;
      if (isValidElement<{ id?: string }>(child) && child.props.id === targetId) {
        found = child;
      } else if (isValidElement<{ children?: ReactNode }>(child) && child.props.children) {
        found = findExpandedChild(child.props.children, targetId);
      }
    });
    return found;
  };

  const expandedChild = expandedId ? findExpandedChild(children, expandedId) : null;

  const contextValue = {
    expandedId,
    handleExpand,
    handleCollapse,
  };

  return (
    <BentoContext.Provider value={contextValue}>
      <motion.div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-4 lg:grid-cols-4 auto-rows-auto md:auto-rows-[minmax(180px,auto)]">
        {children}
      </motion.div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expandedId &&
          expandedChild &&
          isValidElement<{
            id?: string;
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
                aria-hidden="true"
              />

              {/* Expanded card container — acts as the modal dialog. */}
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Expanded card details"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                onClick={handleCollapse}
              >
                <div
                  className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-2xl scroll-smooth expanded-scroll"
                  onClick={(e) => e.stopPropagation()}
                >
                  <BentoContext.Provider
                    value={{
                      ...contextValue,
                      // In the overlay, the card is always "expanded" and expansion trigger is disabled.
                      expandedId: expandedChild.props.id ?? null,
                    }}
                  >
                    <div className="flex flex-col w-full !cursor-default !overflow-visible">
                      {expandedChild}
                    </div>
                  </BentoContext.Provider>
                </div>

                {/* Close button — 44×44 minimum touch target (h-11 w-11). */}
                <motion.button
                  ref={closeButtonRef}
                  type="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  onClick={handleCollapse}
                  className="absolute right-4 top-4 z-60 flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-surface text-ink-muted backdrop-blur-sm transition-colors active:bg-surface-strong md:right-8 md:top-8 md:hover:bg-surface-strong md:hover:text-ink outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label="Close expanded card"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </motion.button>
              </div>
            </>
          )}
      </AnimatePresence>
    </BentoContext.Provider>
  );
}
