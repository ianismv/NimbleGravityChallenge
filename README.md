# Nimble Gravity – Bot Filter Challenge

Mini React application built as part of the Nimble Gravity Junior Fullstack Developer hiring process.

This application connects to Nimble Gravity’s API to:

- Fetch candidate data by email
- Retrieve available job positions
- Submit a job application including the GitHub repository URL
- Handle loading and error states properly

---

## 🚀 Tech Stack

- React
- TypeScript
- Vite
- Fetch API
- Functional Components + Hooks
- Minimal inline styling

---

## 🔗 API Base URL

```
https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net
```

---

## 📌 Features

### 1️⃣ Fetch Candidate by Email

**Endpoint**

```
GET /api/candidate/get-by-email?email=YOUR_EMAIL
```

Stores:

- uuid  
- candidateId  
- applicationId  
- firstName  
- lastName  
- email  

These values are later used to submit the application.

---

### 2️⃣ Fetch Available Jobs

**Endpoint**

```
GET /api/jobs/get-list
```

Displays a list of job positions including:

- Job title  
- Input field for GitHub repository URL  
- Submit button  

Each job is rendered through a dedicated `JobItem` component.

---

### 3️⃣ Apply to Job

**Endpoint**

```
POST /api/candidate/apply-to-job
```

**Request Body**

```json
{
  "uuid": "candidate uuid",
  "jobId": "job id",
  "candidateId": "candidate id",
  "applicationId": "application id",
  "repoUrl": "https://github.com/username/repository"
}
```

**Success Response**

```json
{ "ok": true }
```

---

## 🧠 Error Handling

The application includes:

- Required field validation before sending the request
- URL validation using the `URL` constructor
- Loading state management
- API error message extraction from response body
- Graceful fallback error messages

### UI States

- `idle`
- `submitting`
- `success`
- `error`

---

## 🏗 Project Structure

```
src/
 ├── components/
 │     ├── EmailForm.tsx
 │     ├── JobList.tsx
 │     └── JobItem.tsx
 ├── services/
 │     └── api.ts
 ├── types/
 │     └── index.ts
 └── App.tsx
```

### Architecture Notes

- API logic is isolated in `services/api.ts`
- Types are centralized in `types`
- Components are kept small and focused
- Each job handles its own submission state independently

---

## 🛠 How to Run Locally

1. Clone the repository:

```
git clone https://github.com/YOUR_USERNAME/YOUR_REPO
```

2. Install dependencies:

```
npm install
```

3. Run the development server:

```
npm run dev
```

---

## 🎯 Evaluation Criteria Covered

**Code Quality**  
Clean naming conventions, separation of concerns, and typed interfaces.

**Component Design**  
Reusable and isolated components.

**Error Handling**  
Frontend validation + backend error inspection.

**Presentation**  
Simple, clean, and functional UI.

**Problem Solving**  
Handled API validation errors by inspecting response bodies and adjusting payload structure accordingly.

---

## 👤 Candidate

Ianis Manos  
Junior Fullstack Developer Applicant  

---

Thank you for the opportunity.
