import React from "react";
import AppraisalSystem from "../components/admin/apprisalspage/Apprisals";
import ApprisalMainlayout from "../layouts/admin/ApprisalMainlayout";

export default function AppraisalsPage() {
  return (
    // <Adminlayouts>
      <ApprisalMainlayout>
        <AppraisalSystem />
      </ApprisalMainlayout>
    // </Adminlayouts>
  );
}
