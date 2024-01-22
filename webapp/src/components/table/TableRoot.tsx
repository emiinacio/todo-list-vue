import React from 'react';
import { Table as BsTable } from 'react-bootstrap';
import { Action, ContextMenuOption, Filter, Sorter } from '@/types';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableBody from './TableBody';
import TablePagination from './TablePagination';
import TableSearch from './TableSearch';
import TableFooter from './TableFooter';
import ContextMenu from '../contextMenu';
import ContextMenuItem from '../contextMenu/ContextMenuItem';

export type Column = {
  title: string;
  field: string;
  type?: string;
  filterable?: boolean;
  sortable?: boolean;
  formatter?: boolean;
  formatterParams?: { [key: string]: string };
  editable?: boolean;
  footerSum?: boolean;
  order?: number;
};

export type TableProps = {
  items: any[];
  columns: Column[];
  filters?: Filter[];
  sorters?: Sorter[];

  currentPage?: number;
  pageItems?: number;
  totalItems?: number;
  totalPages?: number;
  pageable?: boolean;
  formatter?: boolean;
  formatterParams?: { [key: string]: string };

  selectable?: boolean;
  keyColumns?: string[];
  selectedRows?: any[];
  actions?: Action[];
  search?: string;
  contextMenu?: ContextMenuOption[];

  setColumns: React.Dispatch<React.SetStateAction<any[]>>;
  onSearch?: (searchText: string) => void;
  onSort?: (sorter: Sorter) => void;
  onFilterChange?: (newFilter: Filter, value: string) => void;
  onPageChange?: (currentPage: number) => void;
  onSelectChange?: (value: boolean, selectedItem: any) => void;
  onUpdate?: (item: any) => void;
};

function Table({
  items,
  columns,
  filters,
  sorters,
  currentPage,
  pageItems,
  totalItems,
  totalPages,
  pageable,
  keyColumns,
  selectable,
  selectedRows,
  actions,
  search = '',
  contextMenu,
  setColumns,
  onSearch,
  onSort,
  onFilterChange,
  onPageChange,
  onSelectChange,
  onUpdate
}: TableProps) {
  const tableRef = React.useRef<HTMLTableElement>(null);

  return (
    <div className="bg-white p-3">
      { onSearch && <TableSearch search={search} onSearch={onSearch} />}
      <BsTable striped hover ref={tableRef}>
        <TableHeader
          columns={columns}
          setColumns={setColumns}
          sorters={sorters}
          filters={filters}
          selectable={selectable}
          actions={actions ? true : false}
          onSort={onSort}
          onFilter={onFilterChange}
        />

        <TableBody>
          <>
            {items &&
              items.map((item: any, index: number) => (
                <TableRow
                  columns={columns}
                  item={item}
                  key={index}
                  selectable={selectable}
                  keyColumns={keyColumns}
                  selectedRows={selectedRows}
                  actions={actions}
                  onSelectChange={onSelectChange}
                  onUpdate={onUpdate}
                />
              ))}
          </>
        </TableBody>
        <TableFooter
          items={items}
          columns={columns}
          selectable={selectable}
          actions={actions ? true : false}
          pageable={pageable}
        />
        <menu id="contextmenu" />
      </BsTable>

      {pageable &&
        (currentPage || currentPage === 0) &&
        onPageChange &&
        pageItems &&
        totalItems &&
        totalPages && (
          <TablePagination
            currentPage={currentPage}
            onPageChange={onPageChange}
            pageItems={pageItems}
            totalItems={totalItems}
            totalPages={totalPages}
          />
        )}

        <ContextMenu elementRef={tableRef} offsetX={96} offsetY={79}>
            {contextMenu &&
              contextMenu.map((menuOption: ContextMenuOption) => {
                const useSelectedRows = menuOption.useSelectedRows;
                const onClickParams = useSelectedRows ? selectedRows : items;
                const isValidOption = useSelectedRows ? selectedRows && selectedRows.length > 0 : true;

                return (
                  <ContextMenuItem
                    key={menuOption.title}
                    icon={menuOption.icon ?? ''}
                    label={menuOption.title ?? ''}
                    onClick={(e: React.MouseEventHandler) => menuOption.function(onClickParams)}
                    disabled={useSelectedRows && !isValidOption}
                  />
                );
              })}
        </ContextMenu>
    </div>
  );
}

export default Table;
