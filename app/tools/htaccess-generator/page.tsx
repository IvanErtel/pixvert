import type { Metadata } from 'next';
import HtaccessGeneratorTool from './HtaccessGeneratorTool';
import ToolSEOContent, { type ToolSEOData } from '@/components/ToolSEOContent';
import SchemaMarkup from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: '.htaccess Generator Online Free — Apache Config | Pixvert',
  description:
    'Generate an Apache .htaccess file with HTTPS redirect, Gzip, browser caching, security headers, custom error pages and 301/302 redirects. Free.',
  openGraph: { title: '.htaccess Generator — Pixvert', type: 'website' },
  alternates: {
    canonical: '/tools/htaccess-generator',
  },
};

const seo: ToolSEOData = {
  toolName: '.htaccess Generator',
  whatIsHeading: 'What is a .htaccess generator?',
  whatIsParagraphs: [
    'A .htaccess file is a configuration file used by the Apache web server to control behavior on a per-directory basis — redirects, caching rules, security headers, and more — without needing to edit the main server configuration. Pixvert\'s .htaccess generator builds this file for you visually, based on the options you select.',
    'Writing .htaccess rules by hand requires knowing Apache\'s specific directive syntax for mod_rewrite, mod_headers, and mod_deflate, and a small typo can break your entire site or silently fail to apply. This generator produces syntactically correct rules for common needs: forcing HTTPS, enabling Gzip compression, setting browser caching headers, adding security headers, custom error pages, and 301/302 redirects.',
    'This is particularly useful for developers and site owners managing Apache-hosted sites (a large share of shared hosting providers run Apache) who need standard optimizations and security hardening without deep Apache configuration expertise.',
  ],
  howToHeading: 'How to generate a .htaccess file',
  howToSteps: [
    { title: 'Select the rules you need', description: 'toggle HTTPS redirect, Gzip compression, browser caching, security headers, custom error pages, or specific redirects' },
    { title: 'Configure the details', description: 'set redirect URLs, cache durations, or error page paths as needed' },
    { title: 'Review the generated file', description: 'the .htaccess content updates live as you adjust settings' },
    { title: 'Copy or download', description: 'copy the text or download the .htaccess file directly' },
    { title: 'Upload to your server', description: 'place the file in your site\'s root directory (or the relevant subdirectory) via FTP or your hosting file manager' },
  ],
  useCasesHeading: 'When to use a .htaccess generator',
  useCases: [
    { title: 'Forcing HTTPS', description: 'Redirect all HTTP traffic to HTTPS to ensure encrypted connections and avoid mixed-content warnings.' },
    { title: 'Improving page speed', description: 'Enable Gzip compression and browser caching headers to reduce load times for returning visitors.' },
    { title: 'Hardening security', description: 'Add security headers like X-Frame-Options or X-Content-Type-Options to reduce common attack surfaces.' },
    { title: 'Managing URL changes', description: 'Set up 301 redirects when moving or renaming pages, preserving SEO value from the old URL.' },
    { title: 'Custom error pages', description: 'Serve a branded 404 or 500 error page instead of Apache\'s default.' },
  ],
  whyHeading: 'Why use Pixvert\'s .htaccess generator?',
  whyReasons: [
    { title: 'Correct Apache syntax', description: 'avoids typos in mod_rewrite, mod_headers, and mod_deflate directives' },
    { title: 'Covers common needs', description: 'HTTPS redirect, caching, compression, security headers, and redirects in one tool' },
    { title: '100% local and private', description: 'your configuration choices are processed entirely in your browser' },
    { title: 'Free, instant, no signup', description: 'generate as many configurations as you need' },
  ],
  faqs: [
    { question: 'Where do I put the generated .htaccess file?', answer: 'Upload it to the root directory of your website via FTP or your hosting control panel\'s file manager. Rules apply to that directory and all subdirectories unless overridden.' },
    { question: 'Will this work on any web server?', answer: 'No, .htaccess is specific to the Apache web server (and Apache-compatible setups like LiteSpeed). Nginx and other servers use a different configuration syntax entirely.' },
    { question: 'Is my configuration data sent to a server?', answer: 'No, the file is generated entirely in your browser based on the options you select. Nothing is transmitted or stored.' },
    { question: 'Can uploading a bad .htaccess file break my site?', answer: 'Yes, a syntax error in .htaccess can cause a server error on your entire site. Always keep a backup of your current file before replacing it, and test after uploading.' },
    { question: 'Do I need special server permissions to use .htaccess?', answer: 'Your hosting provider needs to allow .htaccess overrides (AllowOverride) for the directives to take effect — this is enabled by default on most shared hosting.' },
    { question: 'Can I combine multiple rules in one file?', answer: 'Yes, select as many options as you need — the generator combines them into a single, correctly ordered .htaccess file.' },
  ],
  relatedTools: [
    { href: '/tools/robots-txt', label: 'Robots.txt Generator', description: 'Generate a robots.txt file to control search engine crawling' },
    { href: '/tools/meta-tags', label: 'Meta Tags Generator', description: 'Generate SEO and social meta tags for your pages' },
    { href: '/tools/html-formatter', label: 'HTML Formatter', description: 'Pretty-print and clean up HTML markup' },
    { href: '/tools/css-minifier', label: 'CSS Minifier', description: 'Minify CSS for production' },
  ],
};

export default function HtaccessGeneratorPage() {
  return (
    <>
      <HtaccessGeneratorTool />
      <ToolSEOContent {...seo} />
      <SchemaMarkup
        name={seo.toolName}
        url="https://pixvert-one.vercel.app/tools/htaccess-generator"
        description={metadata.description as string}
        features={['HTTPS redirect', 'Gzip compression', 'Browser caching', 'Security headers', '301/302 redirects']}
        howToName={seo.howToHeading}
        howToSteps={seo.howToSteps}
        faqs={seo.faqs}
      />
    </>
  );
}
