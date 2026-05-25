import { test, expect, App } from "@/POM/fixtures/baseFixtures";
import { newItemPageData } from "@/POM/testData/newItemPageData";
import { buildHistoryTable } from "../testData/buildHistoryPage";

test.describe("US_09 | Build history", () => {
    let projectName: string;

    test.beforeEach(async ({ app }) => {
        projectName = newItemPageData.itemName;

        await app.homePage.clickNewItemLink();
        await app.newItemPage.createFreestyleProject(projectName);
        await app.configureFreestylePage.clickSaveButton();
    });

    test("RF_09.001.01 | Item displays on Build History page after building", async ({ app }) => {
        await app.statusFreestyleProjectPage.clickBuildNowLink();
        await app.buildHistoryPage.openBuildHistory(app);

        await expect(app.buildHistoryPage.newItemName()).toContainText(newItemPageData.itemName);
    });

    test("RF_09.001.03 | Verify Build History displays list of builds", async ({ app }) => {
        const expectedBuildNumbers = ["#3", "#2", "#1"];

        await app.statusFreestyleProjectPage.createBuilds(expectedBuildNumbers.length);

        await app.buildHistoryPage.openBuildHistory(app);

        await expect(app.buildHistoryPage.buildValues()).toHaveCount(expectedBuildNumbers.length);

        await expect(app.buildHistoryPage.buildValues()).toHaveText(expectedBuildNumbers);
    });

    test("RF_09.001.05 | Verify successful build entry displays success status icon", async ({ app }) => {
        await app.statusFreestyleProjectPage.clickBuildNowLink();
        await app.statusFreestyleProjectPage.buildNumber("#1").waitFor();

        await app.buildHistoryPage.openBuildHistory(app);

        await expect(app.buildHistoryPage.successfulBuildStatusIcon(projectName)).toBeVisible();
    });

    test("RF_09.001.06 | Verify build number links to Build Summary page", async ({ app }) => {
        await app.statusFreestyleProjectPage.createBuilds(1);

        await app.buildHistoryPage.openBuildHistory(app);

        await expect(app.buildHistoryPage.firstBuildNumberLink()).toBeVisible();

        const buildNumber = await app.buildHistoryPage.getFirstBuildNumber();
        const buildId = buildNumber?.replace("#", "");

        await expect(app.buildHistoryPage.firstBuildNumberLink()).toHaveAttribute("href", new RegExp(`${buildId}/?$`));
    });

    test("RF_09.002.02 | Verify sorting toggle changes build order", async ({ app }) => {
        await app.statusFreestyleProjectPage.createBuilds(4);

        await app.buildHistoryPage.openBuildHistory(app);

        await expect(app.buildHistoryPage.buildValues().first()).toBeVisible();

        const initialOrder = await app.buildHistoryPage.getBuildValues();

        await app.buildHistoryPage.clickSortableBuildHeader();

        await expect(app.buildHistoryPage.buildValues().first()).toBeVisible();

        const firstSortOrder = await app.buildHistoryPage.getBuildValues();

        await app.buildHistoryPage.clickSortableBuildHeader();

        await expect(app.buildHistoryPage.buildValues().first()).toBeVisible();

        const secondSortOrder = await app.buildHistoryPage.getBuildValues();

        expect(firstSortOrder).not.toEqual(initialOrder);
        expect(secondSortOrder).toEqual(initialOrder);
    });
});

test.describe("US_09.004 | Build history> Handling an Empty Build History ", () => {
    test("RF_09.004_001 | Verify empty Build History page", async ({
        app,
    }: {
        app: App;
    }) => {

        await app.homePage.clickBuildHistoryLink();
        
        await expect(app.buildHistoryPage.sortableBuildTable()).toBeVisible();
    
        await expect(app.buildHistoryPage.sortableBuildTableHeader()).toContainText([
        buildHistoryTable.columnHeaders.s,
        buildHistoryTable.columnHeaders.build,
        buildHistoryTable.columnHeaders.timeSince,
        buildHistoryTable.columnHeaders.status,
        ]);

        await expect(app.buildHistoryPage.sortableBuildTableRow()).not.toBeVisible();

    });
});