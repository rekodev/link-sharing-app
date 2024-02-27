import { createContext } from 'react';

import { IShareableLinkValues } from '../types/shareableLinkValues';

interface ILinkContext {
  links: IShareableLinkValues[];
  setLinks: React.Dispatch<React.SetStateAction<IShareableLinkValues[]>>;
}

export const LinkContext = createContext<ILinkContext>({
  links: [],
  setLinks: () => {},
});
