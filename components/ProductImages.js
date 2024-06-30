import styled from "styled-components";
import {useState} from "react";
import ZoomOnHoverImage from "@/components/ZoomOnHoverImage";

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
  top: 15px; /* Ajusta la posición verticalmente */
  right: 235px; /* Ajusta la posición horizontalmente */
  background-color: #E53232; /* Color de fondo del texto */
  color: white; /* Color del texto */
  padding: 2px; /* Espacio alrededor del texto */
  font-size: 14px; /* Tamaño de fuente */
  @media screen and (min-width: 768px) {
    position: absolute;
    top: 10px; /* Ajusta la posición verticalmente */
    right: 360px; /* Ajusta la posición horizontalmente */
  }
`;


export default function ProductImages({images}) {
  const [activeImage,setActiveImage] = useState(images?.[0]);
  return (
    <>
      <BigImageWrapper>
        {/* <BigImage src={activeImage} />  */}
        <ZoomOnHoverImage src={activeImage} alt="Descripción de la imagen" />
        <Descuento>30% OFF</Descuento>
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