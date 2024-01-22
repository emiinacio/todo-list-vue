import React from 'react';
import { Filter } from '@/types';
import { Column } from './TableRoot';

interface TableFilterProps {
  columns: Column[];
  filters: Filter[];
  selectable?: boolean;
  onFilter: (newFilter: Filter, value: string) => void;
}

function TableFilter({ columns, filters, selectable, onFilter }: TableFilterProps) {
  return (
    <tr>
      {selectable && <th></th>}
      {columns.map((column: Column, index) => {
        const filterIndex = filters.findIndex((filter: Filter) => filter.field === column.field);

        return (filterIndex || filterIndex === 0) && filters[filterIndex] ? (
          <th key={index} className="text-center">
            <input
              type="text"
              onChange={(ev) => onFilter(filters[filterIndex], ev.target.value)}
              value={filters[filterIndex].value}
            />
          </th>
        ) : (
          <th></th>
        );
      })}
    </tr>
  );
}

export default TableFilter;
