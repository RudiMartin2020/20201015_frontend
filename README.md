# SK C&C 제조 지능화 파일럿

## 프로젝트 셋업
대부분의 Frontend Framework을 이용한 프로젝트들은 오픈소스 모듈들을 활용하고 있습니다. 어떤 외부 모듈을 사용하고 있는지는 `package.json` 파일에 정의되어 있으며, node.js가 설치되어 있다면 사용할 수 있는 `npm install` 커맨드를 이용해 디펜던시를 설치할 수 있습니다.
```
npm install
```
커맨드를 실행하면 `node_modules` 폴더가 생성되고 해당 폴더에 디펜던시들이 설치됩니다.

### 개발용 컴파일 & 핫 리로드
`npm run serve` 라는 커맨드를 사용해 로컬 개발 서버를 구동시키고 브라우저에 화면을 표시합니다.
```
npm run serve
```
webpack을 이용해 자동으로 빌드가 진행되고, 이 상태에서 개발을 진행하면, .js, .vue, .scss 등의 소스 파일들이 변경될 떄 마다 자동으로 컴파일 & 핫 리로드가 진행되므로, 매우 빠른 속도로 개발을 진행 할 수 있습니다.

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
