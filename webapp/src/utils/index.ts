import { Filter, Sorter } from '@/types';

export function buildFilterParam(filters: Filter[]) {
  return filters
    .filter((filter) => filter.value && filter.value !== '')
    .map((filter) => `${filter.field} ${filter.comparisonType} ${filter.value}`)
    .join(' and ');
}

export function buildSortParam(sorters: Sorter[]) {
  return sorters.map((sorter) => `${sorter.field} ${sorter.direction}`).join(',');
}
