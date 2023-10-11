interface ContainedButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

function ContainedButton({ className, children, onClick }: ContainedButtonProps): JSX.Element {
  const defaultStyles =
    'bg-blue-500 h-fit px-[16px] py-[8px] rounded-[4px] hover:bg-blue-700 focus:bg-blue-700 text-white';
  const styles = `${defaultStyles} ${className ?? ''}`;

  return (
    <button className={styles} onClick={onClick}>
      {children}
    </button>
  );
}

export default ContainedButton;
