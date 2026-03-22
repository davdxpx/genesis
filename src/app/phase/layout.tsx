import { GlobalLayout } from "@/components/layout/GlobalLayout";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <GlobalLayout>{children}</GlobalLayout>;
}