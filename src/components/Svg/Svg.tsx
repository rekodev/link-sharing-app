import axios from 'axios';
import { useEffect, useState } from 'react';

interface ISvgProps {
  url: string;
}

const Svg = ({ url }: ISvgProps) => {
  const [svgContent, setSvgContent] = useState<string | undefined>();

  useEffect(() => {
    const getSvgContent = async () => {
      const fetchedSvgContent = await axios.get(url);

      setSvgContent(fetchedSvgContent.data);
    };

    getSvgContent();
  }, [url]);

  return <div dangerouslySetInnerHTML={{ __html: svgContent || '' }} />;
};

export default Svg;
