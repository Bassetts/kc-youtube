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
npm i --save @types/styled-components@^4.1.13 downshift@^1.1.2 fetch-suspense@^1.1.0 react@^16.8.4 react-dom@^16.8.4  \
react-lazy-load-image-component@^1.3.2 styled-components@^4.2.0 use-debounce@^1.1.2

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
