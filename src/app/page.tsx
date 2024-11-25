import Link from "next/link";
import fs from "fs";
import path from "path";

// Helper function to get experiments
function getExperiments() {
  const experimentsDirectory = path.join(process.cwd(), "src/app/experiments");

  try {
    const directories = fs.readdirSync(experimentsDirectory);
    return directories
      .filter((dir) => {
        const fullPath = path.join(experimentsDirectory, dir);
        return fs.statSync(fullPath).isDirectory();
      })
      .map((dir) => {
        try {
          const metadataPath = path.join(
            experimentsDirectory,
            dir,
            "metadata.json"
          );
          const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
          return {
            slug: dir,
            title: metadata.title,
            date: metadata.date,
          };
        } catch (error) {
          console.error(`Error reading metadata for ${dir}:`, error);
          return {
            slug: dir,
            title: dir.replace(/-/g, " "),
            date: "",
          };
        }
      });
  } catch (error) {
    console.error("Error reading experiments directory:", error);
    return [];
  }
}

export default function Home() {
  const experiments = getExperiments();

  return (
    <div className="font-sans  flex flex-col gap-16">
      <header className="flex flex-row gap-4 justify-between align-middle p-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Experiments I made in my free time.
        </h1>
        <a
          href="https://rafalziolek.work"
          className="text-4xl font-bold hover:underline hidden lg:block"
          target="_blank"
        >
          rafalziolek.work
        </a>
      </header>
      <ul>
        {experiments.map((experiment) => (
          <li
            key={experiment.slug}
            className="flex flex-row justify-between py-2 even:bg-gray-50 dark:even:bg-stone-900 dark:even:bg-opacity-60 px-4"
          >
            <Link
              href={`/experiments/${experiment.slug}`}
              className="text-xl font-semibold tracking-tight hover:underline"
            >
              {experiment.title}
            </Link>
            <span className="font-mono font-semibold tracking-tight hidden sm:block">
              {experiment.date}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
