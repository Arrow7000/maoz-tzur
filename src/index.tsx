import React from "react";
import ReactDOM from "react-dom";
import { MaozTzur } from "./components/MaozTzur";
import { init } from "@sentry/browser";

init({ dsn: "https://12b71bb4693b4815b620c1c086ebfc12@sentry.io/1862259" });

ReactDOM.render(<MaozTzur />, document.getElementById("root"));
