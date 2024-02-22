# Highlander Battery

This **extremely simple http server** allows you to start a timer and then check the progress of the timer, simulating a battery.

## Usage

-  Send a POST request to start (or re-start) the battery timer;
-  Send a GET request to see the current status.

## API

All responses have the following format:

```js
{
   status: boolean;
   message: string;
}
```

A successful status request has the following additional keys:

```js
{
   timeRemaining: number, // int
   percentageRemaining: number, // float
   percentageRemainingString: string, // format: "x%"
}
```
