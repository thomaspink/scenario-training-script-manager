import {MouseEventHandler} from 'react';
import styled from 'styled-components';

export interface IconButtonProps {
  onClick?: MouseEventHandler;
  children: React.ReactNode;
}

const StyledIconButton = styled.button`
  appearance: none;
  border: none;  
  border-radius: 4px;
  box-shadow: 2px 4px 12px rgba(0,0,0,.08);
  background-color: #fff;
  cursor: pointer;
  padding: 4px;
  margin: 0;

  &:hover {
    box-shadow: 2px 4px 16px rgba(0,0,0,.16);
    transform: scale3d(1.01,1.01,1.01);
  }

  .icon-button-wrapper {
      width: 24px;
      height: 24px;
  }
`;

export const IconButton = ({children, onClick}: IconButtonProps) => {
  return (
    <StyledIconButton
      onClick={(event: React.MouseEvent<Element, MouseEvent>) => {
        onClick?.(event);
      }}
    >
      <div className="icon-button-wrapper">{children}</div>
    </StyledIconButton>
  );
};
