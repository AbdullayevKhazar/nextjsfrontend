import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Public Customer",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {children}
    </div>
  );
}
