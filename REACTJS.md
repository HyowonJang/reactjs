## 1.0 Creating your first React App

- webpack, Babel -> create-react-app
  - 하나의 명령어로 React Web App을 Set up

```
npx create-react-app movie_app
```

- yarn과 npm은 동일한 역할 수행

```
npm start
```

## 1.2 How does React work?

- react는 소스코드에 처음부터 HTML을 넣지 않음
- app을 로드할 때, 빈 HTML(소스코드)을 로드하고 그런 다음 react가 components(App.js)에 작성해둔 내용의 HTML을 밀어넣음
- index.html -(div id)-> index.js -(import file)-> App.js

## 2.0 Creating your first React Component

- index.js의 <App /> -> HTML X, component O
- component: HTML을 반환하는 함수

```javascript
// App.js의 component
function App() {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
```

- component를 사용하고자 할 때 -> `App` X, `<App />` O

```javascript
// index.js의 <App />
ReactDOM.render(<App />, document.getElementById("root"));
```

- react는 component를 사용해서 HTML처럼 작성하려는 경우에 필요
- 위와 같은 javascript와 HTML 사이의 조합 -> jsx
- **react application은 하나의 component만을 rendering해야 함** -> 그 component가 `App`이고 다른 component들은 `App` 안으로 가야 함

```javascript
// component인 <Potato />를 아래와 같이 써주면 됨
function App() {
  return (
    <div>
      <h1>Hello</h1>
      <Potato />
    </div>
  );
}
```

## 2.1 Reusable Components with JSX + Props

- father component에서 children component로 원하는 props를 보낼 수 있음 (함수에 arguments를 넣어 호출하는 것과 같음)
- component 이름은 대문자로 시작
- props 안에 있는 fav를 가져오기 -> `props.fav == {fav}`

## 2.4 Protection with PropTypes

- 전달받은 props가 원하는 props인지를 확인하기 위해 prop-types 사용

```
npm i prop-types
```

```javascript
Food.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};
```

2021.08.25

## 3.0 Class Components and State

- `function App() {}` -> `class App extends React.Component {}`
- React.Component에서 많은 것들을 가져올 수 있게 됨
- Function component: 뭔가를 return하고 screen에 표시됨
- Class component: React.Component로부터 확장되어서 return을 render 안에 넣으면 screen에 표시됨
  - React는 **자동적으로** Class component의 render method를 실행함
- 결국 결과는 같은 것 같은데 왜 class를 쓰나?
  - `state`를 쓰기 위함
  - `state`: object, 데이터를 넣을 공간이고, state에 바꾸고 싶은 데이터를 넣음

```javascript
// this는 self와 같음
{
  this.state.count;
}
```

- 함수가 즉시 호출되는게 아니라 click이 발생할 때 호출되기를 바라기 때문에 `this.add()`가 아닌 `this.add`를 씀
- `state`의 상태를 변경할 때 react가 render function을 호출해서 바꾸도록 해야 함
  - setState -> state refresh -> render function
  - **setState를 호출할 때마다 React는 새로운 state와 함께 render function을 호출함**
- 함수에서 `state`의 상태를 바꾸려고 하면 동작하지 않는데 이유는 이 경우 render function을 refresh 하지 않기 때문임

```javascript
// X
add = () => {
  this.state.count = 1;
};
// O
add = () => {
  this.setState({count: 1});
};
// 동적으로
add = () => {
  this.setState({count: this.state.count + 1});
};
// current 사용
add = () => {
  this.setState((current) => ({count: current.count + 1}));
};
```

## 3.2 Component Life Cycle

> 클래스 컴포넌트는 componentDidMount, getDerivedStateFromProps등의 React Component의 라이프사이클을 사용할 수 있지만 기존의 함수형 컴포넌트는 이러한 라이프사이클을 사용할 수 없었습니다. 그래서 온전히 render 만 구현할 수 있었다고 볼 수 있습니다.
> 출처: https://boxfoxs.tistory.com/395 [박스여우 - BoxFox]

