import express, { type ErrorRequestHandler } from "express";

const MINUTE = 60_000;
const DURATION = (() => {
   const value = parseInt(process.env.TIMER_DURATION_MINS ?? "");
   return isNaN(value) ? 30 : value;
})();

function clamp(x: number, min: number, max: number): number {
   return Math.max(Math.min(max, x), min);
}

const state = {
   isStarted: false,
   startedAt: 0,
};

const app = express();

app.post("/", (req, res) => {
   state.isStarted = true;
   state.startedAt = Date.now();

   return res.status(201).json({
      success: true,
      message: "Timer started.",
   });
});

app.get("/", (req, res) => {
   if (!state.isStarted) {
      return res.status(404).json({
         success: false,
         message: "There is no timer active.",
      });
   }

   const durationAsMs = DURATION * MINUTE;
   const difference = Date.now() - state.startedAt;

   const timeRemaining = clamp(
      Math.ceil((durationAsMs - difference) / MINUTE),
      0,
      DURATION,
   );

   const percentageRemaining = clamp(
      100 - (difference / durationAsMs) * 100,
      0,
      100,
   );

   const percentageRemainingString = `${percentageRemaining.toFixed(0)}%`;

   return res.json({
      timeRemaining,
      percentageRemaining,
      percentageRemainingString,
      success: true,
      message:
         `The battery has approximately ${percentageRemainingString} charge ` +
         `remaining, which should last about ${timeRemaining} minute${timeRemaining === 1 ? "" : "s"}.`,
   });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req, res, next) =>
   res.status(404).json({
      success: false,
      message:
         "Ross, there is only a single path. This is an extremely basic HTTP server, remember.",
   }),
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(((err, req, res, next) =>
   res.status(500).json({
      success: false,
      message: "Apparently the developer is also extremely basic.",
   })) as ErrorRequestHandler);

app.listen(3030);
