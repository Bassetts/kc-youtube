import "../../shared/custom-module.css";
import "./stylesheet.styl";

const YouTubeInputElement: HTMLInputElement = <HTMLInputElement>(
  document.getElementById(`youtube-input`)
);

const YouTubePreviewElement: HTMLElement = <HTMLElement>(
  document.getElementById(`youtube-preview`)
);

const YouTubeVideoIdRegex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)?([a-zA-Z0-9_-]{11})/;

const updateDisabled = (disable: boolean) => {
  YouTubeInputElement.disabled = disable;
};

const handleInput = () => {
  const videoId: string = YouTubeInputElement.value;
  const match: RegExpExecArray | null = YouTubeVideoIdRegex.exec(videoId);

  if (match && match.length > 1) {
    const videoId: string = match[1];

    YouTubePreviewElement.innerHTML = `<iframe width="640" height="480"
      src="https://www.youtube.com/embed/${videoId}"
      frameborder="0" allow="accelerometer; autoplay;
      encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen>
    </iframe>`;

    CustomElement.setValue(videoId);
  } else {
    YouTubePreviewElement.innerHTML = ``;
    CustomElement.setValue(null);
  }

  updateSize();
};

const setupYoutubePicker = (initialValue: string | null) => {
  if (initialValue) {
    YouTubeInputElement.value = initialValue;
    handleInput();
  }

  YouTubeInputElement.addEventListener(`input`, handleInput);
};

const updateSize = () => {
  const height: number = document.body.clientHeight;
  CustomElement.setHeight(height);
};

const initCustomElement = () => {
  CustomElement.init((element, _context) => {
    updateDisabled(element.disabled);
    setupYoutubePicker(element.value);
    updateSize();
  });

  CustomElement.onDisabledChanged(updateDisabled);
};

initCustomElement();
