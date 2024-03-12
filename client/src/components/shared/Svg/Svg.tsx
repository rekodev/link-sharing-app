import axios from 'axios';
import { useEffect, useState } from 'react';

import { StyledSvgWrapper } from './style';

type Props = {
  url: string;
  noHeight?: boolean;
};

const Svg = ({ url, noHeight }: Props) => {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    const getSvgContent = async () => {
      const fetchedSvgContent = await axios.get(url);

      setSvgContent(fetchedSvgContent.data);
    };

    getSvgContent();
  }, [url]);

  return (
    <StyledSvgWrapper
      $noHeight={noHeight}
      dangerouslySetInnerHTML={{ __html: svgContent || '' }}
    />
  );
};

export default Svg;
