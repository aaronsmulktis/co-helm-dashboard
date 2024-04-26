# Co:Helm - Frontend (NextJS)

## Running Locally

- `touch ./frontend/.env`
- add `API_URL=http://127.0.0.1:8000/api` to `.env`
- `yarn install`
- `yarn dev`

### Tasks

Add a spinner to the upload button components/guidelines-upload/index.tsx

Don't allow user to upload a guidelines file until a medical record has been uploaded. Show a <Toast />

Enable Continue button only when both files have been uploaded

