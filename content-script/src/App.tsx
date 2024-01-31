/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import { useEffect, useState } from "react";
import { scrapeTableData } from "./lib/schedule-scraper";
import Timetable from "./schedule";

function App() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const scrapedData = scrapeTableData();
    if (!scrapedData) return;
    setTableData(scrapedData);
  }, []);

  return (
    <div className="flex-1 min-h-screen w-full">
      <Timetable events={tableData || []} />
    </div>
  );
}

export default App;
