type IStatus = {
  status: string;
};

const Status: React.FC<IStatus> = ({ status }): JSX.Element => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{status}</div>
  );
};

export default Status;
