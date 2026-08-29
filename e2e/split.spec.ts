import { expect, test } from "@playwright/test";

test("Ana skips the wine and owes 93.50 lei", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "FairShare" })).toBeVisible();
  await expect(page.getByTestId("author-credit")).toContainText("Alessandro Alghisi");
  await expect(page.getByTestId("owe-ana")).toContainText("93.50 lei");
  await expect(page.getByTestId("eat-wine-ana")).not.toBeChecked();
});
