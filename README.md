# YouTube video picker custom element for Kentico Cloud

## How to use

### Prerequisites

You will need an API key for the YouTube V3 API. Follow the instructions at https://developers.google.com/youtube/v3/getting-started.

### Setup

```
# clone devkit repository
git clone https://github.com/Kentico/custom-element-devkit.git
cd custom-element-devkit

# install devkit dependencies
npm install

# clone project repository into devkit
git clone https://github.com/Bassetts/kc-youtube-picker.git ./client/custom-elements/kc-youtube-picker
cd ./client/custom-elements/kc-youtube-picker

# install project dependencies
npm i --save @types/styled-components downshift fetch-suspense react react-dom react-lazy-load-image-component styled-components use-debounce

# create config
cp config.example.js config.js

# Edit `config.js` and set your YouTube API key.

# start watcher
npm start -- -hw
```

Go to https://localhost:3000/custom-elements/kc-youtube-picker/wrap in a browser
