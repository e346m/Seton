Seton
===
## Seton
Seton is a tool for Github issue tracking across repositories so far.
For example you can track bug issues of libraries used in your project without visiting each repository. Or let say you want to track only a certain level issues of libraries, you can.

## Naming & Goal
From E. T. Seton's quote "there is no animal that cannot be tracked" Seton is supposed to track issues.

## ScreenShots
![result](https://github.com/e346m/Seton/blob/master/assets/set_token.png)
![result](https://github.com/e346m/Seton/blob/master/assets/group.png)
![result](https://github.com/e346m/Seton/blob/master/assets/group_add.png)
![result](https://github.com/e346m/Seton/blob/master/assets/issue_list.png)
![result](https://github.com/e346m/Seton/blob/master/assets/issue.png)

## Demo
I picked up some repositories with easy labeled issue like `good first issue`, `Level: stater` in this demo
![result](https://github.com/e346m/Seton/blob/master/assets/demo.gif)

## Based
![result](https://github.com/e346m/Seton/blob/master/assets/deps.png)

- Electron: generally handle main process
- React: mainly handle rendering things(Redux isn't integrated in Apollo yet in this App)
- Apollo: handle requests and responses for the Github API
- Github GraphQL API v4

```
    -----------------------
    |    Github API v4    |
    -----------------------
           GraphQL
 _            ||
| |           ||
|G|       Apollo Client
|U| <======> React
|I|           ||
|_|           ||
    ----------------------
    |     Electrorn      |
    ----------------------
```

## Feature

- [x] Setting `access Token`.
- [x] Create and Delete Group.
- [x] Set one label for each repository.
- [x] View Issues across repositories.
- [x] View Issue and related comments.

## Contribute
```
  # Install dependencies
  yarn

  # start with hot reload
  yarn start
```

## License

This software is released under the MIT License, see LICENSE
