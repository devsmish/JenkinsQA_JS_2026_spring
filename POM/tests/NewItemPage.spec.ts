import { test, expect, App } from "@/POM/fixtures/baseFixtures";
import { newItemPageData } from "@/POM/testData/newItemPageData";

test.describe("US_01.001 | New Item > Create a new item", () => {
    test("RF_01.001.21 | Verify new item page opens from dashboard", async ({ app }: { app: App }) => {
        await app.homePage.clickNewItemLink();

        await expect(app.newItemPage.newItemTitle()).toContainText("New Item");
    });

    test("RF_01.001.22 | Verify blank item name validation", async ({ app }: { app: App }) => {
        await app.homePage.clickNewItemLink();

        await expect(app.newItemPage.itemNameValidationMessage()).toContainText("This field cannot be empty");
    });

    test("RF_01.001.25 | Verify warning for duplicate item name", async ({ app }: { app: App }) => {
        const itemName = newItemPageData.duplicateItemName;

        await app.homePage.clickNewItemLink();

        await app.newItemPage.createFreestyleProject(itemName);

        await app.configureFreestylePage.header.clickHome();

        await app.homePage.clickNewItemLink();

        await app.newItemPage.fillItemNameField(itemName);

        await app.newItemPage.clickFreestyleProject();

        await expect(app.newItemPage.duplicateItemNameWarning()).toContainText(itemName);
    });

    for (const itemType of Object.values(newItemPageData.itemTypes)) {
        test(`RF_01.005.05 | OK button requires valid name and item type for ${itemType}`, async ({ app }) => {
            await app.homePage.clickNewItemLink();

            await expect(app.newItemPage.okButton()).toBeDisabled();

            await app.newItemPage.fillItemNameField(newItemPageData.itemName);

            await expect(app.newItemPage.okButton()).toBeDisabled();

            await app.newItemPage.clickItemType(itemType);

            await expect(app.newItemPage.okButton()).toBeEnabled();
        });
    }
});

test.describe("US_01.004 | New Item > Select an Item type", () => {
    test("TC_01.004.16 | New Item > Select an Item type > Verify validation message for invalid input", async ({
        app,
    }: {
        app: App;
    }) => {
        await app.homePage.clickNewItemLink();
        await app.newItemPage.fillItemNameField(newItemPageData.invalidItemName);
        await app.newItemPage.clickPipeline();
        await expect(app.newItemPage.errorMessage()).toBeVisible();
    });

    test.describe("US_01.004 | New Item | Select an Item type", () => {
        test("RF_01.004.01 | Verify all required item types are available >", async ({ app }: { app: App }) => {
            await app.homePage.clickNewItemLink();

            await expect(app.newItemPage.itemTypesOptions()).toHaveCount(6);
            await expect(app.newItemPage.itemTypesOptions()).toHaveText(Object.values(newItemPageData.itemTypes));
        });
    });
});
