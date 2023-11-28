import RoleEnum from '@src/types/enums/role-enum';

function getRoleTagColor(role: RoleEnum): string {
  return role === RoleEnum.CISCO_ADMIN ? 'error' : role === RoleEnum.CISCO_MEMBER ? 'processing' : 'success';
}

export default getRoleTagColor;
