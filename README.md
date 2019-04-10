# YouTube video custom element for Kentico Cloud

## How to use

### Prerequisites

You will need an API key for the YouTube V3 API. Follow the instructions at https://developers.google.com/youtube/v3/getting-started.

### Setup

```zsh
# Clone the Kentico custom element devkit repository
git clone https://github.com/Kentico/custom-element-devkit.git
cd custom-element-devkit

# Install devkit dependencies
npm install

# Clone this project repository into the devkit
git clone https://github.com/Bassetts/kc-youtube.git ./client/custom-elements/kc-youtube

# Install project dependencies
npm i --save @types/styled-components downshift fetch-suspense react react-dom \
react-lazy-load-image-component styled-components use-debounce

# Build and copy config file
npm start -- -cjsm
```

`/built/custom-elements/kc-youtube/` can now be deployed to a web server. Following the [instructions](https://developer.kenticocloud.com/docs/integrating-content-editing-features#section-3-displaying-a-custom-element-in-kentico-cloud) to add the custom element to your Kentico Cloud instance.

The YouTube V3 API key needs to be provided in the JSON parameters of the custom element e.g.

```json
{
  "apiKey": "<YOUR API KEY>"
}
```
