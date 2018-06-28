# ISS Flyby - A project to learn Redux

## Purpose

I am building on my experience with JavaScript to continue toward my objective of transitioning from aeronautical engineering into Tech as a front-end web developer. This project is one of a series designed to give me exposure to common libraries and frameworks used with JavaScript.

## App Features

* Built using redux. State is kept in a single store and extracted for use in components as needed.
* Form state is managed using redux-form package. Implementing redux-form takes care of some of the grunt work behind keeping the state synced with the value of the various form fields.
* Interacts with an [API](http://open-notify.org/Open-Notify-API/ISS-Pass-Times/) to collect space station location information.
* Renders a list of upcoming space station pass overs for the user-specified location.

## Structure

The app has the following high-level structure:
```
<App>
  <Header>
  <IssApiForm>
  <FlybyTable>
    <FlybyRows>
```

There is one difference in the structure relative to the version built in pure React (without using Redux). `<FlybyTable>` is now a direct child of `<App>`. In the pure React version, `<FlybyTable>` was a child of `<IssApiForm>` to have access to its state. This simple app doesn't necessarily warrant the features of Redux, but this small example shows a fundamental difference in how state is managed.
