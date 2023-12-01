import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { Tag } from 'antd';
import convertToTitleCase from '@src/utils/convertToTitleCase';
import getRoleTagColor from '@src/utils/getRoleTagColor';
import type RoleEnum from '@src/types/enums/role-enum';

interface Props extends CustomTagProps {
  value: string;
  closeable?: () => void;
  onClose: () => void;
}

const RoleTag = ({ value, closable, onClose }: Props): JSX.Element => {
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>): void => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={getRoleTagColor(value as RoleEnum)}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {convertToTitleCase(value)}
    </Tag>
  );
};

export default RoleTag;
