import { Plugin } from "obsidian";

export default class TextIndentPlugin extends Plugin {
	onload() {
		// returns promise
		this.app.workspace.on("active-leaf-change", async () => {
			check();
		});
		this.app.workspace.on("layout-change", async () => {
			check();
			// find way to reload view
		});

		function check() {
			let indent: Int = 0;
			document
				.querySelectorAll(".markdown-preview-view > div > div > *")
				.forEach(function (indentDiv) {
					if (!indentDiv.hasChildNodes()) return;
					if (
						indentDiv.tagName[0] != "H" &&
						indentDiv.tagName[0] != "P"
					)
						return;

					// crude
					// get indent level
					switch (indentDiv.tagName) {
						case "H1":
							indent = 1;
							break;

						case "H2":
							indent = 2;
							break;

						case "H3":
							indent = 3;
							break;

						case "H4":
							indent = 4;
							break;

						case "H5":
							indent = 5;
							break;

						case "H6":
							indent = 6;
							break;

						default:
							const indentDivTag = indentDiv.tagName[0];
							if (
								indentDivTag === "P" &&
								indentDivTag.className != "indent-" + indent
							) {
								indentDiv.className = "indent-" + indent;
								// console.log("\n\ntag: " + indentDiv.tagName + "\nclass: " + indentDiv.className");
							}
							break;
					}
				});
		}
	}
}
