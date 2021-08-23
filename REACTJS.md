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

## 2.2 Dynamic Component Generation