2021.08.23
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
ReactDOM.render(<App />, document.getElementById('root'));
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
  rating: PropTypes.number.isRequired
}
```

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
{this.state.count}
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
}
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
  this.setState(current => ({count: current.count + 1}));
};
```

## 3.2 Component Life Cycle
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
class App extends React.Component{
  state = {
    isLoading: true,
    movies: []
  };
  componentDidMount(){
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 6000);
  }
  render() {
    const { isLoading } = this.state;
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
    const movies = await axios.get('https://yts-proxy.now.sh/list_movies.json')
  }
```

## 4.1 Rendering the Movies
```javascript
state = {
  isLoading: true,
  movies: []
};
getMovies = async () => {
  const {data: {data: {movies}}} = await axios.get('https://yts-proxy.now.sh/list_movies.json');
  // this.setState({movies:movies})
  // 이렇게 해도 작동함
  this.setState({movies})
}
// setState의 왼쪽 movies는 setState의 movies고, 오른쪽 movies는 axios온 movies
```

- React에서 function, class는 **화면에 어떻게 뿌려줄지**를 정의한다
```javascript
function Food({name, picture}){
  return <div>
    <h2>I like {name}</h2>
    <img src={picture} />
  </div>
}

const foodILike = [
  {
    name: "cake",
    image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  },
  {
    name: "icecream",
    image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  },
  {
    name: "chicken",
    image: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
  },
]

function App() {
  return (
    <div>
      {foodILike.map(kind => (
        <Food name={kind.name} picture={kind.image}/>
      ))}
    </div>
  );
}

// 이 부분이 함수에 값을 전달하는 것이고, 함수는 그 값을 받아 정의된 대로 화면에 그린다
<Food name={kind.name} picture={kind.image}/>
```

- key를 출력하려고 했을 때 id와 같은 값을 전달받았음에도 화면에 출력되지 않음
>Warning: Movie: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop.