import React, { ComponentType } from 'react';
import { Column } from './TableRoot';
import TableSelector from './TableSelector';
import { FORMATTER_LIST, FormatterTypes } from './formatters';
import { Action } from '@/types';
import TableAction from './TableAction';
import TableEditor from './TableEditor';

interface TableRowProps {
  columns: Column[];
  item: any;
  selectable?: boolean;
  keyColumns?: string[];
  selectedRows?: any[];
  actions?: Action[];
  onSelectChange?: (value: boolean, selectedItem: any) => void;
  onUpdate?: (item: any) => void;
}

function TableRow({
  item,
  columns,
  selectable,
  keyColumns,
  selectedRows,
  actions,
  onSelectChange,
  onUpdate
}: TableRowProps) {
  return (
    <tr id="collapseExample">
      {selectable && keyColumns && onSelectChange && item && selectedRows && (
        <TableSelector
          keyColumns={keyColumns}
          item={item}
          onSelectChange={onSelectChange}
          selectedRows={selectedRows}
        />
      )}
      {columns &&
        columns.map((column: Column, index) => {
          let FormatterComponent: ComponentType<any> | undefined;

          if (column.formatter && column.formatterParams) {
            FormatterComponent = FORMATTER_LIST[column.formatterParams!.type] as ComponentType<any>;
          }

          return (
            <>
              <td key={column.field + index} className="text-center">
                <TableEditor
                  column={column}
                  field={column.field}
                  value={item[column.field]}
                  item={item}
                  onUpdate={onUpdate}
                >
                  {column.formatter && column.formatterParams && FormatterComponent ? (
                    <FormatterComponent
                      params={column.formatterParams}
                      value={item[column.field]}
                      item={item}
                      field={column.field}
                    />
                  ) : (
                    <span>{`${item[column.field]}`}</span>
                  )}
                </TableEditor>
              </td>
            </>
          );
        })}

      {actions && <TableAction actions={actions} item={item} />}
    </tr>
  );
}

export default TableRow;
