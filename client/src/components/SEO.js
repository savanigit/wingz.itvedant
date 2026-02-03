import { Helmet } from 'react-helmet';

const SEO = ({ 
  title = 'My NGO - Empowering Communities, Changing Lives', 
  description = 'Creating a lasting impact in the lives of underprivileged children and communities through education, healthcare, and livelihood programs.',
  keywords = 'NGO, charity, donation, volunteer, social welfare, education, healthcare, community development',
  ogImage = '/logo192.png',
  ogUrl = window.location.href
}) => {
  const fullTitle = title.includes('My NGO') ? title : `${title} | My NGO`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="My NGO" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="My NGO" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={ogUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1a237e" />
      <link rel="canonical" href={ogUrl} />
    </Helmet>
  );
};

export default SEO;
