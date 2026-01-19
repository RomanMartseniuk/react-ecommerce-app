import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
   children: React.ReactNode;
   tooltipText: string;
}

const TooltipedComponent: React.FC<Props> = ({children, tooltipText}) => {
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default TooltipedComponent