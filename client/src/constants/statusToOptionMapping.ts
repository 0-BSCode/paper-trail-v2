import StatusEnum from '@src/types/enums/status-enum';

const statusToOptionMapping = {
  [StatusEnum.CHANGES_REQUESTED]: 'Changes Requested',
  [StatusEnum.DRAFT]: 'Draft',
  [StatusEnum.RAISED]: 'Raised',
  [StatusEnum.RESOLVED]: 'Resolved',
  [StatusEnum.REVIEW]: 'Review',
  [StatusEnum.REVIEW_REQUESTED]: 'Review Requested',
};

export default statusToOptionMapping;
