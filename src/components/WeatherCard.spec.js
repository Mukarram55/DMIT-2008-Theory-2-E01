import { createElement } from "react";
import { render, screnn } from "@testing-library/react";
import { expect, vi} from "vitest";
import WeatherCard from "./WeatherCard";

vi.mock("./Card", () => ({
    default: ({title, children}) =>
        createElement(
            "section",
            null,
            title ? createElement("h2", null, title) : null,
            children
        ),
}));

describe("WeatherCard", () => {
    it("renders current weather details", () => {
        const weather = {
            location: "Edmonton, CA",
            temperatureC: 12.7,
            description: "Modertae Rain",
            iconUrl: "https://openweathermap.org/img/wn/10d@2x.png",
        };

        render(createElement(WeatherCard, {weather}));

        expect (
            screen.getByRole("heading", {name: /current weather/i })
        ).toBeinTheDocument();
        expect(screen.getByText("Edmonton, CA")).toBeinTheDocument();
        expect(screen.getByText("13C")).toBeinTheDocument();
        expect(screen.getByText("Moderate Rain")).toBeinTheDocument();
        expect(screen.getByRole("img", {name: "Moderate Rain"})).toHaveAttribute(
            "src",
            weather.iconUrl
        );
   });
    
   it("renders fallback error content when weather data is unavailable", () => {
    render(
        createElement(WeatherCard, {
            weather: {
                location: "Edmonton",
                error: "Unable to load current weather right now.",
            },
        })
    );

    expect(screen.getByText("Edmonton")).toBeinTheDocument();
    expect(
        screen.getByText("Unable to load current weather right now.")
    ).toBeinTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
   });
});