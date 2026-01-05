import { test, expect } from "@playwright/test";

test.describe("Luggage Carousel E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the main heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /luggage carousel/i })
    ).toBeVisible();
  });

  test("should display carousel container", async ({ page }) => {
    const carousel = page.locator(".border-gray-800.rounded-xl").first();
    await expect(carousel).toBeVisible();
  });

  test("should spawn luggage items on the carousel", async ({ page }) => {
    // Wait for luggage to spawn (up to 3 seconds based on spawn interval)
    await page.waitForTimeout(3500);

    const luggageItems = page.locator('[draggable="true"]');
    const count = await luggageItems.count();

    // Should have at least one luggage spawned
    expect(count).toBeGreaterThan(0);
  });

  test("should display 9 storage cells", async ({ page }) => {
    const cells = page.locator(".relative.w-32.h-32");
    await expect(cells).toHaveCount(9);
  });

  test("should display 3 priority cells", async ({ page }) => {
    const priorityCells = page.getByText("PRIORITY");
    await expect(priorityCells).toHaveCount(3);
  });

  test("should display unload button", async ({ page }) => {
    const unloadButton = page.getByRole("button", { name: /unload storage/i });
    await expect(unloadButton).toBeVisible();
  });

  test("should have disabled unload button when no luggage in storage", async ({
    page,
  }) => {
    const unloadButton = page.getByRole("button", { name: /unload storage/i });
    await expect(unloadButton).toBeDisabled();
  });

  test("drag and drop luggage to storage cell", async ({ page }) => {
    // Wait for luggage to spawn
    await page.waitForTimeout(3500);

    const luggageItem = page.locator('[draggable="true"]').first();
    const storageCell = page.locator(".relative.w-32.h-32").first();

    if ((await luggageItem.count()) > 0) {
      // Perform drag and drop
      await luggageItem.dragTo(storageCell);

      // Check if luggage appears in the storage cell
      const luggageInCell = storageCell.locator(".bg-blue-600");
      await expect(luggageInCell).toBeVisible();
    }
  });

  test("unload button should be enabled when luggage is in storage", async ({
    page,
  }) => {
    // Wait for luggage to spawn
    await page.waitForTimeout(3500);

    const luggageItem = page.locator('[draggable="true"]').first();
    const storageCell = page.locator(".relative.w-32.h-32").first();

    if ((await luggageItem.count()) > 0) {
      // Drag luggage to storage
      await luggageItem.dragTo(storageCell);

      // Unload button should now be enabled
      const unloadButton = page.getByRole("button", {
        name: /unload storage/i,
      });
      await expect(unloadButton).toBeEnabled();
    }
  });

  test("should unload luggage using LIFO from priority cells first", async ({
    page,
  }) => {
    // Wait for multiple luggage to spawn
    await page.waitForTimeout(5000);

    const luggageItems = page.locator('[draggable="true"]');
    const count = await luggageItems.count();

    if (count >= 2) {
      // Drag first luggage to priority cell (cell 0)
      const firstLuggage = luggageItems.nth(0);
      const priorityCell = page.locator(".relative.w-32.h-32").nth(0);
      await firstLuggage.dragTo(priorityCell);

      // Wait for another luggage
      await page.waitForTimeout(2000);

      // Drag second luggage to another priority cell (cell 1)
      const secondLuggage = page.locator('[draggable="true"]').nth(0);
      const secondPriorityCell = page.locator(".relative.w-32.h-32").nth(1);
      await secondLuggage.dragTo(secondPriorityCell);

      // Click unload button
      const unloadButton = page.getByRole("button", {
        name: /unload storage/i,
      });
      await unloadButton.click();

      // Second cell (last filled priority cell) should be empty first (LIFO)
      const luggageInSecondCell = secondPriorityCell.locator(".bg-blue-600");
      await expect(luggageInSecondCell).not.toBeVisible();
    }
  });

  test("luggage should move across the carousel", async ({ page }) => {
    // Wait for luggage to spawn
    await page.waitForTimeout(3500);

    const luggageItem = page.locator('[draggable="true"]').first();

    if ((await luggageItem.count()) > 0) {
      const initialPosition = await luggageItem.boundingBox();

      // Wait for animation
      await page.waitForTimeout(1000);

      const newPosition = await luggageItem.boundingBox();

      // X position should have changed
      expect(newPosition?.x).not.toBe(initialPosition?.x);
    }
  });

  test("should be responsive and render on mobile viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const heading = page.getByRole("heading", { name: /luggage carousel/i });
    await expect(heading).toBeVisible();

    const cells = page.locator(".relative.w-32.h-32");
    await expect(cells).toHaveCount(9);
  });
});
