import {createGlobalStyle} from "styled-components";
import {CartContextProvider} from "@/components/CartContext";
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

const GlobalStyles = createGlobalStyle`
  url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
 url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: Cormorant+Garamond, 'Poppins', sans-serif;
  }
    .inner-image-zoom__zoomed-image {
    border: 8px solid #000; /* Cambiar el borde de la imagen con zoom */
    box-shadow: 10px 4px 8px rgba(0, 0, 0, 0.1); /* Agregar una sombra a la imagen con zoom */
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
