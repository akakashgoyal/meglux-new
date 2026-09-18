/**
 * Utility to reliably print specific elements or whole documents
 * Works across desktop, mobile, and iframe sandboxes.
 */
export function printElement(elementId: string, title: string = 'Document') {
  const el = document.getElementById(elementId);
  if (!el) {
    window.print();
    return;
  }

  // Create an isolated hidden iframe for clean printing
  const iframe = document.createElement('iframe');
  iframe.setAttribute('style', 'position:fixed;top:-9999px;left:-9999px;width:0;height:0;border:0;');
  document.body.appendChild(iframe);

  try {
    const doc = iframe.contentWindow?.document;
    if (!doc) {
      window.print();
      return;
    }

    // Collect all stylesheets and style tags from current document
    const styleElements = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
    const stylesHtml = styleElements.map(s => s.outerHTML).join('\n');

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>${title}</title>
          ${stylesHtml}
          <style>
            @page {
              size: auto;
              margin: 12mm 15mm;
            }
            body {
              background: #ffffff !important;
              color: #0f172a !important;
              margin: 0 !important;
              padding: 16px !important;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .no-print, button, nav, header, footer {
              display: none !important;
            }
            * {
              box-shadow: none !important;
            }
          </style>
        </head>
        <body>
          <div class="print-content">
            ${el.outerHTML}
          </div>
        </body>
      </html>
    `);
    doc.close();

    // Give time for styles and images to render in iframe
    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch (err) {
        console.warn('Iframe print failed, falling back to window.print()', err);
        window.print();
      } finally {
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 2000);
      }
    }, 350);
  } catch (error) {
    console.warn('Direct print fallback', error);
    window.print();
    if (document.body.contains(iframe)) {
      document.body.removeChild(iframe);
    }
  }
}
