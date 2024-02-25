import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const AuthGuard = ({ children }: Props) => {
  return children;
};

export default AuthGuard;
