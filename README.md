# Submission Tracking System

A full-stack internal tracking app built with React, 
TypeScript, ASP.NET Core Web API, Entity Framework 
Core, and SQL Server — frontend deployed on Azure 
Static Web Apps.

## What It Does

Two separate form sources (Contact and Food) each write 
to their own isolated database. The submission tracking 
app pulls from both and stores them in its own separate 
database — so the original source data never gets 
touched or overwritten.

Inside the app you can:
- Search submissions across all sources
- Filter by form type or status
- Edit, update, or delete submissions
- Add notes and assign submissions to team members
- All changes sync back to the database in real time

## Why Separate Databases

Each form source owns its data independently. The 
aggregation layer reads from both and writes to its own 
DB — keeping the sources clean and letting them be 
consumed by other systems without interference.

## Tech Stack

- **Frontend:** React, TypeScript, CSS
- **Backend:** C#, ASP.NET Core Web API, 
  Entity Framework Core
- **Database:** SQL Server

## Deployment

- **Frontend:** Azure Static Web Apps
- **Backend:** Runs locally

## Running Locally

1. Clone the repo
2. Copy `appsettings.example.json` to 
   `appsettings.json` and add your SQL Server 
   connection string
3. Run the backend: `dotnet run`
4. In the frontend folder: `npm install` then 
   `npm run dev`
