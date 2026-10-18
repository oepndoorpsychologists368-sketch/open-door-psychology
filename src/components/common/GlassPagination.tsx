import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export interface GlassPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  className?: string;
  itemName?: string; // e.g. "articles", "clinicians"
}

export function GlassPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  className = '',
  itemName = 'items',
}: GlassPaginationProps) {
  if (totalPages <= 1 && (!totalItems || totalItems === 0)) {
    return null;
  }

  // Generate pagination items with intelligent truncation
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPageNumbers();

  const startItem = totalItems && pageSize ? (currentPage - 1) * pageSize + 1 : undefined;
  const endItem = totalItems && pageSize ? Math.min(currentPage * pageSize, totalItems) : undefined;

  return (
    <nav
      aria-label="Pagination Navigation"
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-5 rounded-2xl glass-panel ${className}`}
    >
      {/* Total Items & Current Range Text */}
      <div className="text-xs text-[#A9BED1] font-medium text-center sm:text-left">
        {totalItems !== undefined && startItem !== undefined && endItem !== undefined ? (
          <span>
            Showing <span className="font-semibold text-[#F4F8FC] font-mono">{startItem}–{endItem}</span> of{' '}
            <span className="font-semibold text-[#F4F8FC] font-mono">{totalItems}</span> {itemName}
          </span>
        ) : (
          <span>
            Page <span className="font-semibold text-[#F4F8FC] font-mono">{currentPage}</span> of{' '}
            <span className="font-semibold text-[#F4F8FC] font-mono">{totalPages}</span>
          </span>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5">
        {/* First Page Button (Desktop) */}
        {totalPages > 4 && (
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(1)}
            aria-label="Go to first page"
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 text-[#A9BED1] hover:text-[#38D9E6] hover:bg-white/[0.08] hover:border-[#38D9E6]/30 disabled:opacity-30 disabled:hover:text-[#A9BED1] disabled:hover:bg-white/[0.04] disabled:hover:border-white/10 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronsLeft className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Previous Button */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Go to previous page"
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-medium text-[#A9BED1] hover:text-[#38D9E6] hover:bg-white/[0.08] hover:border-[#38D9E6]/30 disabled:opacity-30 disabled:hover:text-[#A9BED1] disabled:hover:bg-white/[0.04] disabled:hover:border-white/10 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Desktop Page Numbers */}
        <div className="hidden sm:flex items-center gap-1 mx-1">
          {pages.map((p, idx) => {
            if (p === '...') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  aria-hidden="true"
                  className="w-8 h-8 flex items-center justify-center text-xs text-[#A9BED1]/50 font-mono"
                >
                  …
                </span>
              );
            }

            const pageNum = p as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Page ${pageNum}`}
                className={`w-8 h-8 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#38D9E6] text-[#06111F] font-bold shadow-sm shadow-[#38D9E6]/30 border border-[#38D9E6]'
                    : 'bg-white/[0.04] border border-white/10 text-[#F4F8FC] hover:bg-white/[0.08] hover:border-[#38D9E6]/30 hover:text-[#38D9E6]'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Mobile Page Sizing indicator */}
        <div className="sm:hidden px-2 text-xs font-mono text-[#A9BED1]">
          {currentPage} / {totalPages}
        </div>

        {/* Next Button */}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Go to next page"
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-medium text-[#A9BED1] hover:text-[#38D9E6] hover:bg-white/[0.08] hover:border-[#38D9E6]/30 disabled:opacity-30 disabled:hover:text-[#A9BED1] disabled:hover:bg-white/[0.04] disabled:hover:border-white/10 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Last Page Button (Desktop) */}
        {totalPages > 4 && (
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
            aria-label="Go to last page"
            className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 text-[#A9BED1] hover:text-[#38D9E6] hover:bg-white/[0.08] hover:border-[#38D9E6]/30 disabled:opacity-30 disabled:hover:text-[#A9BED1] disabled:hover:bg-white/[0.04] disabled:hover:border-white/10 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronsRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </nav>
  );
}
