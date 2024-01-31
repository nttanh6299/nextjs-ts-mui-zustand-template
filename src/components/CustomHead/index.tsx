import Head from 'next/head';
import { PropsWithChildren } from 'react';

interface CustomHeadProps {
  title?: string;
  description?: string;
  image?: string;
}

const CustomHead = (props: PropsWithChildren<CustomHeadProps>) => {
  const { title, description, image, children } = props;

  return (
    <Head>
      {/* Title */}

      {title && (
        <>
          <title key="title">{title}</title>
          <meta name="title" content={title} />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
          <meta property="og:title" content={title} />
          <meta itemProp="name" content={title} key="gg:title" />
          <meta name="twitter:title" content={title} key="twitter:title" />
        </>
      )}

      {/* Description */}
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="description" content={description} key="description" />
          <meta itemProp="description" content={description} key="gg:description" />
          <meta property="og:description" content={description} key="og:description" />
          <meta name="twitter:description" content={description} key="twitter:description" />
        </>
      )}

      {/* Keywords */}
      <meta name="keywords" content="keywords" />

      {/* Image */}
      {image && (
        <>
          <meta name="iconUrl" content={image} key="gg:image" />
          <meta property="og:image" itemProp="image" content={image} key="og:image" />
          <meta name="twitter:image" content={image} key="twitter:image" />
        </>
      )}

      {/* Others */}
      <meta property="og:url" content="http://localhost:3000" />
      <meta property="og:type" content="website" key="og:type" />
      <meta property="twitter:domain" content="localhost:3000" />
      <meta property="twitter:url" content="http://localhost:3000" />
      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="theme-color" content="#ffffff" />

      {children}
    </Head>
  );
};

export default CustomHead;
