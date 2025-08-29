import React from 'react';
import { useTranslation } from 'react-i18next';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
}

export function PriceFilter({ minPrice, maxPrice, onPriceChange }: PriceFilterProps) {
  const { t } = useTranslation();
  const [localMin, setLocalMin] = React.useState(minPrice);
  const [localMax, setLocalMax] = React.useState(maxPrice);

  const handleApply = () => {
    onPriceChange(localMin, localMax);
  };

  const handleReset = () => {
    setLocalMin(0);
    setLocalMax(1000);
    onPriceChange(0, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filtre par prix</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="min-price" className="text-sm">Min (MAD)</Label>
            <Input
              id="min-price"
              type="number"
              value={localMin}
              onChange={(e) => setLocalMin(Number(e.target.value))}
              min="0"
              className="h-8"
            />
          </div>
          <div>
            <Label htmlFor="max-price" className="text-sm">Max (MAD)</Label>
            <Input
              id="max-price"
              type="number"
              value={localMax}
              onChange={(e) => setLocalMax(Number(e.target.value))}
              min="0"
              className="h-8"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleApply} size="sm" className="flex-1">
            Appliquer
          </Button>
          <Button onClick={handleReset} variant="outline" size="sm" className="flex-1">
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}