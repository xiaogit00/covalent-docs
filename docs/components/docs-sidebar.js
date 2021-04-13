import React from "react"

import DocsSidebarHeaderSection from "./docs-sidebar-header-section"
import DocsSidebarNavSection from "./docs-sidebar-nav-section"

const DocsSidebar = () => (
  <div className="DocsSidebar">
    <div className="DocsSidebar--sections">
      <DocsSidebarHeaderSection/>
      <DocsSidebarNavSection/>
    </div>

    <div className="DocsSidebar--shadow"></div>
  </div>
)

export default DocsSidebar
