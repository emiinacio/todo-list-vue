import React from 'react';
import { Column } from './TableRoot';

interface TableFooter {
  items: any[];
  columns: Column[];
  selectable?: boolean;
  actions?: boolean;
  pageable?: boolean;
}

function TableFooter({ items, columns, selectable, actions, pageable }: TableFooter) {
  return (
    <tfoot>
      {!pageable && (
        <tr>
          {selectable && <th></th>}
          {columns &&
            items &&
            items.length > 0 &&
            columns.map((column: Column) => (
              <th className="text-center">
                {column.footerSum &&
                  items.reduce((total: number, currentItem: any) => {
                    const itemValue = parseFloat(currentItem[column.field]);
                    return total + (isNaN(itemValue) ? 0 : itemValue);
                  }, 0)}
              </th>
            ))}
          {actions && <th></th>}
        </tr>
      )}
    </tfoot>
  );
}

export default TableFooter;
