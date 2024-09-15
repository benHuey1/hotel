import { CircularProgress, Spinner } from '@nextui-org/react';

export default function Loading() {
  return (
    <div className="">
      {/* <CircularProgress color="primary" label="Loading..." /> */}
      <Spinner color="primary" label="Loading..." />
    </div>
  );
}
