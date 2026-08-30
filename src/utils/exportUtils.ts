import { ScanHistoryItem } from '../types';

export function exportScanAsJSON(scan: ScanHistoryItem): void {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(scan, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `mediscan-${scan.id}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportScanAsPDF(scan: ScanHistoryItem): void {
  window.print();
}
