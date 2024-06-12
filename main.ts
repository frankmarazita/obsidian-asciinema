import * as AsciinemaPlayer from "asciinema-player";
import { Notice, Plugin } from "obsidian";

export default class AsciinemaPlayerPlugin extends Plugin {
	async onload() {
		try {
			this.registerMarkdownPostProcessor((el: HTMLElement) => {
				el.querySelectorAll("div").forEach((div) => {
					if (!div.classList.contains("internal-embed")) return;

					const src = div.getAttribute("src");

					const matched = src?.match(/(?<filepath>.*\.cast)/);

					if (matched) {
						el.innerHTML = `<div class="asciinema-player"></div>`;

						AsciinemaPlayer.create(
							"https://asciinema.org/a/553356.cast",
							el.querySelector(".asciinema-player"),
							{
								loop: true,
							}
						);
					}
				});
			});
		} catch (err) {
			new Notice(err);
		}
	}
}
