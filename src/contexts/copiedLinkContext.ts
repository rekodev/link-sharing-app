import { createContext } from 'react';

interface ICopiedLinkContext {
  copiedLink: boolean;
  setCopiedLink: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CopiedLinkContext = createContext<ICopiedLinkContext>({
  copiedLink: false,
  setCopiedLink: () => {},
});
