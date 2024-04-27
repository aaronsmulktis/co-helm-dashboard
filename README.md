# Co:Helm Coding Exercise

Requirements [here](https://co-helm.notion.site/Senior-Product-Engineer-Take-Home-6e82ec45cc2a46b59a0d9ee3aeb9449c).

## Running backend:

- `cd /backend`
- `conda create -n cohelm && conda activate cohelm` _(recommended)_
- _(You may need to select the interpreter in VS Code > Cmd + Shift + P > Python: Choose Interpreter)_
- `pip install -r requirements.txt`
- `uvicorn main:app --reload`

## Running frontend

- `cd /frontend`
- `touch ./frontend/.env`
- add `API_URL=http://127.0.0.1:8000/api` to `.env`
- add `NEXT_PUBLIC_TEST_CASE_ID=case_3664a` to `.env`
- `yarn install`
- `yarn dev`