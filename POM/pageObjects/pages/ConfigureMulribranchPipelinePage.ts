import { BasePage } from "./@components";

export class ConfigureMultibranchPipelinePage extends BasePage {
    saveButton = () => this.page.getByRole("button", {name: "Save"});

    async clickSaveButton() {
        await this.saveButton().click();
    }
}
