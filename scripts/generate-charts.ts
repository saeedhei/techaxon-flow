import { spawn } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import path from "node:path";

import { chromium } from "playwright";

import { charts } from "../app/charts-registry";

const PORT = 3100;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const outputDir = path.resolve(
  "public/charts",
);

function startServer() {
  return spawn(
    "pnpm",
    [
      "exec",
      "next",
      "start",
      "-p",
      String(PORT),
    ],
    {
      stdio: "inherit",
      shell: true,
    },
  );
}

async function waitForServer() {
  const timeout = 60_000;
  const interval = 500;
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeout) {
    try {
      const response = await fetch(BASE_URL);

      if (response.ok) {
        return;
      }
    } catch {
      // Server is not ready yet.
    }

    await new Promise((resolve) => {
      setTimeout(resolve, interval);
    });
  }

  throw new Error(
    "Next.js production server did not start.",
  );
}

async function main() {
  console.log(
    "Generating chart PNG files...",
  );

  await rm(outputDir, {
    recursive: true,
    force: true,
  });

  await mkdir(outputDir, {
    recursive: true,
  });

  const server = startServer();

  try {
    await waitForServer();

    const browser = await chromium.launch();

    try {
      const page = await browser.newPage({
        viewport: {
          width: 1600,
          height: 1000,
        },
        deviceScaleFactor: 2,
      });

      for (const chart of charts) {
        const url = `${BASE_URL}/charts/${chart.id}`;

        console.log(
          `Generating ${chart.id}.png...`,
        );

        await page.goto(url, {
          waitUntil: "networkidle",
        });

        const chartElement = page.locator(
          "[data-chart-export]",
        );

        await chartElement.waitFor({
          state: "visible",
          timeout: 30_000,
        });

        await chartElement.screenshot({
          path: path.join(
            outputDir,
            `${chart.id}.png`,
          ),
          animations: "disabled",
        });

        console.log(
          `✓ public/charts/${chart.id}.png`,
        );
      }
    } finally {
      await browser.close();
    }
  } finally {
    server.kill();
  }

  console.log(
    "All charts generated successfully.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});