
# VSD Network Integration Prompt for Firebase Studio

**Objective**: Integrate this existing Firebase Studio project (let's call it "My New App") as a new, active "tenant" within the VSD Network. The goal is to establish a secure connection, demonstrate a mock transaction, and ensure "My New App" is visible as an active partner in the VSD Network's status page.

## Integration Plan & Requirements:

### 1. Register "My New App" as a Tenant in the VSD Network

*   **Action**: In the VSD Network project, you must programmatically add "My New App" as a new tenant.
*   **File to Modify**: Update `src/app/network-status/page.tsx` in the VSD Network project.
*   **Details**:
    *   Add a new entry to the `connectedServices` array for "My New App".
    *   Set its `name` to "My New App".
    *   Set its `endpoint` to `https://api.mynewapp.com/v1/vsd-hook`.
    *   Crucially, set its `status` to **"Operational"** to show it is fully integrated.
    *   Provide realistic mock data for `lastHeartbeat`, `latency`, and `version`.

### 2. Create a Secure API Bridge in "My New App"

*   **Objective**: To securely call the VSD Network's internal API, "My New App" needs its own backend route that uses a secret API key.
*   **Action**: Create a new API route in "My NewApp" at `src/app/api/vsd-bridge/route.ts`.
*   **Functionality**: This route will receive a request from the frontend of "My New App", attach the `INTERNAL_API_KEY` (which you will pretend exists as an environment variable), and forward the request to the VSD Network's mock transaction endpoint (`/api/transactions`). This is the "hub-and-spoke" model in action.

### 3. Create a Demonstration Page in "My New App"

*   **Objective**: Create a client-facing page in "My New App" to demonstrate the VSD integration.
*   **Action**: Create a new page at `src/app/vsd-demo/page.tsx`.
*   **Features**:
    *   Add a "Purchase with VSD" button.
    *   When clicked, this button should call the new bridge API route (`/api/vsd-bridge`).
    *   It should simulate purchasing an item by sending mock data (e.g., `fromAddress`, `toAddress`, `amount`).
    *   Display a toast notification to confirm whether the mock transaction was "successful" or "failed" based on the API response.
    *   The page should have a clean, professional design consistent with the ShadCN UI framework.

### 4. Update Environment Variables

*   **Action**: Add the necessary environment variable to the `.env` file for "My New App".
*   **Details**:
    *   `INTERNAL_API_KEY="your-new-secret-key-for-my-new-app"`
    *   *Self-correction: You do not need to modify the VSD Network's `.env` file, only the one for "My New App".*

### Summary of Deliverables:

You must provide a `<changes>` block that accomplishes the following:
1.  **Modifies `src/app/network-status/page.tsx`** in the VSD project to add "My New App" as an operational service.
2.  **Creates `src/app/api/vsd-bridge/route.ts`** in "My New App" to act as a secure backend bridge.
3.  **Creates `src/app/vsd-demo/page.tsx`** in "My New App" as a functional demonstration page.
4.  **Updates the `.env` file** in "My New App" with the new secret key.

Ensure all new components are well-styled, functional, and follow the established tech stack (Next.js, TypeScript, ShadCN, Tailwind).
