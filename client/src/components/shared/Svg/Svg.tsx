import axios from 'axios';
import { useEffect, useState } from 'react';

import { StyledSvgWrapper } from './style';

interface ISvgProps {
  url: string;
  noHeight?: boolean;
}

const Svg = ({ url, noHeight }: ISvgProps) => {
  const [svgContent, setSvgContent] = useState<string | undefined>();

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
