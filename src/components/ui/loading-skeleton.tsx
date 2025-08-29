import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function ProductSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[3/4] bg-gray-200 animate-pulse" />
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 animate-pulse rounded" />
          <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
          <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2" />
        </div>
      </CardContent>
    </Card>
  );
}

export function CategorySkeleton() {
  return (
    <div className="flex gap-2 mb-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-10 w-24 bg-gray-200 animate-pulse rounded-full" />
      ))}
    </div>
  );
}

export function TagsSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-6 bg-gray-200 animate-pulse rounded w-24" />
      <div className="flex flex-wrap gap-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-8 bg-gray-200 animate-pulse rounded-full w-20" />
        ))}
      </div>
    </div>
  );
}
export function TableSkeleton({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <div className="overflow-x-auto">
      <div className="w-full">
        {/* Header skeleton */}
        <div className="border-b">
          <div className="flex">
            {[...Array(columns)].map((_, i) => (
              <div key={i} className="h-12 px-4 flex-1">
                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Rows skeleton */}
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={rowIndex} className="border-b">
            <div className="flex">
              {[...Array(columns)].map((_, colIndex) => (
                <div key={colIndex} className="p-4 flex-1">
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}