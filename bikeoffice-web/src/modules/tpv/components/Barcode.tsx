import { useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';
import { createCanvas } from 'canvas';
import CryptoJS from 'crypto-js';

export const Barcode = ({ text, width, height }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = createCanvas(width, height);
    JsBarcode(canvas, CryptoJS.SHA1(text).toString().slice(0, 10), { format: 'CODE128', displayValue: true, fontSize: 10 });
    canvasRef.current.src = canvas.toDataURL();
  }, [text, width, height]);

  return <img ref={canvasRef} alt="Barcode" />;
};
