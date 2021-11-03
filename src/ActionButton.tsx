import {MouseEventHandler} from 'react';
import styled from 'styled-components';

export interface ActionButtonProps {
  onClick?: MouseEventHandler;
  executing?: boolean;
  children: React.ReactNode;
}

const StyledActionButton = styled.button`
  font-family: "SF Pro Display","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
  font-size: 24px;
  line-height: 1.16667;
  font-weight: 600;
  appearance: none;
  border: none;  
  border-radius: 18px;
  box-shadow: 2px 4px 12px rgba(0,0,0,.08);
  background-color: #fff;
  padding: 12px 24px;
  min-width: 150px;
  min-height: 150px;
  cursor: pointer;
  transition: all .3s cubic-bezier(0,0,.5,1);

  &:hover {
    box-shadow: 2px 4px 16px rgba(0,0,0,.16);
    transform: scale3d(1.01,1.01,1.01);
  }
`;

export const ActionButton = ({children, executing, onClick}: ActionButtonProps) => {
  return (
    <StyledActionButton
      onClick={(event: React.MouseEvent<Element, MouseEvent>) => {
        if (executing) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
    >
      {children}
    </StyledActionButton>
  );
};
