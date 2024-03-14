import { CustomizableLink } from '../types/link';

const mapPlatformUniqueness = (links: Array<CustomizableLink>) =>
  links.reduce((accumulator: Record<string, boolean>, link) => {
    if (Object.keys(accumulator).includes(link.platform)) {
      accumulator[link.platform] = false;
    } else {
      accumulator[link.platform] = true;
    }

    return accumulator;
  }, {});

export default mapPlatformUniqueness;
