<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
    xmlns:html="http://www.w3.org/TR/REC-html40"
    xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap | SmartCalcLab.com</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            color: #334155;
            background: #f8fafc;
            margin: 0;
            padding: 30px;
          }
          .container {
            max-width: 1000px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            overflow: hidden;
            border: 1px solid #e2e8f0;
          }
          .header {
            padding: 24px 32px;
            background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
            color: white;
          }
          .header h1 {
            margin: 0 0 6px 0;
            font-size: 24px;
            font-weight: 800;
          }
          .header p {
            margin: 0;
            font-size: 13px;
            color: #bfdbfe;
          }
          .content {
            padding: 20px 32px 32px 32px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
            margin-top: 10px;
          }
          th {
            text-align: left;
            padding: 12px 14px;
            background: #f1f5f9;
            color: #475569;
            font-weight: 700;
            border-bottom: 2px solid #e2e8f0;
          }
          td {
            padding: 12px 14px;
            border-bottom: 1px solid #f1f5f9;
          }
          tr:hover {
            background-color: #f8fafc;
          }
          a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
          }
          a:hover {
            text-decoration: underline;
          }
          .priority {
            font-weight: 700;
            color: #059669;
            background: #d1fae5;
            padding: 2px 8px;
            border-radius: 9999px;
            font-size: 11px;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>SmartCalcLab.com XML Sitemap</h1>
            <p>Generated for Google, Bing &amp; Search Engine Indexing. Contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> URLs.</p>
          </div>
          <div class="content">
            <table>
              <thead>
                <tr>
                  <th width="50%">URL</th>
                  <th width="15%">Priority</th>
                  <th width="15%">Change Frequency</th>
                  <th width="20%">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td>
                      <xsl:variable name="itemURL">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:variable>
                      <a href="{$itemURL}">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <span class="priority">
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </td>
                    <td>
                      <xsl:value-of select="sitemap:changefreq"/>
                    </td>
                    <td>
                      <xsl:value-of select="sitemap:lastmod"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
