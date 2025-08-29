import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  canGoPrevious,
  canGoNext,
}: PaginationControlsProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisiblePages = 2;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('ellipsis');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }

      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => canGoPrevious && onPageChange(currentPage - 1)}
            className={`${!canGoPrevious ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
          >
            {isRTL ? 'التالي' : 'Précédent'}
          </PaginationPrevious>
        </PaginationItem>

        {visiblePages.map((page, index) => (
          <PaginationItem key={index}>
            {page === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => canGoNext && onPageChange(currentPage + 1)}
            className={`${!canGoNext ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
          >
            {isRTL ? 'السابق' : 'Suivant'}
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}