import { test, expect } from "@/POM/fixtures/newItemPageFixtures";
import { newItemPageData } from "../testData/newItemPageData";
import { confirmRenameMultibranchPipelinePageData } from "../testData/confirmRenameMultibranchPipelinePageData";


test.describe("Status Multibranch Pipeline tests", async () => {

    test("RF_06.002.01 | Renaming project from the side menu", async ({ app, createJob }) => {
        await createJob(newItemPageData.itemName, newItemPageData.itemTypes.multibranchPipeline, false);

        await app.configureMultibranchPipelinePage.clickSaveButton();
        await app.statusMultibranchPipelinePage.clickRenameLink();

        await app.confirmRenameMultibranchPipelinePage.clearNewNameField();
        await app.confirmRenameMultibranchPipelinePage
            .fillNewNameField(confirmRenameMultibranchPipelinePageData.newProjectName);
        await app.confirmRenameMultibranchPipelinePage.clickRenameButton();
        
        const updatedProjectName = app.statusMultibranchPipelinePage.projectName();        
        await expect(updatedProjectName).toHaveText(confirmRenameMultibranchPipelinePageData.newProjectName);
    });
});