- render 전후로 호출되는 function들
- Mounting: component-여기서는 함수를 의미-의 태어남
  - constructor()
    - JavaScript에서 class를 만들 때 호출되는 것
    - component가 mount될 때 호출됨
  - componentDidMount()
    - component가 처음 render될 때 호출됨
- Updating
  - componentDidUpdate()
    - component가 업데이트될 때 호출됨
- Unmounting: component의 죽음

  - componentWillUnmount()
    - 다른 페이지로 이탈하거나 새로고침을 하거나 해서 component가 unmount될 때 호출됨

- setState() 호출 -> component 호출 -> render 호출 -> 업데이트 완료 후 componentDidUpdate() 실행

## 3.3 Planning the Movie Component

```javascript
// 6초 뒤에 isLoading이 바뀌고 setState가 render를 호출하여 data가 fetching됨
class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 6000);
  }
  render() {
    const {isLoading} = this.state;
    return <div>{isLoading ? "Loading..." : "We are ready"}</div>;
  }
}
```

## 4.0 Fetching Movies from API

- axios: data를 fetch함(가져옴)
- 비동기 함수
  - async: 함수에게 기다려야 한다는걸 알려준다
  - await: 기다려야 할 것 앞에 붙여준다

```javascript
getMovies = async () => {
  const movies = await axios.get("https://yts-proxy.now.sh/list_movies.json");
};
```

## 4.1 Rendering the Movies

```javascript
state = {
  isLoading: true,
  movies: [],
};
getMovies = async () => {
  const {
    data: {
      data: {movies},
    },
  } = await axios.get("https://yts-proxy.now.sh/list_movies.json");
  // this.setState({movies:movies})
  // 이렇게 해도 작동함
  this.setState({movies});
};
// setState의 왼쪽 movies는 setState의 movies고, 오른쪽 movies는 axios온 movies
```

- React에서 function, class는 **화면에 어떻게 뿌려줄지**를 정의한다

```javascript
function Food({name, picture}) {
  return (
    <div>
      <h2>I like {name}</h2>
      <img src={picture} />
    </div>
  );
}

const foodILike = [
  {
    name: "cake",
    image:
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
  },
  {
    name: "icecream",
    image:
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
  },
  {
    name: "chicken",
    image:
      "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
  },
];

function App() {
  return (
    <div>
      {foodILike.map((kind) => (
        <Food name={kind.name} picture={kind.image} />
      ))}
    </div>
  );
}

// 이 부분이 함수에 값을 전달하는 것이고, 함수는 그 값을 받아 정의된 대로 화면에 그린다
<Food name={kind.name} picture={kind.image} />;
```

- key를 출력하려고 했을 때 id와 같은 값을 전달받았음에도 화면에 출력되지 않음

  > Warning: Movie: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop.

- map function은 항상 key를 달라고 함
- map function은 index도 우리한테 넘겨줘서 마음껏 쓸 수 있음

```javascript
// 직접 값을 key로 넘겨준 경우
{
  movies.map((movie) => (
    <Movie
      key={movie.id}
      id={movie.id}
      year={movie.year}
      title={movie.title}
      summary={movie.summary}
      poster={movie.medium_cover_image}
      genres={movie.genres}
    />
  ));
}
// map의 index를 key로 넘겨준 경우
{
  genres.map((genre, index) => (
    <li key={index} className="genres__genre">
      {genre}
    </li>
  ));
}
```

## 5.0 Deploying to Github Pages

- gh-pages 설치

```
npm i gh-pages
```

- pakage.json에 "homepage" 추가

```
"homepage": "https://hyowonjang.github.io/reactjs"
```

- pakage.json의 "scripts"에 "deploy", "predeploy" 추가

```
"deploy": "gh-pages -d build",
"predeploy": "npm run build"
```

- npm deploy를 실행하면 알아서 자동으로 predeploy -> build -> deploy로 실행됨

```
npm run deploy
```

- `npm run build`를 실행하면 build 폴더를 얻을 수 있음
- 그 다음부터는 npm start를 하지 않아도 homepage 주소에서 접근가능함

## 6.0 Getting Ready for the Router

- 이 강의에서는 하나의 페이지로 되어있는 homepage를 두개의 페이지로 interactive하게 되도록 만들어본다
- 네비게이션 바를 만들어주는 패키지

