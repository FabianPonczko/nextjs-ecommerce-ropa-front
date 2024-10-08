import styled, {css} from "styled-components";
import {primary,azulMP} from "@/lib/colors";

export const ButtonStyle = css`
  border:0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight:500;
  svg{
    height: 16px;
    margin-right: 5px;
  }
  ${props => props.block && css`
    display: block;
    width: 100%;
    padding:15px;
    margin-top:5px;
    font-Family: Poppins;
    font-size: 16px;
  `}
  ${props => props.flex && css`
    display: flex;
    justify-content:center;
    color: ${primary};
    width: 100%;
  `}
  ${props => props.white && !props.outline && css`
    background-color: #004400;
    color: white;
    padding: 10px 15px;
    margin-top:10px
  `}
  ${props => props.yellow && !props.outline && css`
    background-color: #ffd300;
    color: #000;
    border: 1px solid #4545;
    padding: 10px 5px;
  `}
  ${props => props.black && !props.outline && css`
    background-color: #000;
    color: #fff;
  `}
  ${props => props.black && props.outline && css`
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
  `}
  ${props => props.primary && !props.outline && css`
    background-color: ${primary};
    border: 1px solid ${primary};
    color:#fff;
  `}
  ${props => props.azulMP && !props.outline && css`
    background-color: ${azulMP};
    border: 1px solid ${primary};
    color:#fff;
    margin-top:10px;
    font-family: arial;
    height: 50px;
  `}
  ${props => props.primary && props.outline && css`
    background-color: transparent;
    border: 1px solid ${primary};
    color:${primary};
  `}
  ${props => props.size === 'l' && css`
    font-size:1.2rem;
    padding: 10px 20px;
    svg{
      height: 20px;
    }
  `}
  ${props => props.gray && !props.outline && css`
    background-color: ;
    text-Decoration: underline ;
    color: gray;
    padding: 1px 15px;
    margin-top:5px
  `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({children,...rest}) {
  return (
    <StyledButton {...rest}>{children}</StyledButton>
  );
}