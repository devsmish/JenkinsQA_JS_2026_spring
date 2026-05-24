import { BasePage } from "./@components";

export class ConfirmRenameMultibranchPipelinePage extends BasePage {
    newNameField = () => this.page.locator("[name='newName']");
    renameButton = () => this.page.getByRole("button", {name: "Rename"});

    async clearNewNameField() {
        await this.newNameField().clear();
        return this;
    }

    async fillNewNameField(name : string) {
        await this.newNameField().fill(name);
        return this;
    }

    async clickRenameButton() {
        await this.renameButton().click();
    }
}
