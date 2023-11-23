import StatusEnum from '@src/types/enums/status-enum';

function getStatusColor(status: StatusEnum): string {
  switch (status) {
    case StatusEnum.DRAFT:
      return 'bg-gray-400';
    case StatusEnum.REVIEW_REQUESTED:
      return 'bg-yellow-300';
    case StatusEnum.REVIEW:
      return 'bg-yellow-500';
    case StatusEnum.CHANGES_REQUESTED:
      return 'bg-orange-300';
    case StatusEnum.RAISED:
      return 'bg-orange-500';
    case StatusEnum.RESOLVED:
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
}

export default getStatusColor;
