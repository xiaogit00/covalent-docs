import React from "react"
import DocsNavLogoLockup from "./docs-nav-logo-lockup"
import "../css/components/sidebar-logo.css"


const style = {
  padding: "10px"
};


const DocsSidebarHeaderSection = () => (
  <div className="DocsSidebar--section DocsSidebar--header-section">
    <a className="DocsSidebar--cloudflare-logo-link DocsSidebar--link" href="/docs/">
      <DocsNavLogoLockup
        logo={<span>
          <img className="light" style={style} src="https://covalenthq.com/static/images/covalent-logomark.png" />
          <img className="dark" style={style} src="https://covalenthq.com/static/images/covalent-logomark-white.png" />
        </span>}
        text={(
          <>
            <span data-text="Covalent">Covalent</span>
            <span>&nbsp;</span>
            <span data-text="Docs">Docs</span>
          </>
        )}
      />
    </a>
  </div>
)

export default DocsSidebarHeaderSection
