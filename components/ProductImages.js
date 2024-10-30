import styled from "styled-components";
import {useState} from "react";
import ZoomOnHoverImage from "@/components/ZoomOnHoverImage";
import { desc } from "@/lib/descuento";

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
  `;
const BigImage = styled.img`
  max-width: 100%;
  max-height: 500px;
`;
const ImageButtons = styled.div`
    display: flex;
    gap: 10px;
    flex-grow: 0;
    margin: 10px 0px;
  `;
const ImageButton = styled.div`
    border: 2px solid #ccc;
    ${props => props.active ? `
      border-color: #ccc;
    ` : `
      border-color: transparent;
    `}
    height: 50px;
    padding: 2px;
    cursor: pointer;
    border-radius: 5px;
  `;
const BigImageWrapper = styled.div`
position:relative;
  text-align: center;
`;

const Descuento = styled.div`
  position: absolute;
  top: 10px; /* Ajusta la posición verticalmente */
  left: 25px; /* Ajusta la posición horizontalmente */
  background-color: #E53232; /* Color de fondo del texto */
  color: white; /* Color del texto */
  border-radius: 5px;
  padding: 3px; /* Espacio alrededor del texto */
  font-size: 14px; /* Tamaño de fuente */
  @media screen and (min-width: 768px) {
    position: absolute;
    top: 10px; /* Ajusta la posición verticalmente */
    right: 360px; /* Ajusta la posición horizontalmente */
  }
`;
const Rotar = styled.div`
position:absolute;
top:50%;
transform: rotate(-15deg);
color :white;
background-color:#E53232 ;
width: 100%;
padding:1px;
border: 1px solid white;
border-radius:3px
`


export default function ProductImages({images,stock}) {
  const [activeImage,setActiveImage] = useState(images?.[0]);
  return (
    <>
      <BigImageWrapper>
        {/* <BigImage src={activeImage} />  */}
        <ZoomOnHoverImage src={activeImage} alt="Descripción de la imagen" />
        {stock!==0 &&<Descuento>{desc}% OFF</Descuento>}
        {stock==0 &&<Rotar>Agotado</Rotar>}
      </BigImageWrapper>
      <ImageButtons>
        {images.map(image => (
          <ImageButton
            key={image}
            active={image===activeImage}
            onClick={() => setActiveImage(image)}>
            <Image src={image} alt=""/>
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}