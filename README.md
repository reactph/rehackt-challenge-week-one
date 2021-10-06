<p align="center">
  <img src="./public/header-logo.png" width="33.33%" />
</p>

# The worst/best volume control

![GitHub Hacktoberfest combined status](https://img.shields.io/badge/hacktoberfest-2021-red)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![Facebook Group](https://img.shields.io/badge/join_the_community-on_facebook-1877F2?logo=facebook)
![Discord](https://img.shields.io/badge/join_the_community-on_discord-7289DA?logo=discord)

## The challenge

The brief is simple:

> Design the worst (or best) volume control UI imaginable!

Your volume control need not actually play any audio, but if you wish for it to do so, a sample is provided at `/src/entries/SampleEntry/SampleEntry.js`. If you need some inspiration, check out [this piece from UX Collective](https://uxdesign.cc/the-worst-volume-control-ui-in-the-world-60713dc86950)! 

## Getting started

1. Clone the repository using HTTPS or SSH:

    ```sh
    git clone https://github.com/reactph/rehackt-challenge-week-one.git

    # via SSH:
    # git clone git@github.com:reactph/rehackt-challenge-week-one.git
    ```

1. `cd` into the project and install its dependencies (we prefer [`yarn`](https://yarnpkg.com/)):

    ```sh
    cd rehackt-challenge-week-one && yarn install
    ```

1. Start the development server and you should be able to access the site at http://localhost:3000.

    ```sh
    yarn start
    ```

1. Run the script below to generate starter code for your entry and answer the prompts as they appear. A folder `/src/entries/[EntryName]` will be created for you where you must place all the files pertaining to your entry.

    ```sh
    node generate-entry.js
    ```

    ![generate-entry.js](https://i.imgur.com/1aONFZx.jpg)

    > You may also opt to do this manually by following these steps:
    >
    > 1. For your submission, create a folder `/src/entries/[EntryName]`, where `[EntryName]` is the name of your entry in `PascalCase`.
    >
    > 1. Once you have finished, edit the `/src/entries/index.js` module to include your entry, following the template already established.

## Mechanics

- Your entry must abide by our [code of conduct](https://www.facebook.com/notes/3697181806958522/).
- Each entry is permitted an 800 × 600 px canvas to complete the challenge.
- You may use open-source libraries to support your development, but they must not themselves be your solution to the challenge.
- Any custom public assets must be hosted externally.
- Any custom fonts should be loaded via JavaScript. This is to keep entries isolated from one another.
- And of course, your code must be a React component.

## Culminating activity

On 29 October 2021, ReactJS Philippines will host an event for community members and event partners to meet, hang out, and enjoy the fruits of their Hacktoberfest labor! In between a little chitchat and some games, we'll be opening up the stage to showcase (and marvel at!) all the open source contributions made throughout the month.

The best Rehackt Challenge solutions will be awarded prizes valued at ₱1,000.00 each! Their creators will also be given a forum to discuss their awesome work during the event. In order to be considered, you must submit your entry before 29 October 2021.

## P.S.

You're also 100% free to open a pull request to improve the overall experience of the challenge. These will surely be appreciated by the team! ♥
