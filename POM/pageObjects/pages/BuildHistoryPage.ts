import { BasePage } from "./@components";
import { App } from "@/POM/fixtures/baseFixtures";

export class BuildHistoryPage extends BasePage {
    successfulBuildEntry = (projectName: string) => this.page.locator("tr", { hasText: projectName });
    newItemName = () => this.page.locator("#projectStatus .jenkins-table__link span");
    successfulBuildStatusIcon = (projectName: string) => this.successfulBuildEntry(projectName).locator("svg#blue");
    buildValues = () => this.page.getByText(/^#\d+$/);
    sortableBuildHeader = () => this.page.locator("th[initialsortdir='up'] a.sortheader");
    firstBuildNumberLink = () => this.buildValues().first();

    async clickSortableBuildHeader() {
        await this.sortableBuildHeader().click();
        return this;
    }

    async getBuildValues() {
        return this.buildValues().allTextContents();
    }

    async getFirstBuildNumber() {
        return this.firstBuildNumberLink().textContent();
    }

    async openBuildHistory(app: App) {
        await app.header.clickHome();
        await app.homePage.clickBuildHistoryLink();
    }
}
