# [TAPEDECK!](https://tapedeck.vercel.app/)

The application serves the almighty purpose of presenting various kinds of tapedeck cassettes.

## Features

### Filtering cassettes

- Four filter categories are present corresponding to individual cassette attributes
  - Brand
  - Color
  - Play Time
  - Type
- Each `category` is filled up dynamically with `filters`, based on the set of available distinct values of the corresponding cassette attribute.
- Each `filter` comes with a meta information about how many casettes are holding the corresponding attribute value
- Selecting `filters` intra-category has an disjunction effect
- Selecting `filters` inter-category has an conjunction effect
- A button labelled by **CLEAR ALL FILTERS** is present to reset all `filters` within each `category`

### Sorting cassettes

- A selection dropdown labelled by **SORT BY** is present to sort the (potentially filtered) list of casettes, with four selection options that correspond to individual cassette attributes
  - Brand
  - Color
  - Play Time
  - Type
- Selecting an option will sort the list of cassettes in an ascending order on the corresponding attribute

## Technical aspects

#### Data source

- For data-fetching & caching `react-query` is being utilized
- The incoming data is being transformed into a reasonable & manageable structure

#### State management

- `Context` is used for sharing state among different components of the application, which seemed to be the quickest and minimal viable solution

#### Data mapping

- A mapping record is being maintained on the client side for transforming attributes into a human readable format and to inherit the attributes on which the casettes are `filterable/sortable` on

#### Loading

- The data-dependent components are suspended while the data from the API is fetching, a fallback loading indication is displayed during (`React.Suspense`)

#### Robustness

- The application is capable of recovering from errors (including network related ones), triggerable manually

#### Security

- The data source contains potential unsecure HTTP references, those are sanitized during the data transformation

#### Operability

- The API-related assets are outsourced

## Next steps

- Testing 🙈
- Ideally utilizing Redux(Toolkit) or at least built-in react Reducers for the cleaner flow of the state management, and it'd also ease the testing by unlocking the capability to test the state update logic separately
- Performance improvement utilizing either `Pagination` or `Infinite Scrolling`
- Displaying chips representing the selected filters, making them interactive (remove by click)
- Collapsable filter categories, individual clearing capability of each category
- Error handling & suspending components with more granularity
- More eye-catching design

## Operation manual

The project is bootstrapped with `Vite`, utilizing `Typescript` and `TailwindCSS`.

### Environment

```
VITE_API_URL=<API_URL>
VITE_API_KEY=<API_KEY>
```

### Install

```
npm install
```

### Development mode

```
npm run dev
```

### Production mode

```
npm run build
npm run preview
```
