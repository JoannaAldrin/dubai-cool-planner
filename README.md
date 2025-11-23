
## Project info

**URL**: https://dubai-cool-planner.vercel.app/

Dubai Cooling System Optimization App
Project Overview

This project aims to optimize energy consumption in air-conditioned rooms in Dubai’s arid climate. The web app allows users to calculate cooling load, energy consumption, and cost, while simulating energy-saving strategies like pre-cooling, thermostat adjustments, and off-peak usage.

Features

Input room dimensions (length, width, height)

Input number of occupants, indoor temperature, and outdoor temperature

Calculate room volume and cooling load in kW

Estimate energy consumption (kWh) and cost using DEWA tariff (0.29 $/kWh)

Simulate optimization strategies to reduce energy use and cost

Interactive graphs and results displayed in the app

How to Use

Open the app via the deployed URL:
https://your-vercel-link.vercel.app

Enter room dimensions, number of occupants, and temperatures.

View results for cooling load, energy consumption, and cost.

Use sliders/buttons to simulate energy-saving strategies.

Optional: Export results for analysis (if implemented).

Technologies Used

Frontend: React, TypeScript, Tailwind CSS (generated via Lovable)

Backend/Logic: cooling-calculations.ts (TypeScript functions for calculations)

Deployment: Vercel

Data Visualization: Power BI charts (for analysis and presentation)

Assumptions

DEWA electricity tariff: 0.29 $/kWh

Each person generates 90W sensible heat + 30W latent heat

Small equipment load: 200W per room

Outdoor temperature is user-provided (or live Dubai weather if integrated)
