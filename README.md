# Bazaar test task for junior developers

## From developer (Marina Obruch)

1. Implemented the main functionality as specified

- routing is implemented useState
- the filter is implemented on the frontend side, as there were problems with the implementation through a request to the server (KORS errors)

2. Areas for improvement

- routing
- likes on the backend (now stored in LocalStorage)
- using a library (for example, react-slick) for a more elegant picture carousel

---

## Installation

1. Fork the code to your personal repo
2. Install `docker` and `docker-compose`
3. Run `docker compose up -d` (for some systems the command is `docker-compose up -d`)
4. Once the command finished, the project should be available at [http://localhost:8000](http://localhost:8000)
5. (Optional) Run `npm install`, so you can have autocompletion, etc.

## API documentation

The API documentation is available at [http://localhost:8000/swagger](http://localhost:8000/swagger) once the app is up and running. Keep in mind, that every 5 times an API call is made, it throws an error - you should handle the error and display an error message using [react-toastify](https://www.npmjs.com/package/react-toastify) (the library is already inlcuded in the project). Also, API makes a random delay before returning a response, so you have to display a loading animation.

## Good to know

- There're [react-toastify](https://www.npmjs.com/package/react-toastify) and [material-ui](https://mui.com/material-ui/getting-started/) libraries added to the project. You're not obligated to use these, but I really recommend to.
- Current frontend code is written in JavaScript, but you can use TypeScript.
- The ads API returns descriptions of ads as html. You don't have to worry about displaying it as html, just render it as a string (so it's totally fine if the ad description of the ad-details component looks like this `Cars rental<br><a href="https://google.com">Link</a>`)

## Goals:

0. Read this README.
1. Every 5th API call throws a 500 error. It's done on purpose and you have to display an error notification. `react-toastify` can be a great help for that.
2. API calls have a random delay to mimick a real-world API call. You need to display a loading animation while the API request is in the loading state.
3. Implement AdsList and AdDetails components.
4. [http://localhost:8000](http://localhost:8000) and [http://localhost:8000/ads](http://localhost:8000/ads) should return AdsList component
5. AdDetails should be available at [http://localhost:8000/ads/:id](http://localhost:8000/ads/:id)
6. `nx lint frontend` should not return eny erorrs.
7. Once the app is ready, submit a PR to the main branch of **YOUR** repository and message to your contact from our team.

### AdsList component

Should render list of ads. It should support filtering by max/min price, city, district and by a text string (query param `search`). More details on how to filter the list you can find at [the API documentation page](http://localhost:8000/swagger) (available only once the app is up and running).

Layout of the component looks like this

```
<centered><h1>List of ads</h1>20px gap[filters button]</centered>
[ad-card] [ad-card] [ad-card]
[ad-card] [ad-card] [ad-card]
...
```

- Every ad-card has static width of 250px.
- The space between every column/row should be 20px.
- The list of ads should render up to 4 ad cards in a row. So even if the screen size >= 1370px, there still should be only 4 ad cards in a row, and the content should be vertically centered, i.e. if my screen size is 1400, the layout should be next

```
<centered><h1>List of ads</h1>20px gap[filters button]</centered>
190px[ad-card]20px[ad-card]20px[ad-card]20px[ad-card]190px
```

- Assume that the minimal supported screen width is 520px, so the minimum row width is 2 ad cards + 20px gap.
- Filters should open in a dialog-like component and should include: min price, max price, city, district and _Contains_ (this filter should be sent as the query param `search`).
- As it already was mentioned before, every ad-card has static width of 250px and should render an ad thumbnail and the title. The UI layout:

```
[thumbnail - takes all the width, which is 250px]
40px gap
[title][all available space, but not less than 20px][Like button]
[city][all available space, but not less than 20px][price]
```

- A city name/a title should be displayed in one line. If there's not enough space to fit the city name/title, display it like this: `A long title that didn't fit to this small spa...`.
- Click on an ad should redirect to the ad page, click on the like button should add the ad to the list of liked ads (store the list in localStorage) and SHOULD NOT cause the redirect to the ad page. If a user liked an ad, display the button in a different color.

### AdDetails component

The component has 40px paddings from every side. The layout:

```
[centered carousel with the ad images, height is 30% of the screen]
all free screen height
[full title][all available space, but not less than 20px][Like button]
[city], [district] [all available space, but not less than 20px][price]
40px
[description]
```

Quite simple, isn't it?

## Limitations

The source code of the FE application is located at `apps/frontend/src`. You're allowed to change files _ONLY INSIDE THIS DIRECTORY_ (thus you can't install any new libraries). The only file you can change outside of this folder is `apps/frontend/.eslintrc.json` and only in order to enable TypeScript set of rules.