```
npm install react-router-dom
```

- src 폴더 안에
  - components 폴더를 만들어 Movie.css, Movie.js를 넣어두고 (routing되는 js파일에서 쓰일 component들)
  - routes 폴더를 만들어 About.js, Home.js 파일을 만듦 (직접적으로 routing의 대상이 되는 페이지들)
    - homepage에서 About 페이지로 가거나 Home 페이지로 가게되는 것
- 원래 App.js에 있던것을 Home.js로 보내고 App.js는 개편!

## 6.1 Building the Router

- App.js를 어떻게 개편하냐면 여기에 router를 넣어주어서 /home -> Home.js, /about -> About.js로 가게 해줄 것
  - router는 여러가지가 있는데 HashRouter, BrowserRouter 등이 있음, BrowserRouter는 /#/ 이런 이상한게 url에 없지만 github pages 설정이 어렵다고 함
- App component에서 HashRouter를 리턴하고, 그 안에는 Route가 들어가는데 Route에는 두가지 중요한 props가 있음
  1. path: 이동할 url 경로
  2. component: path로 이동했을 때 보여줄 component

```javascript
import React from "react";
import { HashRouter, Route } from "react-router-dom";
import About from "./routes/About";

function App(){
  return (
    <HashRouter>
      <Route path="/about" component={About /}>
    </HashRouter>
  );
}

export default App;
```

- Route의 path에 "/home"인 게 있고 "/home/introduction"인게 있으면 리액트는 후자를 렌더링할 때 전자도 함께 렌더링 함
  - "/home/introduction"에 "/home"도 매칭되기 때문
- 같은 경우로 path에 "/"인게 있고 "/about"인게 있으면 "/about"으로 이동했을 때 "/"인 것도 함께 둘다 렌더링해서 보여줌
- 이를 방지하기 위해 위의 경우에서는 "/home"에, 아래 경우에서는 "/"에 exact라는 props를 추가해줌

```javascript
<Route path="/" exact={true} component={Home} />
```

## 6.2 Building the Navigation

- Navigation은 About, Home 모든 페이지에 나타나야 하기 때문에 components 폴더에 <Navigation>을 추가하여 App.js의 <HashRouter> 안에 넣어줌
- Navigation.js의 Navigation 컴포넌트는 아래와 같이 작성할 수 있는데 문제가 생김
  - 이래의 a href는 문서를 연결하는 html로 react를 죽이고 그냥 페이지를 새로고침하게 되어 동작하지 않음

```javascript
function Navigation() {
  return (
    <div>
      <a href="/">Home</a>
      <a href="/About">About</a>
    </div>
  );
}
```

- 그래서 a href 대신에 link라는 것을 사용함, link에서는 href말고 to임
- Link는 (-> Navigation component -> App.js) Router 안에 있어야 동작함

```javascript
import {Link} from "react-router-dom";

function Navigation() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/About">About</Link>
    </div>
  );
}
```

## 6.3 Sharing Props Between Routes

- Route는 components들에 알아서 props를 넣어주고 우리는 이걸 활용할 수 있음
  - ex) About component에는 아무것도 설정한 props(parameters)가 없지만 콘솔에 찍어보면 history, location, match, staticContext 같은걸 보내고 있음
- 앞에서는 Link의 to props에 "/"와 같은 value를 전달했지만 더 많은 정보를 담은 object를 전달할 수도 있음
- Link는 클릭 등으로 다른 페이지로 연결해줘야 할 때 해당 컴포넌트에서 사용한다

```javascript
// example
<Link
  to={{
    pathname: "/courses",
    search: "?sort=name",
    hash: "#the-hash",
    state: {fromDashboard: true},
  }}
/>
```

```javascript
<Link
  to={{
    pathname: "/about",
    state: {fromNavigation: true},
  }}
/>
```

