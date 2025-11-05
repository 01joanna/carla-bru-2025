"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";
import { IBM_Plex_Mono } from "next/font/google";
import Header from "./components/Header";
import useAuth from "@/hooks/useAuth";

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-plex",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plex.variable} ${plex.className}`}>
      <body>
        <Provider store={store}>
          <AuthWrapper>
            <Header />
            {children}
          </AuthWrapper>
        </Provider>
      </body>
    </html>
  );
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  useAuth();
  return <>{children}</>;
}
