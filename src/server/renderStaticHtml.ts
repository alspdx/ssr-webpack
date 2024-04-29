export type AssetPaths = Record<'styles' | 'scripts', string[]>;

interface RenderParams {
  /**
   * optional pre-rendered content to be injected into the HTML
   */
  content?: string;
  /**
   * asset paths used to generate <link> and <script> tags
   */
  assets: Record<'styles' | 'scripts', string[]>;
}

export function renderStaticHtml({ assets, content }: RenderParams) {
  const STYLES = assets.styles
    .map((path) => `<link rel="stylesheet" href="${path}">`)
    .join('\n');

  const SCRIPTS = assets.scripts
    .map((path) => `<script src="${path}"></script>`)
    .join('\n');

  return `<!doctype html>
<html>
  <head>
    <title>React SSR Example</title>
    ${STYLES}
    <link
      rel="shortcut icon"
      type="image/png"
      href="${__PUBLIC_PATH_PREFIX__}favicon.ico?v=2"
    ></link>
    <link
      rel="shortcut icon"
      type="image/png"
      sizes="32x32"
      href="${__PUBLIC_PATH_PREFIX__}favicon-32x32.png?v=2"
    />
    <link
      rel="shortcut icon"
      type="image/png"
      sizes="16x16"
      href="${__PUBLIC_PATH_PREFIX__}favicon-16x16.png?v=2"
    />
  </head>
  <body>
    <div id="root">${content}</div>
    ${SCRIPTS}
  </body>
</html>`;
}
