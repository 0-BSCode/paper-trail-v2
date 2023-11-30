import { Seeder } from "../../config/db.config";
3;
import PermissionEnum from "../../types/enums/permission-enum";
import StatusEnum from "../../types/enums/status-enum";

const seedDocuments = [
  {
    id: 4,
    title: "Ineffective Teaching Method",
    user_id: 1,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.RAISED,
    assignee_id: 2
  },
  {
    id: 5,
    title: "Lack of Feedback from Professor",
    user_id: 1,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"Some more content"}]},{"type":"table","attrs":{"dir":null,"ignoreBidiAutoUpdate":null,"isControllersInjected":true,"insertButtonAttrs":null},"content":[{"type":"tableRow","content":[{"type":"tableControllerCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null}},{"type":"tableControllerCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null}},{"type":"tableControllerCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null}},{"type":"tableControllerCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null}}]},{"type":"tableRow","content":[{"type":"tableControllerCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null}},{"type":"tableHeaderCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null},"content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"Sample"}]}]},{"type":"tableHeaderCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null},"content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"Stuff"}]}]},{"type":"tableHeaderCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null},"content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"Here"}]}]}]},{"type":"tableRow","content":[{"type":"tableControllerCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null}},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null},"content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null}}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null},"content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null}}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null},"content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null}}]}]},{"type":"tableRow","content":[{"type":"tableControllerCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null}},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null},"content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null}}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null},"content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null}}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null,"background":null},"content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null}}]}]}]},{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null}}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.REVIEW,
    assignee_id: 3
  },
  {
    id: 6,
    title: "Midterm Examination Topics not Part of Syllabus",
    user_id: 1,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.CHANGES_REQUESTED,
    assignee_id: 4
  },
  {
    id: 7,
    title: "Unresponsive Administration",
    user_id: 1,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.RESOLVED,
    assignee_id: 2
  },
  {
    id: 8,
    title: "Vandalism on School Property",
    user_id: 1,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.REVIEW_REQUESTED,
    assignee_id: 4
  },
  {
    id: 9,
    title: "Overly Strict Attendance Policies",
    user_id: 1,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.DRAFT
  },
  {
    id: 10,
    title: "Bullying and Harassment",
    user_id: 3,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.REVIEW_REQUESTED,
    assignee_id: 4
  },
  {
    id: 11,
    title: "Outdated Learning Materials",
    user_id: 2,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.RESOLVED,
    assignee_id: 3
  },
  {
    id: 12,
    title: "Inadequate Time to Perform Project",
    user_id: 2,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.CHANGES_REQUESTED,
    assignee_id: 1
  },
  {
    id: 13,
    title: "Unreasonable Project Deadline",
    user_id: 3,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.DRAFT
  },
  {
    id: 14,
    title: "Neglect of Special Education Needs",
    user_id: 3,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.RESOLVED,
    assignee_id: 1
  },
  {
    id: 15,
    title: "Inadequate Security",
    user_id: 3,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.RAISED,
    assignee_id: 4
  },
  {
    id: 16,
    title: "Uninspiring Course Content",
    user_id: 2,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.DRAFT
  },
  {
    id: 17,
    title: "Limited Language Support",
    user_id: 2,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.REVIEW,
    assignee_id: 1
  },
  {
    id: 18,
    title: "NodeJs Installation on School Laboratories",
    user_id: 2,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.CHANGES_REQUESTED,
    assignee_id: 4
  },
  {
    id: 19,
    title: "Laboratory Inavailability",
    user_id: 4,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.CHANGES_REQUESTED,
    assignee_id: 1
  },
  {
    id: 20,
    title: "Shortage of Professors",
    user_id: 4,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.DRAFT
  },
  {
    id: 21,
    title: "Unpredictable Schedule Changes",
    user_id: 4,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.DRAFT
  },
  {
    id: 22,
    title: "Unaddressed Student Concerns",
    user_id: 4,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.RESOLVED,
    assignee_id: 2
  },
  {
    id: 23,
    title: "Groupwork Challenges",
    user_id: 4,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.DRAFT
  },
  {
    id: 24,
    title: "Lack of Diversity in Curriculum",
    user_id: 4,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.REVIEW,
    assignee_id: 3
  },
  {
    id: 25,
    title: "Insufficient Class Hours",
    user_id: 3,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.RAISED,
    assignee_id: 2
  },
  {
    id: 26,
    title: "Consistent Absence From Professor",
    user_id: 3,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.REVIEW_REQUESTED,
    assignee_id: 1
  },
  {
    id: 27,
    title: "Last Minute Asynchronous Class Announcements",
    user_id: 3,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.REVIEW,
    assignee_id: 4
  },
  {
    id: 28,
    title: "Professor Overextending Class Hours",
    user_id: 4,
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"dir":null,"ignoreBidiAutoUpdate":null},"content":[{"type":"text","text":"This is some sample "},{"type":"text","marks":[{"type":"bold"}],"text":"content"},{"type":"text","text":"!"}]}]}',
    created_at: new Date(),
    updated_at: new Date(),
    status: StatusEnum.RESOLVED,
    assignee_id: 2
  }
];

const seedDocumentUsers = [
  { permission: PermissionEnum.EDIT, user_id: 2, document_id: 4, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 3, document_id: 4, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 4, document_id: 5, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 2, document_id: 6, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.EDIT, user_id: 3, document_id: 7, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.EDIT, user_id: 4, document_id: 7, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.EDIT, user_id: 3, document_id: 8, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 2, document_id: 8, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.EDIT, user_id: 3, document_id: 9, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 4, document_id: 9, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 1, document_id: 10, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 2, document_id: 10, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.EDIT, user_id: 4, document_id: 11, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 1, document_id: 13, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.EDIT, user_id: 2, document_id: 13, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 4, document_id: 14, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.EDIT, user_id: 1, document_id: 14, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.EDIT, user_id: 2, document_id: 14, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 2, document_id: 15, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 1, document_id: 15, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.EDIT, user_id: 1, document_id: 16, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.EDIT, user_id: 3, document_id: 18, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 1, document_id: 18, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 3, document_id: 19, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.EDIT, user_id: 2, document_id: 19, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 2, document_id: 21, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.EDIT, user_id: 1, document_id: 23, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 2, document_id: 23, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 3, document_id: 23, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.EDIT, user_id: 2, document_id: 24, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.EDIT, user_id: 3, document_id: 24, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.EDIT, user_id: 1, document_id: 24, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 2, document_id: 25, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 1, document_id: 25, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 4, document_id: 25, created_at: new Date(), updated_at: new Date() }
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
