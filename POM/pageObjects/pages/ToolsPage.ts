import { BasePage } from "./@components";
import { expect } from "@/POM/fixtures/baseFixtures";

export class ToolsPage extends BasePage {

    sectionLocator = (sectionName: string) => this.page.locator(".jenkins-section__title").filter({ hasText: sectionName });
    mavenSettingsSelect = () => this.page.locator('div.jenkins-form-item').filter({ hasText: 'Default settings provider' }).locator('select');
    mavenFilePathInput = () => this.page.locator('div.jenkins-form-item').filter({ hasText: 'File path' }).locator('input').first();
    globalMavenSettingsSelect = () => this.page.locator('div.jenkins-form-item').filter({ hasText: 'Default global settings provider' }).locator('select');
    globalMavenFilePathInput = () => this.page.locator('div.jenkins-form-item').filter({ hasText: 'File path' }).locator('input').last();
    addJdkButton = () => this.page.getByRole('button', { name: 'Add JDK' }).first();
    jdkInstallationsButton = () => this.page.getByRole('button', { name: 'JDK installations' });
    saveButton = () => this.page.locator("button[name='Submit']");
    newJdkChunk = () => this.page.locator('div.repeated-chunk').first();
    jdkNameInput = () => this.newJdkChunk().locator('input[name="_.name"]');
    newJdkNameInput = (name: string) => this.page.locator(`input[name="_.name"][value="${name}"]`);
    addGitButton = () => this.page.getByRole('button', { name: 'Add Git' }).first();
    gitDropdownItem = () => this.page.getByText('Git', { exact: true });
    gitNameInput = () => this.page.locator("//input[@checkurl='/manage/descriptorByName/hudson.plugins.git.GitTool/checkName']").first();
    newGitNameInput = (name: string) => this.page.locator(`//input[@checkurl='/manage/descriptorByName/hudson.plugins.git.GitTool/checkName'][@value="${name}"]`);
    
    async getCurrentUrl() {
        return this.page.url();
    }

    async selectSettingsFileInFilesystem() {
        await this.mavenSettingsSelect().selectOption("Settings file in filesystem");
        return this;
    }

    async selectGlobalSettingsFileInFilesystem() {
        await this.globalMavenSettingsSelect().selectOption("Global settings file on filesystem");
        return this;
    }

    async clickSave() {
        await this.saveButton().click();
    }

    async fillJdkName(name: string) {
        await this.jdkNameInput().fill(name);
    }

    async clickAddJdkWithFallback() {
        const addJdk = this.addJdkButton();
        await this.page.waitForLoadState('domcontentloaded');
        if (await addJdk.isVisible().catch(() => false)) {
            await addJdk.click();
        } else {
            await this.jdkInstallationsButton().click();
            await expect(addJdk).toBeVisible();
            await addJdk.click();
        }
        return this;
    }

    async clickJdkInstallationsButton() {
        await this.jdkInstallationsButton().click();
        return this;
    }

    async clickAddGit() {
        await this.addGitButton().click();
        return this;
    }

    async selectGitFromDropdown() {
        await this.gitDropdownItem().click();
        return this;
    }

    async fillGitName(name: string) {
        await this.gitNameInput().fill(name);
        return this;
    }
}
