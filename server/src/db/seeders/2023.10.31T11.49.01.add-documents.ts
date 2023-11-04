import { Seeder } from "../../config/db.config";
import PermissionEnum from "../../types/enums/permission-enum";
import StatusEnum from "../../types/enums/status-enum";

const seedDocuments = [
  {
    id: 1,
    title: "Test Document 1",
    user_id: 1,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.DRAFT
  },
  {
    id: 2,
    title: "Test Document 2",
    user_id: 2,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"Some more content"}]},{"type":"table","attrs":{"dir":null,"ignoreBidiAutoUpdate":null,"isControllersInjected":true,"insertButtonAttrs":null},"content":[{"type":"tableRow","content":[{"type":"tableControllerCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null}},{"type":"tableControllerCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null}},{"type":"tableControllerCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null}},{"type":"tableControllerCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null}}]},{"type":"tableRow","content":[{"type":"tableControllerCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null}},{"type":"tableHeaderCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null},"content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"Sample"}]}]},{"type":"tableHeaderCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null},"content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"Stuff"}]}]},{"type":"tableHeaderCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null},"content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"Here"}]}]}]},{"type":"tableRow","content":[{"type":"tableControllerCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null}},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null},"content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null}}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null},"content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null}}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null},"content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null}}]}]},{"type":"tableRow","content":[{"type":"tableControllerCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null}},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null},"content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null}}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null},"content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null}}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null},"content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null}}]}]}]},{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null}}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.REVIEW
  }
];

const seedDocumentUsers = [
  { permission: PermissionEnum.EDIT, user_id: 1, document_id: 2, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 2, document_id: 1, created_at: new Date(), updated_at: new Date() }
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert("document", seedDocuments);
  await sequelize.getQueryInterface().bulkInsert("document_user", seedDocumentUsers);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("document", { id: seedDocuments.map((u) => u.id) });
  await sequelize.getQueryInterface().bulkDelete("document_user", {
    document_id: seedDocumentUsers.map((d) => d.document_id),
    user_id: seedDocumentUsers.map((u) => u.user_id)
  });
};
