interface OutlinedButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

function OutlinedButton({ className, children, onClick }: OutlinedButtonProps): JSX.Element {
  const defaultStyles =
    'bg-white-100 h-fit px-[16px] py-[8px] rounded-[4px] hover:outline-blue-800 hover:font-medium text-black outline -outline-offset-2 outline-white-700';
  const styles = `${defaultStyles} ${className ?? ''}`;

  return (
    <button className={styles} onClick={onClick}>
      {children}
    </button>
  );
}

export default OutlinedButton;
