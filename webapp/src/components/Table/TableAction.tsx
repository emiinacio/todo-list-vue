import { Action } from '@/types';
import React from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import * as Icons from 'react-icons/fa';

interface TableActionProps {
  actions: Action[];
  item: any;
}

function TableAction({ actions, item }: TableActionProps) {
  return (
    <>
      <td style={{ whiteSpace: 'nowrap', width: '1%' }}>
        {actions.map((action: Action) => {
          const Icon = action.icon ? Icons[action.icon] : null;

          return (
            <Button
              className="p-0 me-1"
              size="sm"
              onClick={(ev) => action.function(item)}
              style={{ minWidth: '24px', width: 'fit-content', height: '24px' }}
              variant={action.variant}
            >
              {action.icon && Icon ? (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Popover>
                      <div className="p-2">{action.title}</div>
                    </Popover>
                  }
                  delay={{ show: 300, hide: 0 }}
                >
                  <div>
                    <Icon />
                  </div>
                </OverlayTrigger>
              ) : (
                <p className="ps-1 pe-1">{action.title}</p>
              )}
            </Button>
          );
        })}
      </td>
    </>
  );
}

export default TableAction;
