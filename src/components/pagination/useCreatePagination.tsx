import { useMemo } from 'react';

export const DOTS = '...';

const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

interface IUsePaginationHookProps {
    totalCount: number;
    totalPagesCount?: number;
    count: number;
    siblingCount: number;
    currentPage: number;
}

export const useCreatePagination = ({
    totalCount,
    count,
    siblingCount,
    currentPage,
}: IUsePaginationHookProps) => {
    const paginationRange = useMemo(() => {
        const pages = Math.ceil(totalCount / count);

        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= pages) {
            return range(1, pages);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, pages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < pages - 2;

        const firstPageIndex = 1;
        const lastPageIndex = pages;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            const leftRange = range(1, leftItemCount);

            return [...leftRange, DOTS, pages];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            const rightRange = range(pages - rightItemCount + 1, pages);
            return [firstPageIndex, DOTS, ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }

        return null;
    }, [totalCount, siblingCount, currentPage, count]);

    return paginationRange;
};
