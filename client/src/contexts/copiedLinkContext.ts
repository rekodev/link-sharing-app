import { Dispatch, SetStateAction, createContext } from 'react';

type CopiedLinkContextType = {
  copiedLink: boolean;
  setCopiedLink: Dispatch<SetStateAction<boolean>>;
};

export const CopiedLinkContext = createContext<CopiedLinkContextType>({
  copiedLink: false,
  setCopiedLink: () => {},
});
