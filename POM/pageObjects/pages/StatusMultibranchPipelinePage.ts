import { BasePage } from "./@components";

export class StatusMultibranchPipelinePage extends BasePage {
    renameLink = () => this.page.getByRole("link", {name: "Rename"});
    projectName = () => this.page.locator("h1.page-headline");

    async clickRenameLink() {
        await this.renameLink().click();
    }    
}
