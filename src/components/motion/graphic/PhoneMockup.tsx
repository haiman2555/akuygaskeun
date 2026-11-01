import React from "react";
import { colors } from "../../../style/tokens";

/**
 * Mockup HP flat putih (Montage_Editing). Ukuran mengikuti `width`;
 * proporsi body 1 : 1.72 seperti referensi. Isi layar lewat children,
 * dengan sistem koordinat layar selebar `width * 0.84`.
 */
export const PhoneMockup: React.FC<{
  x: number; // pusat
  y: number; // pusat
  width: number;
  children?: React.ReactNode;
}> = ({ x, y, width, children }) => {
  const h = width * 1.72;
  const bezelX = width * 0.08;
  const bezelTop = width * 0.19;
  const bezelBottom = width * 0.22;
  return (
    <div
      style={{
        position: "absolute",
        left: x - width / 2,
        top: y - h / 2,
        width,
        height: h,
        background: colors.white,
        borderRadius: width * 0.11,
        boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
      }}
    >
      {/* speaker */}
      <div
        style={{
          position: "absolute",
          top: width * 0.085,
          left: "50%",
          width: width * 0.27,
          height: width * 0.03,
          borderRadius: width * 0.015,
          background: "#3a3a3a",
          transform: "translateX(-50%)",
        }}
      />
      {/* layar */}
      <div
        style={{
          position: "absolute",
          top: bezelTop,
          bottom: bezelBottom,
          left: bezelX,
          right: bezelX,
          background: `linear-gradient(180deg, ${colors.phoneScreen}, #2a2a2a)`,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
      {/* tombol home */}
      <div
        style={{
          position: "absolute",
          bottom: width * 0.055,
          left: "50%",
          width: width * 0.115,
          height: width * 0.115,
          borderRadius: "50%",
          background: "#141414",
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
};