- Home에서 영화를 클릭하면 영화 상세 페이지로 가게하기 위해
  1. Movie 정보를 Home.js에서 map 함수에서 Movie component를 호출함으로써 하나씩 출력해주고 있었는데 그 Movie component에 Link를 씌워줌으로써 클릭하면 "/movie-detail"로 넘어가도록 한다
  2. 또한 Link의 props를 통해 "/movie-detial"로 링크될 때 state 정보를 함께 넘겨준다
  3. App.js에 movie_detail이라는 경로를 추가해주고 Detail이라는 component를 넣어준다
  4. Detail component를 만들어준다

## 6.4 Redirecting

- 2번에서 넘겨준 state 정보는 Router가 알아서 넘겨주는 props의 location안에 state로 있음
- 만약 "/movie-detial"로 클릭없이 다이렉트로 오면 정보를 넘겨받을 기회가 없었기 때문에 state가 undefined로 뜸
- 이를 핸들링하기 위해서 class component의 componentDidMount 함수를 이용하여 state가 undefined면 리다이렉트하도록 만들어주자
  1. componentDidMount는 class component에서만 사용할 수 있기 때문에 function에서 class로 변경해줌!
  2. Detail 컴포넌트는 Route로부터 넘겨받은 props를 가지고 있는데 그 props 중 history의 push는 url을 바꿔줄 수 있으므로 이 state를 바꿔주자

```javascript
class Detail extends React.Component {
  componentDidMount() {
    const { location, history } = this.props;
    if (location.state == undefined) {
      history.push("/");
    }
  }
  render() {
    return <span>hello</span>'
  }
}
export default Detail;
```

- class 컴포넌트에서 render()가 먼저 실행된 다음에 componentDidMount()가 실행됨
- componentDidMount()에서는 location.state == undifined인 경우를 처리해주었지만 render에서는 처리해주지 않아서 먼저 에러가날 수 있으므로 동일하게 if else문으로 핸들링해주어야 함
- 어쨌거나 이 정보들은 Detail 컴포넌트가 Route를 통해 실행되기 때문에 전달되어 오는 것임

## Etc.

- 이 앱의 메인이 되는 구조는
  - Movie -> Home() -> App (Routing)
  - App.js -> Home.js -> Movie.js
    1. App.js: Home, About, Detail의 components를 routing
    1. Home.js: API에서 데이터 받은 후 Movie component를 호출하여 데이터 전달
    1. Movie.js: 실제적으로 Home에서 보여지는 화면을 그리는 component
- routing
  - App.js 주소 routing: 'react-router-dom'의 HashRouter, Route 사용
  - Movie.js 영역 클릭시 linking: 'react-router-dom'의 Link 사용
    - Link에서 state로 데이터 넘겨줄 수 있음
- API 주소: 'https://yts-proxy.now.sh/list_movies.json?sort_by=rating'
- 데이터를 가져오는(fetch) 라이브러리: axios
- 데이터를 다 가져올 때까지 기다려주는(비동기) 기능: async, await
- props type 체크: 'prop-types'

- span

  > <span> 태그는 HTML 문서에서 인라인 요소(inline-element)들을 하나로 묶을 때 사용합니다.
  > <span> 요소는 그 자체만으로는 어떠한 의미도 가지지 않지만, class나 id와 같은 전역 속성과 함께 사용하여 스타일링을 위해 요소들을 그룹화하거나 lang 속성과 같은 속성값을 공유하는 데 유용하게 사용할 수 있습니다.
  > <span> 요소는 <div> 요소와 매우 비슷하게 사용되지만, <div> 요소는 블록 타입의 요소인데 반해 <span> 요소는 인라인 타입의 요소입니다.

- Home.js에서 render()가 실행되고 그다음에 componentDidMount()가 실행되는데
  - render()가 처음 실행될 때는 최초 state 상태에 따라 isLoading: true 상태
  - componentDidMount()에서 getMovies()를 호출해서 실행하면서 isLoading: false로 업데이트됨
  - setState()가 호출되면 -> component가 호출되고 -> render()가 호출되게 되어있음
  - 결과적으로 isLoading: false이므로 Movie 컴포넌트를 그려내게 되는 것

```javascript
npm i prop-types
npm i axios
npm install react-router-dom
```

- Navigation은 App.js에서 <HashRouter> 안에 <Route> 위에 한줄로 들어가고 그 결과로 모든 페이지에서 Navigation을 볼 수 있음
