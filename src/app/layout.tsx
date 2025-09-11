import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Skill Hub",
  description: "애니메이션과 인터랙션을 통해 시각적으로 표현하는 웹사이트입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
