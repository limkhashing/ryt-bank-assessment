# Project Structure

This project follows a structure inspired by [bulletproof-react](https://github.com/alan2207/bulletproof-react) for
maintainable React/React Native applications. Each feature is encapsulated with its own API logic, screens, state management, and utilities.

```
src/
  ├── app/           # App root, entry point, navigation
  ├── components/    # Shared UI components (Button, Card, Input, etc.)
  ├── features/      # Feature modules (e.g., transfer)
  │     ├── api/         # Feature-specific API logic
  │     ├── screens/     # Feature-specific UI Screens
  │     ├── data/        # Feature-specific data, mock data, fixtures
  │     ├─  hooks/       # Feature-specific hooks
  │     ├── store/       # Feature-specific state management (slices, reducers)
  │     ├── types/       # Feature-specific types and interfaces
  │     └── utils/       # Feature-specific utilities
  ├── lib/           # Standalone libraries (e.g., apiClient)
  ├── utils/         # Helper functions and utilities
  └── README.md      # This file
```

## Project Structure Diagram

```mermaid
flowchart TD
    A[app/] -->|imports|B[components/]
    A -->|imports|C[features/]
    A -->|imports|D[lib/]
    A -->|imports|E[utils/]
    B --> F[Button/]
    B --> G[Card/]
    B --> H[Input/]
    B --> I[Loading/]
    B --> J[constants/]
    C --> K[transfer/]
    D --> L[apiClient.ts]
    E --> M[Logger.ts]
    E --> N[index.ts]
```

## Transfer Feature Flowchart

```mermaid
flowchart TD
    Start(["Start App"]) --> Home["Show Transfer Screen"]
    Home --> Input["User Inputs Amount & Note"]
    Input --> Validate{"Valid Input?"}
    Validate -- No --> Error["Show Error Message"]
    Validate -- Yes --> Recipient["Select Recipient"]
    Recipient --> Confirm["Show Confirmation Screen"]
    Confirm --> Biometric{"Biometric Auth?"}
    Biometric -- Fail --> ShowAuthError["Show Auth Error"]
    Biometric -- Success --> API["Call Transfer API"]
    ShowAuthError -- Try again --> Biometric
    ShowAuthError -- Use PIN --> ShowPinScreen["Show Enter Pin Screen"]
    ShowPinScreen --> IsCorrectPin["Is Correct pin?"]
    IsCorrectPin -- Yes --> API["Call Transfer API"]
    IsCorrectPin -- No --> ShowPinError["Show Incorrect Pin Error"]
    API --> Result{"Transfer Success?"}
    Result -- No --> TransferError["Show Transfer Error"]
    Result -- Yes --> Done["Show Success & Update Balance"]
    Done --> Home
    ShowPinScreen@{shape: rect}
    IsCorrectPin@{shape: diam}
    style Start fill:#cce5ff,stroke:#333,stroke-width:2px
    style Error fill:#f8d7da,stroke:#333,stroke-width:2px
    style ShowAuthError fill:#f8d7da,stroke:#333,stroke-width:2px
    style TransferError fill:#f8d7da,stroke:#333,stroke-width:2px
    style ShowPinError fill: #f8d7da, stroke: #333, stroke-width: 2px
    style Done fill:#d4edda,stroke:#333,stroke-width:2px
```