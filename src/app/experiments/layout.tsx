import Link from "next/link";

export default function ExperimentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="flex flex-col gap-4 px-4 py-4 fixed text-white mix-blend-exclusion z-10">
        <Link className="text-xl font-sans font-bold" href="/">
          ← Experiments
        </Link>
      </header>
      {children}
    </>
  );
}
