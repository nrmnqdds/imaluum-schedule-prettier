import moment from "moment";


const predefinedColors = [
  "bg-red-200 text-red-700 border-red-500 hover:bg-red-300 hover:text-red-800",
  "bg-sky-200 text-sky-700 border-sky-500 hover:bg-sky-300 hover:text-sky-800",
  "bg-fuchsia-200 text-fuchsia-700 border-fuchsia-500 hover:bg-fuchsia-300 hover:text-fuchsia-800",
  "bg-orange-200 text-orange-700 border-orange-500 hover:bg-orange-300 hover:text-orange-800",
  "bg-lime-200 text-lime-700 border-lime-500 hover:bg-lime-300 hover:text-lime-800",
  "bg-yellow-200 text-yellow-700 border-yellow-500 hover:bg-yellow-300 hover:text-yellow-800",
  "bg-emerald-200 text-emerald-700 border-emerald-500 hover:bg-emerald-300 hover:text-emerald-800",
  "bg-pink-200 text-pink-700 border-pink-500 hover:bg-pink-300 hover:text-pink-800",
  "bg-indigo-200 text-indigo-700 border-indigo-500 hover:bg-indigo-300 hover:text-indigo-800",
  "bg-stone-200 text-stone-700 border-stone-500 hover:bg-stone-300 hover:text-stone-800",
  "bg-purple-200 text-purple-700 border-purple-500 hover:bg-purple-300 hover:text-purple-800",
];

export const scrapeTableData = () => {
    const root = document;
    const table = root.querySelector(".box-body table.table.table-hover");
    const rows = table?.querySelectorAll("tr");

    const schedule = [];

    for (const row of rows!) {
      const tds = row.querySelectorAll("td");

      // Check if tds array has enough elements
      if (tds.length >= 9) {
        const courseCode = tds[0].textContent!.trim();
        const courseName = tds[1].textContent!.trim();
        const section = parseInt(tds[2].textContent!.trim(), 10);
        const chr = parseInt(tds[3].textContent!.trim(), 10);
        const days = tds[5].textContent!
          .trim()
          .replace(/ /gi, "")
          .split("-")
          .map((x) => {
            if (x === "M" || x === "MON") return 1;
            if (x === "T" || x === "TUE") return 2;
            if (x === "W" || x === "WED") return 3;
            if (x === "TH" || x === "THUR") return 4;
            if (x === "F" || x === "FRI") return 5;
          });

        // Split the days array if it has more than one item
        const splitDays = days.length > 1 ? [...days] : days;
        const time = tds[6].textContent?.trim().replace(/ /gi, "").split("-");
        const start = moment(time![0], "Hmm").format("HH:mm:ssZ");
        const end = moment(time![1], "Hmm").format("HH:mm:ssZ");
        const venue = tds[7].textContent?.trim();
        const lecturer = tds[8].textContent?.trim();

        const color = predefinedColors.shift() || "";

        // Add each split day as a separate entry in the schedule
        for (const splitDay of splitDays) {
          schedule.push({
            id: `${courseCode}-${section}-${splitDays.indexOf(splitDay)}`,
            courseCode,
            courseName,
            section,
            chr,
            timestamps: [{ start, end, day: splitDay }],
            venue,
            color,
            lecturer,
          });
        }
      }
    }

    return schedule;
  };