import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./main.css";

const table = document.querySelector(".box-body");

document.documentElement.classList.add("dark");

const app = document.createElement("div");

app.id = "root";

// Make sure the element that you want to mount the app to has loaded. You can
// also use `append` or insert the app using another method:
// https://developer.mozilla.org/en-US/docs/Web/API/Element#methods
//
// Also control when the content script is injected from the manifest.json:
// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#run_time
if (table) {
	const table = document.querySelector(
		".box-body table.table.table-hover",
	) as HTMLTableElement;
	table.style.display = "none";
	table.parentNode?.insertBefore(app, table);
}

const container = document.getElementById("root");
container.style.width = "100%";
container.style.maxWidth = "100%";
container.style.height = "100%";
container.style.overflowX = "hidden";
container.style.flexGrow = "1";
container.style.flex = "1";
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.justifyContent = "center";
container.style.alignItems = "center";
container.style.position = "relative";
const root = createRoot(container!);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
